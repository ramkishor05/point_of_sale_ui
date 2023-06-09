import { 
   GET_ALL_GLOBAL_CATEGERY_SUCCESS,
   GET_ALL_GLOBAL_CATEGERY_FAIL,
   SHOW_GLOBAL_CATEGERY_LOADER,
   REMOVE_GLOBAL_CATEGERY_LOADER,
   ADD_GLOBAL_CATEGERY_SUCCESS,
   EDIT_GLOBAL_CATEGERY_SUCCESS,
   RENDER_GLOBAL_CATEGERY_TO_EDIT
} from './types';
import Item from '../services/Item';
import ItemStock from '../services/ItemStock';

// Action creator for getting all items --<
export const getGlobalCategoryList = () => async dispatch => {
    dispatch({ type: SHOW_GLOBAL_CATEGERY_LOADER });

    try {
        const items = await Item.getAll();

        if (items) {
            dispatch({ type: GET_ALL_GLOBAL_CATEGERY_SUCCESS, payload: items });
            dispatch({ type: REMOVE_GLOBAL_CATEGERY_LOADER });
        }
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_CATEGERY_FAIL });
        dispatch({ type: REMOVE_GLOBAL_CATEGERY_LOADER });
        console.log(error);
    }
};

// Action creator for adding item --<
export const addGlobalCategory = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_GLOBAL_CATEGERY_LOADER });

    try {
        const item = await Item.add(data);

        if (item) {
            dispatch({ type: ADD_GLOBAL_CATEGERY_SUCCESS });
            dispatch({ type: REMOVE_GLOBAL_CATEGERY_LOADER });
        }

        refreshItemsList && refreshItemsList();

        clear && clear();

        successNotification && successNotification();
        
    } catch(error) {
        dispatch({ type: REMOVE_GLOBAL_CATEGERY_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderToEdit = item => {
    return {
        type: RENDER_GLOBAL_CATEGERY_TO_EDIT,
        payload: item,
    };
};

export const editGlobalCategory = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_GLOBAL_CATEGERY_LOADER });

    try {
        const item = await Item.update(id, data);

        if (item) {
            dispatch({ type: EDIT_GLOBAL_CATEGERY_SUCCESS });
            dispatch({ type: REMOVE_GLOBAL_CATEGERY_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_GLOBAL_CATEGERY_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateGlobalCategory = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_GLOBAL_CATEGERY_LOADER });

    try {
        const item = await ItemStock.update(id, data);

        if (item) {
            dispatch({ type: EDIT_GLOBAL_CATEGERY_SUCCESS });
            dispatch({ type: REMOVE_GLOBAL_CATEGERY_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_GLOBAL_CATEGERY_LOADER });
        errorNotification && errorNotification();
    }
};
