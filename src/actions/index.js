import {
    FETCH_DEPARTMENTS,
    FETCH_EMPLOYEES
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