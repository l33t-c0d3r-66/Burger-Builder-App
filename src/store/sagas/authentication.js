import {put} from 'redux-saga/effects';
import delay from 'redux-saga';
import * as actions from '../actions/index';
import axios from 'axios';

export function* logOutSaga(action) {
    yield localStorage.removeItem("token");
    yield localStorage.removeItem("expirationDate");
    yield localStorage.removeItem("userId");
    yield put(actions.logOutSucceed());
};

export function* checkTokenTimeOutSage(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout);
};

export function* authenticateSaga(action) {
    yield put(actions.authenticationStart());
    const authData = {
        email: action.email,
        password: action.password,
         returnSecureToken: true
    }
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+process.env.REACT_APP_API_KEY;
    if(!action.isSignUp) {
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+process.env.REACT_APP_API_KEY;
    }
    try {
        const response = yield axios.post(url, authData);
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 100)
        yield localStorage.setItem("token",  response.data.idToken);
        yield localStorage.setItem("expirationDate", expirationDate);
        yield localStorage.setItem("userId", response.data.localId);
        yield put(actions.authenticationSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkTokenTimeOut(response.data.expirationDate));
    } catch(error) {
        yield put(actions.authenticationFailed(error.response.data.error));
    }
}