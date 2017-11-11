import {
    FETCH_DEPARTMENTS,
    FETCH_DEPARTMENTS_SUCCEEDED,
    FETCH_DEPARTMENTS_FAILED
} from "../actions/types";

const initialState = {
    departments: []
};

export default function( state = initialState, action ) {
    switch( action.type ) {
        case FETCH_DEPARTMENTS_SUCCEEDED:
            console.log(action.payload);
            return {
                ...state,
                departments: action.payload
            };
    }

    return state;
}