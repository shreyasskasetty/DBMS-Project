/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.jsx";
import Profile from "views/examples/Profile.jsx";
import Maps from "views/examples/Maps.jsx";
import Register from "views/examples/Register.jsx";
import AdminLogin from "views/examples/AdminLogin.jsx";
import Login from "views/examples/Login.jsx";
import Tables from "views/examples/Tables.jsx";
import Icons from "views/examples/Icons.jsx";
import EmpRegister from "./views/examples/EmpRegister";
import Billing from "./views/examples/Billing";
import Inventory from "./views/examples/Inventory";
import Notification from "./views/examples/Notification";
import Sketch from "./views/examples/Sketch"
import Password from "./views/examples/Password";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    flag: 1
  },
  {
    path: "/Sketch",
    name: "SketchPad",
    icon: "ni ni-tv-2 text-primary",
    component: Sketch,
    layout: "/auth",
    flag: 0
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
    flag: 0
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
    flag: 0
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
    flag: 0
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
    flag: 1
  },
  {
    path: "/Login",
    name: "Employee Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    flag: 0
  },
  {
    path: "/register",
    name: "Registration",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
    flag: 0
  },
  {
    path: "/EmpRegister",
    name: "Employee Registeration",
    icon: "ni ni-circle-08 text-pink",
    component: EmpRegister,
    layout: "/admin",
    flag: 0
  },
  {
    path: "/adminlogin",
    name: "Admin Login",
    icon: "ni ni-circle-08 text-pink",
    component: AdminLogin,
    layout: "/auth",
    flag: 0
  },
  {
    path: "/billing",
    name: "Billing",
    icon: "ni ni-basket text-pink",
    component: Billing,
    layout: "/auth",
    flag: 0
  },
  {
    path: "/password",
    name: "Password",
    icon: "ni ni-basket text-pink",
    component: Password,
    layout: "/auth",
    flag: 0
  },
  {
    path: "/inventory",
    name: "Inventory",
    icon: "ni ni-archive-2 text-pink",
    component: Inventory,
    layout: "/auth",
    flag: 0
  },
  {
    path: "/notification",
    name: "Notification",
    icon: "ni ni-archive-2 text-pink",
    component: Notification,
    layout: "/admin",
    flag: 1
  }
];
export default routes;
