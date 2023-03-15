import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import Logo from "../../../assets/img/layout/Moviiie.png";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <img src={Logo} className="responsive" color={logoColor} style={{ backgroundColor: "#3E2BF1", borderRadius: 10, width: '40%', padding: 10}}></img>
      <br/>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
