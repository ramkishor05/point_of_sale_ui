import {
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    token: null,
    isLoggedIn: true,
    login_error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        
        case LOGIN_SUCCESS:
            return { ...state, isLoggedIn: true, token: action.payload };

        case LOGIN_FAIL:
            return { ...state, isLoggedIn: false, token: null, login_error: action.payload };

        case LOGOUT_SUCCESS:
            return { ...state, isLoggedIn: false, token: null, login_error: '' };

        default:
            return state;
    }
};

