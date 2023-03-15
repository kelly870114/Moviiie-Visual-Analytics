import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdMovie,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
// import RTL from "views/admin/rtl";


const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Movie/ TV Shows",
    layout: "/admin",
    path: "/nft-marketplace",
    icon: (
      <Icon
        as={MdMovie}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  
];

export default routes;
