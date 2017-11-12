import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from "axios";

import {
    FETCH_DEPARTMENTS,
    FETCH_DEPARTMENTS_SUCCEEDED,
    FETCH_DEPARTMENTS_FAILED
} from "../actions/types";

const ROOT_URL = "http://159.203.117.100:3000";

//
export function* fetchDepartmentsAsync() {
    try {
        const result = yield call( axios.get, `${ROOT_URL}/department`);
        yield put({ type: FETCH_DEPARTMENTS_SUCCEEDED, payload: result.data });
    } catch(error) {
        yield put({ type: FETCH_DEPARTMENTS_FAILED, payload: error });
    }
}

function* watchFetchDepartments() {
    yield takeEvery(FETCH_DEPARTMENTS, fetchDepartmentsAsync);
}

// single entry point to start all the sagas at once
export default function* rootSaga() {
    yield [
        watchFetchDepartments(),
    ];
}