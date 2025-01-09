
// Material Dashboard 2 React layouts
import Tables from "layouts/tables";
import SignUp from "layouts/authentication/sign-up";
import SignIn from "layouts/authentication/sign-up";
import OfferNewsList from "layouts/authentication/components/OfferNewsList";
import UserList from "layouts/authentication/components/UserList";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  // {
  //   type: "collapse",
  //   name: "Dashboard",
  //   key: "dashboard",
  //   icon: <Icon fontSize="small">dashboard</Icon>,
  //   route: "/dashboard",
  //   component: <Dashboard />,
  // },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  {
    type: "collapse",
    name: "Create",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Offers/Advertisement",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/OfferNewsList",
    component: <OfferNewsList/>,
  },
  {
    type: "collapse",
    name: "User List",
    key: "User List",
    icon: <Icon fontSize="small">list</Icon>,
    route: "/authentication/UserList",
    component: <UserList/>,
  },
];

export default routes;
