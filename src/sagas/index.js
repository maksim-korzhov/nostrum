import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from "axios";

import {
    FETCH_DEPARTMENTS,
    FETCH_DEPARTMENTS_SUCCEEDED,
    FETCH_DEPARTMENTS_FAILED,
    FETCH_EMPLOYEES,
    FETCH_EMPLOYEES_SUCCEEDED,
    FETCH_EMPLOYEES_FAILED,
    ADD_DEPARTMENT,
    ADD_DEPARTMENT_SUCCEEDED,
    ADD_DEPARTMENT_FAILED,
    ADD_EMPLOYEE,
    ADD_EMPLOYEE_SUCCEEDED,
    ADD_EMPLOYEE_FAILED,
    DELETE_EMPLOYEE,
    DELETE_EMPLOYEE_FAILED,
    DELETE_DEPARTMENT,
    DELETE_DEPARTMENT_FAILED
} from "../actions/types";

const ROOT_URL = `http://${window.location.hostname}:3000`;

// get list of departments
export function* fetchDepartmentsAsync() {
    try {
        const result = yield call( axios.get, `${ROOT_URL}/department`);
        yield put({ type: FETCH_DEPARTMENTS_SUCCEEDED, payload: result.data });
    } catch(error) {
        yield put({ type: FETCH_DEPARTMENTS_FAILED, payload: error });
    }
}

// departments watcher
function* watchFetchDepartments() {
    yield takeEvery(FETCH_DEPARTMENTS, fetchDepartmentsAsync);
}

// get list of departments
export function* fetchDepartmentsByIdAsync(ids) {
    try {
        const uri = `?id=${ids.join("&id=")}`;
        const departments = yield call( axios.get, `${ROOT_URL}/department${uri}`);

        const indexedDepartments = departments.data.reduce((arr, department) => {
                arr[department.id] = department;
                return arr;
            }, {}
        );

        return indexedDepartments;
    } catch(error) {
        return {};
    }
}

// get list of employees
export function* fetchEmployeesAsync() {
    try {
        // get list of employees
        const employee = yield call( axios.get, `${ROOT_URL}/employee`);

        // get departments id's
        const departmentsIds = [];
        employee.data.map( ({ departmentId }) => {
            if( departmentsIds.indexOf(departmentId) === -1) {
                departmentsIds.push(departmentId);
            }
        });

        // get list of departments
        let indexedDepartments = {};
        indexedDepartments = yield* fetchDepartmentsByIdAsync(departmentsIds);


        // add department names to employees list
        const result = yield {
            data: employee.data.map( employee => {
                employee.departmentName = indexedDepartments[employee.departmentId]
                    ? indexedDepartments[employee.departmentId].name : "-";
                return employee;
            })
        };

        yield put({ type: FETCH_EMPLOYEES_SUCCEEDED, payload: result.data });
    } catch(error) {
        yield put({ type: FETCH_EMPLOYEES_FAILED, payload: error });
    }
}

// employees watcher
function* watchFetchEmployees() {
    yield takeEvery(FETCH_EMPLOYEES, fetchEmployeesAsync);
}


// add new department
export function* addNewDepartmentAsync(action) {
    try {
        yield call( axios.post, `${ROOT_URL}/department`, action.payload);
        yield* fetchDepartmentsAsync();
    } catch(error) {
        yield put({ type: ADD_DEPARTMENT_FAILED, payload: error });
    }
}

// departments watcher
function* watchAddDepartment() {
    yield takeEvery(ADD_DEPARTMENT, addNewDepartmentAsync);
}


// add new employee
export function* addNewEmployeeAsync(action) {
    try {
        yield call( axios.post, `${ROOT_URL}/employee`, action.payload);
        yield* fetchEmployeesAsync();
    } catch(error) {
        yield put({ type: ADD_EMPLOYEE_FAILED, payload: error });
    }
}

// add new employee watcher
function* watchAddEmployee() {
    yield takeEvery(ADD_EMPLOYEE, addNewEmployeeAsync);
}


// delete employee
export function* deleteEmployeeAsync(action) {
    try {
        yield call( axios.delete, `${ROOT_URL}/employee/${action.payload}` );
        yield* fetchEmployeesAsync();
    } catch(error) {
        yield put({ type: DELETE_EMPLOYEE_FAILED, payload: error });
    }
}

// delete employee watcher
function* watchDeleteEmployee() {
    yield takeEvery(DELETE_EMPLOYEE, deleteEmployeeAsync);
}


// delete department
export function* deleteDepartmentAsync(action) {
    try {
        yield call( axios.delete, `${ROOT_URL}/department/${action.payload}` );
        yield* fetchDepartmentsAsync();
    } catch(error) {
        yield put({ type: DELETE_DEPARTMENT_FAILED, payload: error });
    }
}

// delete department watcher
function* watchDeleteDepartment() {
    yield takeEvery(DELETE_DEPARTMENT, deleteDepartmentAsync);
}


// single entry point to start all the sagas at once
export default function* rootSaga() {
    yield [
        watchFetchDepartments(),
        watchFetchEmployees(),
        watchAddDepartment(),
        watchAddEmployee(),
        watchDeleteEmployee(),
        watchDeleteDepartment()
    ];
}