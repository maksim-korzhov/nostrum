import React, {Component} from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { fetchDepartments } from "../actions";
import ModalWrapper from "../hoc/ModalWrapper";
import AddDepartment from "./AddDepartment";

class Departments extends Component {
    componentWillMount() {
        this.props.fetchDepartments();
    }

    _renderDepartments() {
        if(this.props.departments.length === 0) return false;

        return (
            this.props.departments.map( (department) =>
                <tr key={department.id}>
                    <td>{department.id}</td>
                    <td>{department.name}</td>
                </tr>
            )
        );
    }

    render() {
        const ModalForm = ModalWrapper(AddDepartment);

        return (
            <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
                <h1>Departments</h1>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this._renderDepartments()}
                        </tbody>
                    </table>

                    <ModalForm />
                </div>
            </main>
        );
    }
}

function mapStateToProps({departments: {departmentsList}}) {
    return {departments: departmentsList};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchDepartments }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Departments);