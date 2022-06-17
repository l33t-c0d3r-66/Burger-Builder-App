import {takeEvery} from 'redux-saga/effects';
import  {logOutSaga} from './authentication';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuthentication() {
    yield takeEvery(actionTypes.AUTHENTICATION_INITIATE_LOGOUT, logOutSaga);

}