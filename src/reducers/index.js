import { combineReducers } from 'redux';

import userReducer from './usersReducer';
import custProducts from './Cust/custProductReducer';
import sales from './Cust/saleReducer';
import loader from './loaderReducer';
import mobileMoneys from './Cust/mobileMoneyReducer';
import globalUnitReducer from './Global/GlobalUnitReducer';
import globalUnitGroupReducer from './Global/GlobalUnitGroupReducer';

import footballs from './Cust/footballReducer';
import creditTransfers from './Cust/creditTransferReducer';
import globalCategoryReducer from './Global/GlobalCategoryReducer';
import globalCategoryGroupReducer from './Global/GlobalCategoryGroupReducer';
import globalCountFreqReducer from './Global/GlobalCountFreqReducer';
import vendorReducer from './vendorReducer';

import vendorBusinessReducer from './vendorBusinessReducer';
import vendorCustomerReducer from './vendorCustomerReducer';


export default combineReducers({
    userReducer,
    custProducts,
    sales,
    loader,
    mobileMoneys,
    globalUnitReducer,
    globalUnitGroupReducer,
    footballs,
    creditTransfers,
    globalCategoryGroupReducer,
    globalCategoryReducer,
    globalCountFreqReducer,
    vendorReducer,
    vendorBusinessReducer,
    vendorCustomerReducer
});