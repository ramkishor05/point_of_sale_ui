import { combineReducers } from 'redux';

import users from './usersReducer';
import items from './Cust/itemReducer';
import sales from './Cust/saleReducer';
import loader from './loaderReducer';
import mobileMoneys from './Cust/mobileMoneyReducer';
import units from './Global/custUnitReducer';
import footballs from './Cust/footballReducer';
import creditTransfers from './Cust/creditTransferReducer';
import globalCategoryList from './Global/GlobalCategoryReducer';
import globalCountFreqList from './Global/GlobalCountFreqReducer';


export default combineReducers({
    users,
    items,
    sales,
    loader,
    mobileMoneys,
    units,
    footballs,
    creditTransfers,
    globalCategoryList,
    globalCountFreqList
});