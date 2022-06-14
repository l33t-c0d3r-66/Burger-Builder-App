import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
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




const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTHENTICATION_START:
            return authStart(state, action);
        case actionTypes.AUTHENTICATION_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTHENTICATION_FAILED:
            return authFailed(state, action);
        default:
            return state;
    }
};

export default reducer;