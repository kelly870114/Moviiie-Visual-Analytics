import { React, useState, useEffect } from "react";
import ReactWordcloud from "react-wordcloud";
import ReactApexChart from "react-apexcharts";

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
} from "@chakra-ui/react";
// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import NFT from "components/card/NFT";
import Card from "components/card/Card.js";

// Assets
// import Nft1 from "assets/img/nfts/Nft1.png";
// import Nft2 from "assets/img/nfts/Nft2.png";
// import Nft3 from "assets/img/nfts/Nft3.png";
// import Nft4 from "assets/img/nfts/Nft4.png";
// import Nft5 from "assets/img/nfts/Nft5.png";
// import Nft6 from "assets/img/nfts/Nft6.png";
// import Avatar1 from "assets/img/avatars/avatar1.png";
// import Avatar2 from "assets/img/avatars/avatar2.png";
// import Avatar3 from "assets/img/avatars/avatar3.png";
// import Avatar4 from "assets/img/avatars/avatar4.png";
// import Usa from "assets/img/dashboards/usa.png";
import MiniStatistics from "components/card/MiniStatistics";
// import IconBox from "components/icons/IconBox";
// import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
// import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import axios from "axios";
import AdminNavbarLinks from "components/navbar/NavbarLinksAdmin";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import WordCloud from "components/charts/WordCloud";

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
 const [movieCloud, setMovieCloud] = useState("");
 const [cloudResult, setcloudResult] = useState("No Result");
 //  const [movieBudgetNum, setMovieBudgetNum] = useState(0);
 const [movieRevenueNum, setMovieRevenueNum] = useState(0);
 const [barSeries, setBarSeries] = useState([
  {
   name: "Amount",
   data: [
    {
     x: "Budget",
     y: 1,
    },
    {
     x: "Revenue",
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
      x: "Revenue",
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
 //  const textColor = useColorModeValue("secondaryGray.900", "white");
 const options = {
  colors: ["#359de6", "#fc9f4c", "#89c789", "#d98080", "#b584e0", "#d1a097"],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [5, 60],
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
    text: "Budget and Revenue",
    style: { fontSize: 12, color: "#595959" },
   },
   categories: ["Budget", "Revenue"],
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
   // categories: ['1','2','3','4'],
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
      onMovieReviewClick={handleMovieReviewClick}
      onMovieReviewResultClick={handleMovieReviewResultClick}
      onMovieBudgetClick={handleMovieBudgetClick}
      onMovieRatingClick={handleMovieRatingClick}
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
    <MiniStatistics name="Moive Genre" value="Action" />
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
         <div style={{ height: 400, width: 600 }}>
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
   {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px"> */}
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
      {/* <Flex> */}
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
      {/* </Flex> */}
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
       Movie Budget and Revenue
      </Text>
     </Flex>

     <Box h="400px" mt="auto">
      {/* <Flex> */}
      <Box>
       {/* <h1>{movieBudgetNum}</h1> */}
       <div id="chart">
        <ReactApexChart
         options={barOptions}
         series={barSeries}
         type="bar"
         height={350}
        />
       </div>
      </Box>
      {/* </Flex> */}
     </Box>
    </Card>
   </SimpleGrid>
  </Box>
 );
}
