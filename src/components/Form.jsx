import React, {Component} from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

class Form extends Component {
    _renderFieldHtml(field) {
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
        console.log(values);
        //this.props.addDepartment();
        console.log(this.props);
    }

    _renderFields(field) {
        for( const fieldName in field ) {
            return <Field
                key={fieldName}
                label={field[fieldName].label}
                name={fieldName}
                component={this._renderFieldHtml}
            />;
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form className="add" onSubmit={handleSubmit(this._handleFormSubmit.bind(this))}>
                { this.props.fields.map( field => this._renderFields(field)) }
                <button className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

/*function mapStateToProps({ videoData: { isVideoAdded } }) {
    return { isVideoAdded };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addDepartment }, dispatch);
}

Form = connect(null, mapDispatchToProps)(Form);*/

function validate(values) {
    const errors = {};

    console.log(this);

    this.props.fields.map(field => {
        for( const key in field ) {
            if( !values[key] ) {
                errors[key] = field[key].error;
            }
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: "add"
})(Form);