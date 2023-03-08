import { useState, useEffect } from "react";
import axios from "axios";

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

 //  const [inputValue, setInputValue] = useState("");
 //  const [filteredData, setFilteredData] = useState(bubbleChartData);

 //  const handleFilter = () => {
 //   const newFilteredData = bubbleChartData.filter((data) =>
 //    data.name.toLowerCase().includes(inputValue.toLowerCase())
 //   );
 //   setFilteredData(newFilteredData);
 //  };

 //  useEffect(() => {
 //   const movieData = [];
 //   const movieName = [];

 //   axios
 //    .get("http://localhost:5000/getMovieOverview/")
 //    .then((response) => {
 //     console.log("response", response);
 //     response.data.map((item) => {
 //      console.log("item", item);
 //      // category.push(item.employee_age);
 //      // data.push(item.employee_salary);
 //     });
 //     //    setCategory(salary);
 //     //    setData(age);
 //     //    console.log("age", age, salary);
 //    })
 //    .catch((e) => {
 //     alert(e);
 //    });
 //  }, []);

 // new line start
 const [profileData, setProfileData] = useState(null);

 function getData() {
  axios({
   method: "GET",
   url: "http://127.0.0.1:5000/getMovieOverview",
  })
   .then((response) => {
    const res = response.data;
    setProfileData({
     movie_name: res[0].movie_name,
     movie_budget: res[0].movie_budget,
    });
   })
   .catch((error) => {
    if (error.response) {
     console.log(error.response);
     console.log(error.response.status);
     console.log(error.response.headers);
    }
   });
 }
 //end of new line

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
    {/* new line start*/}
    <p>To get your profile details: </p>
    <Button onClick={getData}>Click me</Button>
    {profileData && (
     <div>
      <p>Movie name: {profileData.movie_name}</p>
      <p>About me: {profileData.movie_budget}</p>
     </div>
    )}
    {/* end of new line */}
    <Flex>
     {/* <Box>
      <Input
       placeholder="Search Movie"
       value={inputValue}
       onChange={(e) => setInputValue(e.target.value)}
      />
      <Button colorScheme="teal" size="md" onClick={handleFilter} mt="2">
       Filter
      </Button>
     </Box> */}

     <Box>
      <BubbleChart
       chartData={bubbleChartData}
       chartOptions={bubbleChartOption}
      />
     </Box>
    </Flex>
   </Box>
  </Card>
 );
}
