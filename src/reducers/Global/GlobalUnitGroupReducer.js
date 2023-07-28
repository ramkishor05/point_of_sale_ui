import { 
    GET_ALL_GLOBAL_UNIT_GROUPS_SUCCESS,
    GET_ALL_GLOBAL_UNIT_GROUPS_FAIL,
    GET_GLOBAL_UNIT_GROUPS_TODAY_SUCCESS, 
    GET_GLOBAL_UNIT_GROUPS_YESTERDAY_SUCCESS, 
    GET_GLOBAL_UNIT_GROUPS_LONG_SUCCESS,
    ADD_GLOBAL_UNIT_GROUP_SUCCESS, 
    ADD_GLOBAL_UNIT_GROUP_FAIL,
    RENDER_GLOBAL_UNIT_GROUP_TO_EDIT,
} from '../../actions/types';

const INITIAL_STATE = {
    globalUnitGroups: [],
    globalUnitGroups_today: [],
    globalUnitGroups_yesterday: [],
    globalUnitGroups_long: [],
    global_unit_group_to_edit: {
        name: '',
        unitGroupId: ''
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_GLOBAL_UNIT_GROUPS_SUCCESS:
            return { ...state, globalUnitGroups: action.payload };

        case GET_ALL_GLOBAL_UNIT_GROUPS_FAIL:
            return { ...state };

        case GET_GLOBAL_UNIT_GROUPS_TODAY_SUCCESS:
            return { ...state, globalUnitGroups_today: action.payload };

        case GET_GLOBAL_UNIT_GROUPS_YESTERDAY_SUCCESS:
            return { ...state, globalUnitGroups_yesterday: action.payload };

        case GET_GLOBAL_UNIT_GROUPS_LONG_SUCCESS:
            return { ...state, globalUnitGroups_long: action.payload };

        case ADD_GLOBAL_UNIT_GROUP_SUCCESS:
            return { ...state, openAddGlobalUnitGroupModal: false };

        case ADD_GLOBAL_UNIT_GROUP_FAIL:
            return { ...state };

        case RENDER_GLOBAL_UNIT_GROUP_TO_EDIT:
            return { ...state, global_unit_group_to_edit: action.payload };
    
        default:
            return state;
    }
};









