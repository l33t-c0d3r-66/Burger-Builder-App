import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authenticationStart = () => {
    return {
        type: actionTypes.AUTHENTICATION_START
    };
};

export const authenticationSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTHENTICATION_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authenticationFailed = (error) => {
    return {
        type: actionTypes.AUTHENTICATION_FAILED,
        error: error
    };
};

export const authenticate = (email, password, isSignUp) => {
    return dispatch => {
        // Authenticate the user
        dispatch(authenticationStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+process.env.REACT_APP_API_KEY;
        if(!isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+process.env.REACT_APP_API_KEY;
        }
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            dispatch(authenticationSuccess(response.data.idToken, response.data.localId));
            dispatch(checkTokenTimeOut(response.data.expiresIn));
        })
        .catch(err =>{
            dispatch(authenticationFailed(err.response.data.error));
        });
    };
};

export const checkTokenTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(logout());
            // expects time in miliseconds
        }, expirationTime * 1000);
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTHENTICATION_LOGOUT
    };
};