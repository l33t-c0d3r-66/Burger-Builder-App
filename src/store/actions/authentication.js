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
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 100)
            localStorage.setItem("token",  response.data.idToken);
            localStorage.setItem("expirationDate", expirationDate);
            localStorage.setItem("userId", response.data.localId);
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
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    return {
        type: actionTypes.AUTHENTICATION_LOGOUT
    };
};

export const setAuthenticationRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTHENTICATION_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if(!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if(expirationDate > new Date()) {
                const userId = localStorage.getItem("userId");
                dispatch(authenticationSuccess(token, userId));
                dispatch(checkTokenTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000));
            } else {
                dispatch(logout());
            }
            
        }
    };
};