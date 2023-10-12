import { combineReducers } from 'redux';

import authReducer from './authReducer';

import userReducer from './userReducer';
import sales from './Cust/CustSaleReducer';
import loader from './loaderReducer';
import globalUnitReducer from './Global/GlobalUnitReducer';
import globalUnitGroupReducer from './Global/GlobalUnitGroupReducer';

import globalCategoryReducer from './Global/GlobalCategoryReducer';
import globalCategoryGroupReducer from './Global/GlobalCategoryGroupReducer';
import globalCountFreqReducer from './Global/GlobalCountFreqReducer';

import custUnitReducer from './Cust/CustUnitReducer';
import custUnitGroupReducer from './Cust/CustUnitGroupReducer';

import custCategoryReducer from './Cust/CustCategoryReducer';
import custCategoryGroupReducer from './Cust/CustCategoryGroupReducer';

import custProducts from './Cust/custProductReducer';


import vendorReducer from './vendorReducer';

import vendorBusinessReducer from './vendorBusinessReducer';
import vendorCustomerReducer from './vendorCustomerReducer';


export default combineReducers({
    authReducer,
    userReducer,
    sales,
    loader,
    vendorReducer,
    vendorBusinessReducer,
    vendorCustomerReducer,
    globalUnitReducer,
    globalUnitGroupReducer,
    globalCategoryGroupReducer,
    globalCategoryReducer,
    globalCountFreqReducer,
    custUnitReducer,
    custUnitGroupReducer,
    custCategoryGroupReducer,
    custCategoryReducer,
    custProducts
});