import {
    ADD_DEPARTMENT,
    ADD_EMPLOYEE,
    FETCH_DEPARTMENTS,
    FETCH_EMPLOYEES,
    DELETE_EMPLOYEE
} from "./types";

export function fetchEmployees() {
    return {
        type: FETCH_EMPLOYEES
    }
}

export function fetchDepartments() {
    return {
        type: FETCH_DEPARTMENTS
    }
}

export function addDepartment(values) {
    return {
        type: ADD_DEPARTMENT,
        payload: values
    }
}

export function addEmployee(values) {
    return {
        type: ADD_EMPLOYEE,
        payload: values
    }
}

export function deleteEmployee(id) {
    return {
        type: DELETE_EMPLOYEE,
        payload: id
    }
}