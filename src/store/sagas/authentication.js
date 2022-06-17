import {put} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

export function* logOutSaga(action) {
    yield localStorage.removeItem("token");
    yield localStorage.removeItem("expirationDate");
    yield localStorage.removeItem("userId");
    yield put({
            type: actionTypes.AUTHENTICATION_LOGOUT
    });
}