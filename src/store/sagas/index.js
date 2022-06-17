import {takeEvery} from 'redux-saga/effects';
import  {logOutSaga, checkTokenTimeOutSage, authenticateSaga} from './authentication';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuthentication() {
    yield takeEvery(actionTypes.AUTHENTICATION_INITIATE_LOGOUT, logOutSaga);
    yield takeEvery(actionTypes.AUTHENTICATION_CHECK_TIME_OUT, checkTokenTimeOutSage);
    yield takeEvery(actionTypes.AUTHENTICATE_USER, authenticateSaga);
}
