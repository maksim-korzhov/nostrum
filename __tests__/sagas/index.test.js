import { call, put } from "redux-saga/effects"

import { fetchDepartmentsAsync } from "../../src/sagas";

import {
    FETCH_DEPARTMENTS_SUCCEEDED,
    FETCH_DEPARTMENTS_FAILED
} from "../../src/actions/types";

const ROOT_URL = "http://159.203.117.100:3000";

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