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
// Custom components
import BubbleChart from "components/charts/BubbleChart";
import React from "react";
import { bubbleChartData, bubbleChartOption } from "variables/charts";
import InputField from "components/fields/InputField";

export default function MovieOverview(props) {
 const { ...rest } = props;

 // Chakra Color Mode
 const textColor = useColorModeValue("secondaryGray.900", "white");
 const iconColor = useColorModeValue("brand.500", "white");
 const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
 const bgHover = useColorModeValue(
  { bg: "secondaryGray.400" },
  { bg: "whiteAlpha.50" }
 );
 const bgFocus = useColorModeValue(
  { bg: "secondaryGray.300" },
  { bg: "whiteAlpha.100" }
 );

 const [inputValue, setInputValue] = useState("");
 const [filteredData, setFilteredData] = useState(bubbleChartData);

 const handleFilter = () => {
  const newFilteredData = bubbleChartData.filter((data) =>
   data.name.toLowerCase().includes(inputValue.toLowerCase())
  );
  setFilteredData(newFilteredData);
 };

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
     Movie / TV Show Overview
    </Text>
   </Flex>

   <Box h="400px" mt="auto">
    <Flex>
     <Box>
      <Input
       placeholder="Search Movie"
       value={inputValue}
       onChange={(e) => setInputValue(e.target.value)}
      />
      <Button colorScheme="teal" size="md" onClick={handleFilter} mt="2">
       Filter
      </Button>
     </Box>
     <Box>
      <BubbleChart chartData={filteredData} chartOptions={bubbleChartOption} />
     </Box>
    </Flex>
   </Box>
  </Card>
 );
}
