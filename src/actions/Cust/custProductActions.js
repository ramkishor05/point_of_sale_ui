import { 
    GET_ALL_CUST_PRODUCTS_SUCCESS, CUST_PRODUCT_ADD_SUCCESS,
    SHOW_CUST_PRODUCT_LOADER, REMOVE_CUST_PRODUCT_LOADER,
    CUST_PRODUCT_TO_EDIT, CUST_PRODUCT_EDIT_SUCCESS, GET_FINISHING_CUST_PRODUCTS
} from '../types';
import Item from '../../services/Cust/Item';
import ItemStock from '../../services/Cust/ItemStock';

// Action creator for getting all items --<
export const getAllCustProducts = () => async dispatch => {
    dispatch({ type: SHOW_CUST_PRODUCT_LOADER });

    try {
        const items = await Item.getAll();

        if (items) {
            dispatch({ type: GET_ALL_CUST_PRODUCTS_SUCCESS, payload: items });
            dispatch({ type: REMOVE_CUST_PRODUCT_LOADER });
        }
    } catch(error) {
        dispatch({ type: REMOVE_CUST_PRODUCT_LOADER });
        console.log(error);
    }
};

// Action creator for adding item --<
export const addCustProduct = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_CUST_PRODUCT_LOADER });

    try {
        const item = await Item.add(data);

        if (item) {
            dispatch({ type: CUST_PRODUCT_ADD_SUCCESS });
            dispatch({ type: REMOVE_CUST_PRODUCT_LOADER });
        }

        refreshItemsList && refreshItemsList();

        clear && clear();

        successNotification && successNotification();
        
    } catch(error) {
        dispatch({ type: REMOVE_CUST_PRODUCT_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderToCustProductEdit = custProduct => {
    return {
        type: CUST_PRODUCT_TO_EDIT,
        payload: custProduct,
    };
};

export const editCustProduct = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_CUST_PRODUCT_LOADER });

    try {
        const item = await Item.update(id, data);

        if (item) {
            dispatch({ type: CUST_PRODUCT_EDIT_SUCCESS });
            dispatch({ type: REMOVE_CUST_PRODUCT_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_CUST_PRODUCT_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateCustProduct = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_CUST_PRODUCT_LOADER });

    try {
        const item = await ItemStock.update(id, data);

        if (item) {
            dispatch({ type: CUST_PRODUCT_EDIT_SUCCESS });
            dispatch({ type: REMOVE_CUST_PRODUCT_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_CUST_PRODUCT_LOADER });
        errorNotification && errorNotification();
    }
};

export const getFinishingItems = minimum => async dispatch => {
    dispatch({ type: SHOW_CUST_PRODUCT_LOADER });

    try {
        const item = await Item.find(minimum);

        if (item) {
            dispatch({ type: GET_FINISHING_CUST_PRODUCTS, payload: item });
        }
    } catch(error) {
        dispatch({ type: REMOVE_CUST_PRODUCT_LOADER });
        console.log('finishing items ', error)
    }
}; 
