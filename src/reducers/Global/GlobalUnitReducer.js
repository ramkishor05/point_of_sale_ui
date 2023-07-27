import { 
    GET_ALL_GLOBAL_UNITS_SUCCESS, GET_ALL_GLOBAL_UNITS_FAIL,
    GET_GLOBAL_UNITS_TODAY_SUCCESS, GET_GLOBAL_UNITS_YESTERDAY_SUCCESS, GET_GLOBAL_UNITS_LONG_SUCCESS,
    ADD_GLOBAL_UNIT_SUCCESS, ADD_GLOBAL_UNIT_FAIL,
    RENDER_GLOBAL_UNIT_TO_EDIT,
} from '../../actions/types';

const INITIAL_STATE = {
    globalUnits: [],
    globalUnits_today: [],
    globalUnits_yesterday: [],
    globalUnits_long: [],
    globalUnit_to_edit: {
        name: '',
        unitGroupId: ''
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_GLOBAL_UNITS_SUCCESS:
            return { ...state, globalUnits: action.payload };

        case GET_ALL_GLOBAL_UNITS_FAIL:
            return { ...state };

        case GET_GLOBAL_UNITS_TODAY_SUCCESS:
            return { ...state, globalUnits_today: action.payload };

        case GET_GLOBAL_UNITS_YESTERDAY_SUCCESS:
            return { ...state, globalUnits_yesterday: action.payload };

        case GET_GLOBAL_UNITS_LONG_SUCCESS:
            return { ...state, globalUnits_long: action.payload };

        case ADD_GLOBAL_UNIT_SUCCESS:
            return { ...state, openAddGlobalUnitModal: false };

        case ADD_GLOBAL_UNIT_FAIL:
            return { ...state };

        case RENDER_GLOBAL_UNIT_TO_EDIT:
            return { ...state, globalUnit_to_edit: action.payload };
    
        default:
            return state;
    }
};









