import {combineReducers} from "redux";
import { reducer as formReducer } from "redux-form";

import departments from "./DepartmentReducer";
import employees from "./EmployeeReducer";

export default combineReducers({
    departments,
    employees,
    form: formReducer
});