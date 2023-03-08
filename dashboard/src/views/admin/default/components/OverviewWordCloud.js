import { useState } from "react";
import {
 Box,
 Button,
 Flex,
 Icon,
 Text,
 Input,
 useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React from "react";
import WordCloud from "components/charts/WordCloud";

export default function MovieOverview(props) {
 const { ...rest } = props;

 // Chakra Color Mode
 const textColor = useColorModeValue("secondaryGray.900", "white");

 return (
  <Card align="center" direction="column" w="100%" {...rest}>
   <Flex align="center" w="100%" px="15px" py="10px">
    <Text
     me="auto"
     color={textColor}
     fontSize="xl"
     fontWeight="700"
     lineHeight="100%"
    >
    Movie Reviews Wordcloud
    </Text>
   </Flex>

   <Box h="400px" mt="auto">
    <Flex>
        <Box>
            <WordCloud/>
        </Box>
    </Flex>
   </Box>
  </Card>
 );
}
