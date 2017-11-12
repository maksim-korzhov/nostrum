import React, {Component} from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { fetchEmployees } from "../actions";

class Employees extends Component {
    componentWillMount() {
        this.props.fetchEmployees();
    }

    _renderEmployees() {
        if(this.props.employees.length === 0) return false;

        console.log(this.props.employees);

        return (
            this.props.employees.map( (employees) =>
                <tr key={employees.id}>
                    <td>{employees.id}</td>
                    <td>{employees.firstName}</td>
                    <td>{employees.lastName}</td>
                    <td>{employees.departmentName}</td>
                </tr>
            )
        );
    }

    render() {
        return (
            <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
                <h1>Employees</h1>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Department</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this._renderEmployees()}
                        </tbody>
                    </table>
                </div>
            </main>
        );
    }
}

function mapStateToProps({employees: {employeesList}}) {
    return {employees: employeesList};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchEmployees }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Employees);
