import {
     USERNAME_CHANGED, PASSWORD_CHANGED,
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS,
    SHOW_LOADER, REMOVE_LOADER, GET_USERS_SUCCESS,
    GET_ROLES_SUCCESS, GET_ROLES_FAIL,
    USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
    OPEN_ADD_USER_MODAL, OPEN_EDIT_USER_MODAL, OPEN_DELETE_USER_MODAL,
} from './types';
import AuthService from '../services/AuthService';

export const usernameChanged = payload => ({type: USERNAME_CHANGED, payload});

export const passwordChanged = payload => ({type: PASSWORD_CHANGED, payload});

const API_TOKEN="api_token"

/**
 * User Action - For logging user into the system.
 *
 * @param {Object} param0
 * @param {Function} _clearCredentials
 */
export const login = ({ username, password }, _clearCredentials) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const user = await AuthService.generateToken({ username, password });

        if (user) {
            dispatch({ type: REMOVE_LOADER });

            localStorage.setItem(API_TOKEN, user.token);

            if (localStorage.getItem(API_TOKEN)) {
                dispatch({ type: LOGIN_SUCCESS, payload: user });

                if (_clearCredentials) {
                    _clearCredentials();
                }
            }
        }
    } catch (error) {
        localStorage.removeItem(API_TOKEN);
        dispatch({ type: LOGIN_FAIL, payload: error.error.message });
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for opening the Add User modal.
export const openAddUserModal = payload => ({type: OPEN_ADD_USER_MODAL, payload });

// Action creator for opening the Edit User modal.
export const openEditUserModal = payload => ({type: OPEN_EDIT_USER_MODAL, payload});

// Action creator for opening the Delete User modal.
export const openDeleteUserModal = payload => ({type: OPEN_DELETE_USER_MODAL, payload});

// Action creator for logging out the user.
export const logout = () => {
    localStorage.removeItem(API_TOKEN);
    return { type: LOGOUT_SUCCESS };
};

// Function for parsing error gotten from server.
const parseError = error => {
    return error;
};