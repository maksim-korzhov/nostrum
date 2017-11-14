import React, {Component} from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import { addEmployee, fetchDepartments } from "../actions/index";

class AddEmployee extends Component {
    componentDidMount() {
        // get departments names
        this.props.fetchDepartments();
    }

    _renderField(field) {
        const {meta: {touched, error}} = field;

        let label = field.label;
        if(field.required) {
            label = <strong>{label}</strong>;
        }

        return (
            <div className="form-group">
                <label>{label}</label>
                <input
                    className="form-control"
                    { ...field.input }
                />
                <div className="text-danger">{touched ? error : ""}</div>
            </div>
        );
    }

    _renderSelect(field) {
        const {meta: {touched, error}, departments} = field;

        let label = field.label;
        if(field.required) {
            label = <strong>{label}</strong>;
        }

        return (
            <div className="form-group">
                <label>{label}</label>
                <select className="form-control" { ...field.input }>
                    <option value="">-</option>
                    {
                        departments.map( department => {
                            return <option key={department.id} value={department.id}>(#{department.id}) {department.name}</option>;
                        })
                    }
                </select>
                <div className="text-danger">{touched ? error : ""}</div>
            </div>
        );
    }

    _handleFormSubmit(values) {
        this.props.addEmployee(values);
    }

    render() {
        const { handleSubmit, departments } = this.props;

        // If there is no departments - show error
        if(Object.keys(departments).length === 0) {
            return (
                <div className="alert alert-danger" role="alert">
                    <strong>Oh snap!</strong> Please add at least 1 department first.
                </div>
            );
        }

        return (
            <form className="add" onSubmit={handleSubmit(this._handleFormSubmit.bind(this))}>
                <Field
                    label="First name"
                    name="firstName"
                    component={this._renderField}
                />
                <Field
                    label="Last name"
                    name="lastName"
                    component={this._renderField}
                />
                <Field
                    label="Department name"
                    name="departmentId"
                    component={this._renderSelect}
                    departments={departments}
                />
                <button className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

function mapStateToProps({departments: {departmentsList}}) {
    return {departments: departmentsList};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addEmployee, fetchDepartments }, dispatch);
}

AddEmployee = connect(mapStateToProps, mapDispatchToProps)(AddEmployee);

function validate(values) {
    const errors = {};

    if( !values.firstName ) {
        errors.firstName = "First name cannot be empty.";
    }

    if( !values.lastName ) {
        errors.lastName = "Last name cannot be empty.";
    }

    if( !values.departmentId ) {
        errors.departmentId = "Department should be chosen.";
    }

    return errors;
}

export default reduxForm({
    validate,
    form: "add"
})(AddEmployee);