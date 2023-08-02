import { 
    GET_ALL_VENDOR_CUSTOMER_LIST_SUCCESS, VENDOR_CUSTOMER_ADD_SUCCESS,
    SHOW_VENDOR_CUSTOMER_LOADER, REMOVE_VENDOR_CUSTOMER_LOADER,
    VENDOR_CUSTOMER_TO_EDIT, VENDOR_CUSTOMER_EDIT_SUCCESS, GET_FINISHING_VENDOR_CUSTOMER_LIST
} from 'actions/types';

const INITIAL_STATE = {
    vendorCustomerList: [],
    vendorCustomerList_finishing: [],
    vendorCustomer: {
        id: '',
        title: '',
        name: '',
        desc: '',
        stockQnt: 0,
        purchasePrice: 0,
        purchaseUnit: 1,
        wholePrice: 0,
        wholeUnit: 1,
        retailPrice: 0,
        retailUnit: 1
    },
    show_vendor_customer_loader: false,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_VENDOR_CUSTOMER_LIST_SUCCESS:
            return { ...state, vendorCustomerList: action.payload, show_vendor_customer_loader: false };

        case SHOW_VENDOR_CUSTOMER_LOADER:
            return { ...state, show_vendor_customer_loader: true };
    
        case REMOVE_VENDOR_CUSTOMER_LOADER:
            return { ...state, show_vendor_customer_loader: false };

        case VENDOR_CUSTOMER_ADD_SUCCESS:
            return { ...state, show_vendor_customer_loader: false };

        case VENDOR_CUSTOMER_TO_EDIT:
            return { ...state, vendorCustomer: action.payload };

        case VENDOR_CUSTOMER_EDIT_SUCCESS:
            return { ...state, show_vendor_customer_loader: false };

        case GET_FINISHING_VENDOR_CUSTOMER_LIST:
            return { ...state, show_vendor_customer_loader: false, vendorCustomerList_finishing: action.payload };

        default:
            return state;
    }
};

