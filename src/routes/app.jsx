
import GlobalCategory from "views/Global/Category/GlobalCategory.jsx";
import GlobalUnit from "views/Global/Unit/GlobalUnit.jsx";
import GlobalCountFreq from "views/Global/CountFreq/GlobalCountFreq.jsx";

import {
    Dashboard, Person, LocalDrink, LibraryBooks, BubbleChart, Notifications, PhoneIphone
} from 'material-ui-icons';

const appRoutes = 
 [
    { path: "/globalcategorygroup", sidebarName: "Global Category Group", navbarName: "globalCategoryList", icon: LibraryBooks, component: GlobalCategory },
    { path: "/globalcategory", sidebarName: "Global Category", navbarName: "globalCategoryGroupList", icon: PhoneIphone, component: GlobalCategory },
    { path: "/globalunitgroup", sidebarName: "Global Unit Groups", navbarName: "GlobalUnitGroups", icon: BubbleChart, component: GlobalUnit },
    { path: "/globalunit", sidebarName: "Global Units", navbarName: "GlobalUnits", icon: BubbleChart, component: GlobalUnit },
    { path: "/globalcountfreq", sidebarName: "Global Freq", navbarName: "Global Freq", icon: PhoneIphone, component: GlobalCountFreq },
    { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
]/*
  [
    { path: "/dashboard", sidebarName: "Dashboard", navbarName: "Dashboard", icon: Dashboard, component: DashboardPage },
    { path: "/items", sidebarName: "Items", navbarName: "Items", icon: LocalDrink, component: Items },
    { path: "/sales", sidebarName: "Sales", navbarName: "Sales", icon: LocalDrink, component: Sales },
    { path: "/category", sidebarName: "Category", navbarName: "categoryList", icon: LibraryBooks, component: GlobalCategory },
    { path: "/unit", sidebarName: "Units", navbarName: "Units", icon: BubbleChart, component: Unit },
    { path: "/countfreq", sidebarName: "Count Freq", navbarName: "Count Freq", icon: PhoneIphone, component: MobileMoney },
    { path: "/credit_transfers", sidebarName: "Credit Transfer", navbarName: "Credit Transfer", icon: Notifications, component: CreditTransfers },
    { path: "/user", sidebarName: "User Profile", navbarName: "Profile", icon: Person, component: UserProfile },
    { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
]*/;

export default appRoutes;
