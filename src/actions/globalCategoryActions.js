import { 
    GET_ALL_GLOBAL_CATEGERY_SUCCESS, GET_ALL_GLOBAL_CATEGERY_FAIL,
    SHOW_ITEM_LOADER, REMOVE_GLOBAL_CATEGERY_LOADER,
    ITEM_TO_EDIT, ITEM_EDIT_SUCCESS, GET_FINISHING_ITEMS
} from './types';
import Item from '../services/Item';
import ItemStock from '../services/ItemStock';

// Action creator for getting all items --<
export const getAllItems = () => async dispatch => {
    dispatch({ type: SHOW_ITEM_LOADER });

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
export const addItem = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_ITEM_LOADER });

    try {
        const item = await Item.add(data);

        if (item) {
            dispatch({ type: GET_ALL_GLOBAL_CATEGERY_SUCCESSgory });
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
        type: ITEM_TO_EDIT,
        payload: item,
    };
};

export const editItem = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_ITEM_LOADER });

    try {
        const item = await Item.update(id, data);

        if (item) {
            dispatch({ type: ITEM_EDIT_SUCCESS });
            dispatch({ type: REMOVE_GLOBAL_CATEGERY_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_GLOBAL_CATEGERY_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateItem = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_ITEM_LOADER });

    try {
        const item = await ItemStock.update(id, data);

        if (item) {
            dispatch({ type: ITEM_EDIT_SUCCESS });
            dispatch({ type: REMOVE_GLOBAL_CATEGERY_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_GLOBAL_CATEGERY_LOADER });
        errorNotification && errorNotification();
    }
};

export const getFinishingItems = minimum => async dispatch => {
    dispatch({ type: SHOW_ITEM_LOADER });

    try {
        const item = await Item.find(minimum);

        if (item) {
            dispatch({ type: GET_FINISHING_ITEMS, payload: item });
        }
    } catch(error) {
        dispatch({ type: REMOVE_GLOBAL_CATEGERY_LOADER });
        console.log('finishing items ', error)
    }
}; 
