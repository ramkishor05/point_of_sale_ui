import { 
    GET_ALL_UNITS_SUCCESS, GET_ALL_UNITS_FAIL,
    GET_UNITS_TODAY_SUCCESS, GET_UNITS_YESTERDAY_SUCCESS, GET_UNITS_LONG_SUCCESS,
    ADD_UNIT_SUCCESS, ADD_UNIT_FAIL,
    RENDER_UNIT_TO_EDIT,
} from '../actions/types';

const INITIAL_STATE = {
    units: [],
    units_today: [],
    units_yesterday: [],
    units_long: [],
    unit_to_edit: {
        name: '',
        amount: ''
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_UNITS_SUCCESS:
            return { ...state, units: action.payload };

        case GET_ALL_UNITS_FAIL:
            return { ...state };

        case GET_UNITS_TODAY_SUCCESS:
            return { ...state, units_today: action.payload };

        case GET_UNITS_YESTERDAY_SUCCESS:
            return { ...state, units_yesterday: action.payload };

        case GET_UNITS_LONG_SUCCESS:
            return { ...state, units_long: action.payload };

        case ADD_UNIT_SUCCESS:
            return { ...state, openAddUnitModal: false };

        case ADD_UNIT_FAIL:
            return { ...state };

        case RENDER_UNIT_TO_EDIT:
            return { ...state, unit_to_edit: action.payload };
    
        default:
            return state;
    }
};









