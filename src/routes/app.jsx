import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Sales from "views/Sales/Sales.jsx";
import Items from "views/Items/Items.jsx";
import GlobalCategory from "views/admin/GlobalCategory.jsx";
import Jackpot from "views/Jackpot/Jackpot.jsx";
import MobileMoney from "views/MobileMoney/MobileMoney.jsx";
import CreditTransfers from "views/CreditTransfers/CreditTransfers.jsx";

import {
    Dashboard, Person, LocalDrink, LibraryBooks, BubbleChart, Notifications, PhoneIphone
} from 'material-ui-icons';

const appRoutes = [
    { path: "/dashboard", sidebarName: "Dashboard", navbarName: "Dashboard", icon: Dashboard, component: DashboardPage },
    { path: "/items", sidebarName: "Items", navbarName: "Items", icon: LocalDrink, component: Items },
    { path: "/sales", sidebarName: "Sales", navbarName: "Sales", icon: LocalDrink, component: Sales },
    { path: "/category", sidebarName: "Category", navbarName: "Category", icon: LibraryBooks, component: GlobalCategory },
    { path: "/unit", sidebarName: "Unit", navbarName: "Unit", icon: BubbleChart, component: Jackpot },
    { path: "/countfreq", sidebarName: "Count Freq", navbarName: "Count Freq", icon: PhoneIphone, component: MobileMoney },
    { path: "/credit_transfers", sidebarName: "Credit Transfer", navbarName: "Credit Transfer", icon: Notifications, component: CreditTransfers },
    { path: "/user", sidebarName: "User Profile", navbarName: "Profile", icon: Person, component: UserProfile },
    { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default appRoutes;
