import {combineReducers} from "redux";

import departments from "./DepartmentReducer";
import employees from "./EmployeeReducer";

export default combineReducers({
    departments,
    employees
});