import {
    FETCH_DEPARTMENTS_SUCCEEDED,
} from "../actions/types";

export const initialState = {
    departmentsList: []
};

export default function( state = initialState, action ) {
    switch( action.type ) {
        case FETCH_DEPARTMENTS_SUCCEEDED:
            return {
                ...state,
                departmentsList: action.payload
            };
    }

    return state;
}