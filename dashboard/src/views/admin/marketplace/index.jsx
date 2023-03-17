import { React, useState, useEffect } from "react";
import ReactWordcloud from "react-wordcloud";
import ReactApexChart from "react-apexcharts";
import {
    CiFaceSmile,
    CiFaceMeh,
    CiFaceFrown
} from "react-icons/ci";

// Chakra imports
import {
 Box,
 Button,
 Flex,
 Grid,
 Link,
 Text,
 useColorModeValue,
 SimpleGrid,
 Image,
 GridItem,
 Icon
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import MiniStatistics from "components/card/MiniStatistics";
import axios from "axios";
import { SearchBar } from "components/navbar/searchBar/SearchBar";

export default function Marketplace(props) {
 // Chakra Color Mode
 const brandColor = useColorModeValue("brand.500", "white");
 const textColor = useColorModeValue("secondaryGray.900", "white");
 const textColorBrand = useColorModeValue("brand.500", "white");
 const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
 let menuBg = useColorModeValue("white", "navy.800");
 const [products, setProducts] = useState([]);
 const shadow = useColorModeValue(
  "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
  "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
 );
 const { secondary } = props;
 const [movieName, setMovieName] = useState("");
 const [movieActors, setMovieActors] = useState([]);
 const [movieGenre, setMovieGenre] = useState("");
 const [movieCloud, setMovieCloud] = useState("");
 const [cloudResult, setcloudResult] = useState("");
//  const [movieSentiment, setMovieSentiment] = useState(0);
 const [sentimentColor, setSentimentColor] = useState(['#e6e6e8','#e6e6e8','#e6e6e8']);
 const [barSeries, setBarSeries] = useState([
  {
   name: "Amount",
   data: [
    {
     x: "Budget",
     y: 1,
    },
    {
     x: "Gross",
     y: 1,
    },
   ],
  },
 ]);
 const [radarSeries, setRadarSeries] = useState([
  {
   name: "Rating",
   data: [0, 0, 0, 0], // Tomatometer, Tomato audience, IMDb Audience, IMDb critics
  },
 ]);

 const handleMovieNameChange = (name) => {
  setMovieName(name);
 };
 const handleMovieActorChange = (actors) => {
  setMovieActors(actors);
 };
 const handleMovieGenreChange = (genre) => {
  setMovieGenre(genre);
 };
 const handleMovieReviewClick = (words) => {
  setMovieCloud(words);
 };
 const handleMovieReviewResultClick = (result) => {
  setcloudResult(result);
 };
 const handleMovieBudgetClick = (budget, revenue) => {
  var million = 1000000;
  var budgetM = budget / million;
  var revenueM = revenue / million;
  setBarSeries([
   {
    name: "Amount",
    data: [
     {
      x: "Budget",
      y: budgetM,
     },
     {
      x: "Gross",
      y: revenueM,
     },
    ],
   },
  ]);
 };

 const handleMovieRatingClick = (rating) => {
  setRadarSeries([
   {
    name: "Rating",
    data: rating, // Tomatometer, Tomato audience, IMDb Audience, IMDb critics
   },
  ]);
 };

 const handleMovieSentimentClick = (score) => {
    // Green #26de6d positive
    // Orange #f7a13e neutral
    // Red #f73e3e negative
    // Grey #e6e6e8 no-select
    const positiveColor = "#26de6d";
    const neutralColor = "#f7a13e";
    const negativeColor = "#f73e3e";
    const noColor = "#e6e6e8";

    if (score == -2) { // No result
        setSentimentColor([noColor, noColor, noColor]);
    }
    else if (score >= 0.9995){ // Positive
        setSentimentColor([positiveColor, noColor, noColor]);
    }
    else if (score <= -0.9900){ // Negative
        setSentimentColor([noColor, noColor, negativeColor]);
    }
    else { // Neutral
        setSentimentColor([noColor, neutralColor, noColor]);
    }
 }

 const fetchProducts = async () => {
  const { data } = await axios.get("http://127.0.0.1:5000/getMovieOverview");
  const products = data;
  setProducts(products);
  console.log(products);
 };
 useEffect(() => {
  fetchProducts();
 }, []);

 // WordCloud options
 const { ...rest } = props;
 const options = {
  colors: ["#359de6", "#fc9f4c", "#89c789", "#d98080", "#b584e0", "#d1a097"],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [15, 70],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 1,
  rotations: 3,
  rotationAngles: [0, 90],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 1000,
 };

 // Bar chart options
 const barOptions = {
  chart: {
   type: "bar",
   height: 500,
  },
  plotOptions: {
   bar: {
    borderRadius: 10,
    horizontal: false,
    columnWidth: "55%",
    endingShape: "rounded",
   },
  },
  dataLabels: {
   enabled: false,
  },
  stroke: {
   show: true,
   width: 2,
   colors: ["transparent"],
  },
  xaxis: {
   title: {
    text: "Budget and Gross",
    style: { fontSize: 12, color: "#595959" },
   },
   categories: ["Budget", "Gross"],
  },
  yaxis: {
   title: {
    text: "Amount (USD)",
    style: { fontSize: 12, color: "#595959" },
   },
   labels: {
    formatter: function (value) {
     return value + " M";
    },
   },
   min: 0,
   max: 3000, // At most 3000 millions
  },
  fill: {
   opacity: 1,
  },
  tooltip: {
   y: {
    formatter: function (val) {
     return "$ " + val + " M";
    },
   },
  },
 };

 // Radar chart options
 const radarOptions = {
  chart: {
   // height: 350,
   height: 500,
   width: "100%",
   type: "radar",
  },
  xaxis: {
   categories: [
    "Tomatometer",
    ["Tomoto", "Audience"],
    ["IMDb", "Audience"],
    ["IMDb", "Critics"],
   ],
   labels: {
    style: {
     fontSize: "11px",
     fontWeight: "bold",
     colors: ["#595959", "#595959", "#595959", "#595959"],
    },
   },
  },
 };

 return (
  <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
   <SimpleGrid
    columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
    gap="20px"
    mb="20px"
   >
    <Flex
     w={{ sm: "100%", md: "auto" }}
     alignItems="center"
     flexDirection="row"
     bg={menuBg}
     flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
     p="10px"
     borderRadius="30px"
     boxShadow={shadow}
    >
     <SearchBar
      onMovieNameChange={handleMovieNameChange}
      onMovieActorChange={handleMovieActorChange}
      onMovieGenreChange={handleMovieGenreChange}
      onMovieReviewClick={handleMovieReviewClick}
      onMovieReviewResultClick={handleMovieReviewResultClick}
      onMovieBudgetClick={handleMovieBudgetClick}
      onMovieRatingClick={handleMovieRatingClick}
      onMovieSentimentClick={handleMovieSentimentClick}
     />
    </Flex>
   </SimpleGrid>
   <SimpleGrid
    columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
    gap="20px"
    mb="20px"
   >
    <MiniStatistics
     name="Movie Name"
     value={movieName}
     onMovieNameChange={handleMovieNameChange}
    />
    <MiniStatistics
     name="Movie Casts"
     value={movieActors}
     onMovieActorChange={handleMovieActorChange}
    />
    <MiniStatistics
     name="Moive Genre"
     value={movieGenre}
     onMovieGenreChange={handleMovieGenreChange}
    />
   </SimpleGrid>
    {/* Sentiment */}
    <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
    <Card align="center" direction="column" w="100%" {...rest}>
     <Flex align="center" w="100%" px="15px" py="10px">
      <Text
       me="auto"
       color={textColor}
       fontSize="xl"
       fontWeight="700"
       lineHeight="100%"
      >
       Movie Reviews Sentiment Result
      </Text>
      <Flex width="22%">
        <Card width="90%" border="4px" borderColor={sentimentColor[0]}>
            <Flex align="center">
            <Icon as={CiFaceSmile} mr={4} width='50px' height='50px' color={sentimentColor[0]} viewBox="0 0 25 15"/>
            <Text fontSize='xl' as='b' color={sentimentColor[0]}>POSITIVE</Text>
            </Flex>
        </Card>
      </Flex>
      <Flex width="22%">
        <Card width="90%" border="4px" borderColor={sentimentColor[1]}>
            <Flex align="center">
            <Icon as={CiFaceMeh} mr={4} width='50px' height='50px' color={sentimentColor[1]} viewBox="0 0 25 15"/>
            <Text fontSize='xl' as='b' color={sentimentColor[1]}>NEUTRAL</Text>
            </Flex>
        </Card>
      </Flex>
      <Flex width="23%">
        <Card width="90%" border="4px" borderColor={sentimentColor[2]}>
            <Flex align="center">
            <Icon as={CiFaceFrown} mr={4} width='50px' height='50px' color={sentimentColor[2]} viewBox="0 0 25 15"/>
            <Text fontSize='xl' as='b' color={sentimentColor[2]}>NEGATIVE</Text>
            </Flex>
        </Card>
      </Flex>
     </Flex>
    </Card>
   </SimpleGrid>

   {/* Word Cloud */}
   <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
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
        <div>
         <Text onMovieReviewResultClick={handleMovieReviewResultClick}>
          {cloudResult}
         </Text>
         <div style={{ height: 400, width: 1000 }}>
          <ReactWordcloud
           options={options}
           onMovieReviewClick={handleMovieReviewClick}
           words={movieCloud}
          />
         </div>
        </div>
       </Box>
      </Flex>
     </Box>
    </Card>
   </SimpleGrid>

   {/* Bar Chart */}
   <SimpleGrid
    mb="20px"
    columns={{ sm: 1, md: 2 }}
    spacing={{ base: "20px", xl: "20px" }}
   >
    <Card align="center" direction="column" w="100%" {...rest}>
     <Flex align="center" w="100%" px="15px" py="10px">
      <Text
       me="auto"
       color={textColor}
       fontSize="xl"
       fontWeight="700"
       lineHeight="100%"
      >
       Movie Rating from Different Platforms
      </Text>
     </Flex>
     <Box h="400px" mt="auto">
      <Box>
       <div id="chart">
        <ReactApexChart
         options={radarOptions}
         series={radarSeries}
         type="radar"
         height={350}
        />
       </div>
      </Box>
     </Box>
    </Card>
    <Card align="center" direction="column" w="100%" {...rest}>
     <Flex align="center" w="100%" px="15px" py="10px">
      <Text
       me="auto"
       color={textColor}
       fontSize="xl"
       fontWeight="700"
       lineHeight="100%"
      >
       Movie Budget and Gross
      </Text>
     </Flex>

     <Box h="400px" mt="auto">
      <Box>
       <div id="chart">
        <ReactApexChart
         options={barOptions}
         series={barSeries}
         type="bar"
         height={350}
        />
       </div>
      </Box>
     </Box>
    </Card>
   </SimpleGrid>
  </Box>
 );
}
