import { call, put } from "redux-saga/effects"

import {
    fetchDepartmentsAsync,
    fetchEmployeesAsync
} from "../../../src/sagas/index";

import {
    FETCH_DEPARTMENTS_SUCCEEDED,
    FETCH_DEPARTMENTS_FAILED,
    FETCH_EMPLOYEES_SUCCEEDED,
    FETCH_EMPLOYEES_FAILED
} from "../../../src/actions/types";

const ROOT_URL = `http://${window.location.hostname}:3000`;

describe("Saga Department", () => {
    describe("fetchDepartmentsAsync", () => {
        it("fetch list of departments", () => {
            const generator = fetchDepartmentsAsync();

            const mockData = [
                {
                    "id": 1,
                    "name": "Test name"
                }
            ];

            // Make call to api server
            generator.next();

            // Check if generator works correct
            expect(
                generator.next({
                    data: mockData
                }).value
            ).toEqual(
                put({
                    type: FETCH_DEPARTMENTS_SUCCEEDED,
                    payload: mockData
                })
            );
        });

        it("fails on fetch list of departments", () => {
            const generator = fetchDepartmentsAsync();

            const error = new TypeError("Cannot read property 'data' of undefined");

            // Mock the error while request
            generator.next(function() {
                throw error;
            });

            // Check if generator works correct
            expect(
                generator.next().value
            ).toEqual(
                put({
                    type: FETCH_DEPARTMENTS_FAILED,
                    payload: error
                })
            );
        });
    });
});

describe("Saga Employee", () => {
    describe("fetchEmployeesAsync", () => {
        // todo: Разобраться как тестировать подобного рода saga

        /*it("fetch list of employees", () => {
            const generator = fetchEmployeesAsync();

            const mockData = [
                {
                    "id": 3,
                    "firstName": "Барт",
                    "lastName": "Кёрлиш",
                    "departmentId": 1,
                    "departmentName": "Test department"
                }
            ];

            // Make call to api server
            generator.next();
            generator.next();
            generator.next({
                data: mockData
            });

            // Check if generator works correct
            expect(
                generator.next({
                    data: mockData
                }).value
            ).toEqual(
                put({
                    type: FETCH_EMPLOYEES_SUCCEEDED,
                    payload: mockData
                })
            );
        });*/

        /*it("fails on fetch list of departments", () => {
            const generator = fetchDepartmentsAsync();

            const error = new TypeError("Cannot read property 'data' of undefined");

            // Mock the error while request
            generator.next(function() {
                throw error;
            });

            // Check if generator works correct
            expect(
                generator.next().value
            ).toEqual(
                put({
                    type: FETCH_DEPARTMENTS_FAILED,
                    payload: error
                })
            );
        });*/
    });
});