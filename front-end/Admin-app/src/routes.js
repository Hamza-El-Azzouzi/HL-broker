import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";

import DataTables from "views/admin/tables";

import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineSpeakerphone } from "react-icons/hi";
// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdLock,
} from "react-icons/md";
import { IoIosPaper } from "react-icons/io";
import Complaint from "views/admin/complain";

const routes = [
  {
    name: "Tableaux de bords",
    layout: "/admin",
    path: "Dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Utilisateurs",
    layout: "/admin",
    path: "Utilisateurs",
    icon: <IoPersonOutline className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Annonces",
    layout: "/admin",
    icon: <HiOutlineSpeakerphone className="h-6 w-6" />,
    path: "Annonces",
    component: <DataTables />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
   {
    name: "Complaine",
    layout: "/admin",
    path: "Complaine",
    icon: <IoIosPaper className="h-6 w-6" />,
    component: <Complaint />,
  }
];
export default routes;
