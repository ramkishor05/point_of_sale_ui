
import GlobalDashboard from "views/Global/Dashboard/GlobalDashboard.jsx";
import GlobalCategory from "views/Global/Category/GlobalCategory.jsx";
import GlobalUnit from "views/Global/Unit/GlobalUnit.jsx";
import GlobalUnitGroup from "views/Global/Unit/GlobalUnitGroup.jsx";
import GlobalCountFreq from "views/Global/CountFreq/GlobalCountFreq.jsx";
import GlobalCategoryGroup from "../views/Global/Category/GlobalCategoryGroup";

//import CustDashboard from "views/Cust/Dashboard/CustDashboard.jsx";
import CustProducts from "views/Cust/Product/CustProducts.jsx"
import SaleProducts from "views/Cust/Sales/SaleProducts.jsx"
import Vendors from "views/Vendor/Vendors.jsx"
import VendorBusiness from "views/Vendor/Business/VendorBusiness.jsx"
import VendorCustomer from "views/Vendor/Customer/VendorCustomer.jsx"



import {
    Dashboard, Person, LocalDrink, LibraryBooks, BubbleChart, Notifications, PhoneIphone
} from 'material-ui-icons';
import CustCategory from "../views/Cust/Category/CustCategory";
import CustCategoryGroup from "../views/Cust/Category/CustCategoryGroup";
import CustUnit from "../views/Cust/Unit/CustUnit";
import CustUnitGroup from "../views/Cust/Unit/CustUnitGroup";


const appRoutes = {
  'ADMIN' : [
    { path: "/admin/category/group", sidebarName: "Global Category Group", navbarName: "Global Category Goup", icon: LibraryBooks, component: GlobalCategoryGroup },
    { path: "/admin/category", sidebarName: "Global Category", navbarName: "Global Category", icon: PhoneIphone, component: GlobalCategory },
    { path: "/admin/unitGroups", sidebarName: "Global Unit Groups", navbarName: "Global Unit Groups", icon: BubbleChart, component: GlobalUnitGroup },
    { path: "/admin/unit", sidebarName: "Global Units", navbarName: "Global Units", icon: BubbleChart, component: GlobalUnit }
  ],
  'OWNER': [
    { path: "/cust/category/group", sidebarName: "Cust Category Group", navbarName: "Cust Category Group", icon: LibraryBooks, component: CustCategoryGroup },
    { path: "/cust/category", sidebarName: "Cust Category", navbarName: "Categories", icon: PhoneIphone, component: CustCategory },
    { path: "/cust/unitGroups", sidebarName: "Cust Unit Groups", navbarName: "Cust Units", icon: BubbleChart, component: CustUnitGroup },
    { path: "/cust/unit", sidebarName: "Cust Units", navbarName: "Cust Units", icon: BubbleChart, component: CustUnit },
    { path: "/cust/products", sidebarName: "Products", navbarName: "Products", icon: LocalDrink, component: CustProducts }
    ,{ path: "/cust/sales", sidebarName: "Sales", navbarName: "Sales", icon: LocalDrink, component: SaleProducts }
    ,{ path: "/cust/vendors", sidebarName: "Vendors", navbarName: "Vendors", icon: LocalDrink, component: Vendors }
    ,{ path: "/cust/business", sidebarName: "Business", navbarName: "Business", icon: LocalDrink, component: VendorBusiness }
    ,{ path: "/cust/customer", sidebarName: "customer", navbarName: "customer", icon: LocalDrink, component: VendorCustomer }
  ]
}

export default appRoutes;
