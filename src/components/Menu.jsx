import React, {Component} from "react";
import { NavLink } from "react-router-dom";

class Menu extends Component {
    render() {
        return (
            <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
                <ul className="nav nav-pills flex-column">
                    <li className="nav-item">
                        <NavLink exact className="nav-link" activeClassName="active" to="/">Departments</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/employees">Employees</NavLink>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Menu;