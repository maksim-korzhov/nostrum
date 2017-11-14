import React, {Component} from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import { addDepartment } from "../actions/index";

class AddDepartment extends Component {
    _renderField(field) {
        const {meta: {touched, error}} = field;
        //const className = `form-group ${touched && error ? "has-danger" : ""}`;

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

    _handleFormSubmit(values) {
        this.props.addDepartment(values);
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form className="add" onSubmit={handleSubmit(this._handleFormSubmit.bind(this))}>
                <Field
                    label="Department name"
                    name="name"
                    component={this._renderField}
                />
                <button className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addDepartment }, dispatch);
}

AddDepartment = connect(null, mapDispatchToProps)(AddDepartment);

function validate(values) {
    const errors = {};

    if( !values.name ) {
        errors.name = "Department name cannot be empty.";
    }

    return errors;
}

export default reduxForm({
    validate,
    form: "add"
})(AddDepartment);