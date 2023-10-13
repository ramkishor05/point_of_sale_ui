import {
     USERNAME_CHANGED, PASSWORD_CHANGED,
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS,
    SHOW_LOADER, REMOVE_LOADER, GET_USERS_SUCCESS,
    GET_ROLES_SUCCESS, GET_ROLES_FAIL,
    USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
    OPEN_ADD_USER_MODAL, OPEN_EDIT_USER_MODAL, OPEN_DELETE_USER_MODAL,
} from './types';
import RoleService from '../services/RoleService';

/**
 * User Action - For adding a new user in the system.
 *
 * @param {Object} data
 * @param {Function} refresh
 * @param {Function} resetInput
 */
export const addRole = (data, refresh, resetInput) => async dispatch => {
    try {
        const user = await RoleService.add(data);
        if (user) {
            if (refresh) {
                refresh();
            }

            if (resetInput) {
                resetInput();
            }
        }
    } catch (error) {
        
    }
};

/**
 * User Action - For updating the user details in the system.
 *
 * @param {Number} id
 * @param {Object} data
 * @param {Function} resetPassword
 */
export const updateRole = (id, data) => async dispatch => {
    try {
        const user = await RoleService.update(id, data);

        if (user) {
            dispatch({ type: USER_UPDATE_SUCCESS, payload: user });
        }
    } catch (error) {
        dispatch({ type: USER_UPDATE_FAIL, payload: parseError(error) });
        console.log(error);
    }
};

/**
 * User Action - For deleting a user from the system.
 *
 * @param {Number} id
 * @param {Function} refresh
 */
export const deleteRole = (id, refresh) => async dispatch => {
    try {
        const result = await RoleService.delete(id);

        if (result) {
            if (refresh) {
                refresh();
            }
        }
    } catch (error) {
        console.log(error);
    }
};

export const getRoles = () => async dispatch => {
    try {
        const roles = await RoleService.getRoles();

        if (roles) {
            dispatch({ type: GET_ROLES_SUCCESS, payload: roles });
        }
    } catch (error) {
        dispatch({ type: GET_ROLES_FAIL, payload: error });
        console.log('this is the error from getting roles', error)
    }
}

// Action creator for opening the Add User modal.
export const openAddRoleModal = payload => ({type: OPEN_ADD_USER_MODAL, payload });

// Action creator for opening the Edit User modal.
export const openEditRoleModal = payload => ({type: OPEN_EDIT_USER_MODAL, payload});

// Action creator for opening the Delete User modal.
export const openDeleteRoleModal = payload => ({type: OPEN_DELETE_USER_MODAL, payload});

// Function for parsing error gotten from server.
const parseError = error => {
    return error;
};