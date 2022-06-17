import * as actionTypes from './actionTypes';


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
    return {
        type: actionTypes.AUTHENTICATE_USER,
        email: email,
        password: password,
        isSignUp: isSignUp
    };
};

export const checkTokenTimeOut = (expirationTime) => {
    return {
        type: actionTypes.AUTHENTICATION_CHECK_TIME_OUT,
        expirationTime: expirationTime
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTHENTICATION_INITIATE_LOGOUT
    };
};

export const logOutSucceed = () => {
    return {
        type: actionTypes.AUTHENTICATION_LOGOUT
    };
}

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