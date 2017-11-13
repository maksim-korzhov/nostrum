import DepartmentReducer, { initialState } from "../../src/reducers/DepartmentReducer";
import { FETCH_DEPARTMENTS_SUCCEEDED } from "../../src/actions/types";

describe("Department reducer", () => {
    it("has a default state", () => {
        expect(DepartmentReducer( undefined, { type: "unexpected" } )).toEqual(initialState);
    });

    it("can handle FETCH_DEPARTMENTS_SUCCEEDED", () => {
        expect(DepartmentReducer( undefined, {
            type: FETCH_DEPARTMENTS_SUCCEEDED,
            payload: {
                defaultPayload: "defaultValue"
            }
        } )).toEqual({
            departmentsList: {
                defaultPayload: "defaultValue"
            }
        });
    });
});