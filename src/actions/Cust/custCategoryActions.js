import { 
   GET_ALL_CUST_CATEGERY_SUCCESS,
   GET_ALL_CUST_CATEGERY_FAIL,
   SHOW_CUST_CATEGERY_LOADER,
   REMOVE_CUST_CATEGERY_LOADER,
   ADD_CUST_CATEGERY_SUCCESS,
   EDIT_CUST_CATEGERY_SUCCESS,
   RENDER_CUST_CATEGERY_TO_EDIT
} from '../types';

import CustCategoryService from '../../services/Cust/CustCategoryService';

// Action creator for getting all items --<
export const getCustCategoryList = () => async dispatch => {
    dispatch({ type: SHOW_CUST_CATEGERY_LOADER });

    try {
        const custCategoryList = await CustCategoryService.getAll();

        if (custCategoryList) {
            dispatch({ type: GET_ALL_CUST_CATEGERY_SUCCESS, payload: custCategoryList });
            dispatch({ type: REMOVE_CUST_CATEGERY_LOADER });
        }
    } catch(error) {
        dispatch({ type: GET_ALL_CUST_CATEGERY_FAIL });
        dispatch({ type: REMOVE_CUST_CATEGERY_LOADER });
        console.log(error);
    }
};

// Action creator for adding item --<
export const addCustCategory = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_CUST_CATEGERY_LOADER });

    try {
        const custCategory = await CustCategoryService.add(data);

        if (custCategory) {
            dispatch({ type: ADD_CUST_CATEGERY_SUCCESS });
            dispatch({ type: REMOVE_CUST_CATEGERY_LOADER });
        }

        refreshItemsList && refreshItemsList();

        clear && clear();

        successNotification && successNotification();
        
    } catch(error) {
        dispatch({ type: REMOVE_CUST_CATEGERY_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderCustCategoryToEdit = item => {
    return {
        type: RENDER_CUST_CATEGERY_TO_EDIT,
        payload: item,
    };
};

export const editCustCategory = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_CUST_CATEGERY_LOADER });

    try {
        const custCategory = await CustCategoryService.update(id, data);

        if (custCategory) {
            dispatch({ type: EDIT_CUST_CATEGERY_SUCCESS });
            dispatch({ type: REMOVE_CUST_CATEGERY_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_CUST_CATEGERY_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateCustCategory = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_CUST_CATEGERY_LOADER });

    try {
        const custCategory = await CustCategoryService.update(id, data);

        if (custCategory) {
            dispatch({ type: EDIT_CUST_CATEGERY_SUCCESS });
            dispatch({ type: REMOVE_CUST_CATEGERY_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_CUST_CATEGERY_LOADER });
        errorNotification && errorNotification();
    }
};

// Action creator for deleting football transaction from the system.
export const deleteCustCategory = (id, refresh) => async dispatch => {
    try {
        const deleted_cust_category = await CustCategoryService.delete(id);

        if (deleted_cust_category) {
            refresh && refresh();
        }
    } catch (error) {
        console.log(error);
    }
};