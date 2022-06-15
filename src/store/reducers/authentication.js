import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken, 
        userId: action.userId,
        error: null,
        loading: false
    });
};

const authFailed = (state, action) => {
    return updateObject(state, {
        error: action.error, 
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null
    });
};

const authRedirectPath = (state, action) => {
    return updateObject(state,{
        authRedirectPath: action.path
    });
};


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTHENTICATION_START:
            return authStart(state, action);
        case actionTypes.AUTHENTICATION_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTHENTICATION_FAILED:
            return authFailed(state, action);
        case actionTypes.AUTHENTICATION_LOGOUT:
            return authLogout(state, action);
        case actionTypes.SET_AUTHENTICATION_REDIRECT_PATH:
            return authRedirectPath(state, action);
        default:
            return state;
    }
};

export default reducer;