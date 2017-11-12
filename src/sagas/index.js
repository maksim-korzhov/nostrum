import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from "axios";

import {
    FETCH_DEPARTMENTS,
    FETCH_DEPARTMENTS_SUCCEEDED,
    FETCH_DEPARTMENTS_FAILED,
    FETCH_EMPLOYEES,
    FETCH_EMPLOYEES_SUCCEEDED,
    FETCH_EMPLOYEES_FAILED
} from "../actions/types";

const ROOT_URL = "http://159.203.117.100:3000";

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

        // get defartments list
        const departments = yield call( axios.get, `${ROOT_URL}/department?id=${departmentsIds.join("&id=")}` );

        const indexedDepartments = departments.data.reduce((arr, department) => {
                arr[department.id] = department;
                return arr;
            }, {}
        );

        // add department names to employees list
        const result = {
            data: employee.data.map( employee => {
                employee.departmentName = indexedDepartments[employee.departmentId] ? indexedDepartments[employee.departmentId].name : "-";
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

// single entry point to start all the sagas at once
export default function* rootSaga() {
    yield [
        watchFetchDepartments(),
        watchFetchEmployees()
    ];
}