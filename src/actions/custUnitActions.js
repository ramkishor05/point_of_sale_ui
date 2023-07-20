import { 
    GET_ALL_UNITS_SUCCESS, GET_ALL_UNITS_FAIL,
    GET_UNITS_TODAY_SUCCESS,
    GET_UNITS_YESTERDAY_SUCCESS, GET_UNITS_LONG_SUCCESS,
    ADD_UNIT_SUCCESS, ADD_UNIT_FAIL, EDIT_UNIT_SUCCESS,
    RENDER_UNIT_TO_EDIT,
} from './types';

import Unit from '../services/Unit';

// Action creator for getting all Unit entries in the system.
export const getAllUnits = () => async dispatch => {
    try {
        let units = await Unit.getAll();

        if (units) {
            dispatch({ type: GET_ALL_UNITS_SUCCESS, payload: units });
        }
    } catch (error) {
        dispatch({ type: GET_ALL_UNITS_FAIL, payload: error });
        console.log(error);
    }
};

// Action creator for getting Unit entries according to specified dates in the system.
export const getUnitByDate = (from, to, day) => async dispatch => {
    try {
        let units = await Unit.getByDate(new Date(from), new Date(`${to}T23:59:59`));

        if (units) {
            if (day === 'today') {
                dispatch({ type: GET_UNITS_TODAY_SUCCESS, payload: units });
            } else if (day === 'yesterday') {
                dispatch({ type: GET_UNITS_YESTERDAY_SUCCESS, payload: units });
            } else if (day === 'long') {
                dispatch({ type: GET_UNITS_LONG_SUCCESS, payload: units });
            } else {
                dispatch({ type: GET_ALL_UNITS_SUCCESS, payload: units });
            }
        }
    } catch (error) {
        dispatch({ type: GET_ALL_UNITS_FAIL, payload: error });
        console.log(error);
    }
};

// Action creator for adding Unit transaction to the system.
export const addUnit = (data, refresh, clear, successNotification, errorNotification) => async dispatch => {
    try {
        let unit = await Unit.add(data);

        if (unit) {
            dispatch({ type: ADD_UNIT_SUCCESS });
            
            refresh && refresh();
    
            clear && clear();

            successNotification && successNotification();
        }

    } catch (error) {
        dispatch({ type: ADD_UNIT_FAIL });
        errorNotification && errorNotification();
        console.log(error);
    }
};

// Action creator for editing Unit transactions to the system.
export const editUnit = (id, data, refresh, clear, successNotification, errorNotification) => async dispatch => {
    try {
        let Unit = await Unit.update(id, data);

        if (Unit) {
            dispatch({ type: EDIT_UNIT_SUCCESS });

            refresh && refresh();

            clear && clear();

            successNotification && successNotification();
        }
    } catch(error) {
        errorNotification && errorNotification();
        console.log(error);
    }
};

// Action creator for rendering a Unit to edit in the system.
export const renderUnitToEdit = payload => {
    return {
        type: RENDER_UNIT_TO_EDIT,
        payload,
    };
};

export const deleteUnit = (id, refresh) => async dispatch => {
    try {
        const deleted_Unit = await Unit.delete(id);

        if (deleted_Unit) {
            refresh && refresh();
        }
    } catch (error) {
        console.log(error);
    }
};
