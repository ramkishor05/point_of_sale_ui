import {
    USERNAME_CHANGED, PASSWORD_CHANGED,
    GET_USERS_SUCCESS, GET_USER_SUCCESS,
    USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
    OPEN_ADD_USER_MODAL, OPEN_EDIT_USER_MODAL, OPEN_DELETE_USER_MODAL,
} from '../actions/types';

const INITIAL_STATE = {
    users: [],
    user: {
        username : '',
        password: ''
    },
    open_add_user_modal: false,
    open_edit_user_modal: false,
    open_delete_user_modal: false,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        
        case USERNAME_CHANGED:
                return { ...state, 'user.username': action.payload };

        case PASSWORD_CHANGED:
            return { ...state, 'user.password' : action.payload };

        case GET_USERS_SUCCESS:
            return { ...state, users: action.payload };

        case GET_USER_SUCCESS:
                return { ...state, user: action.payload };

        case USER_UPDATE_SUCCESS:
            return { ...state, user: action.payload };

        case USER_UPDATE_FAIL:
            return { ...state };

        case OPEN_ADD_USER_MODAL:
            return { ...state, open_add_user_modal: action.payload };

        case OPEN_EDIT_USER_MODAL:
            return { ...state, open_edit_user_modal: action.payload };

        case OPEN_DELETE_USER_MODAL:
            return { ...state, open_delete_user_modal: action.payload };

        default:
            return state;
    }
};

