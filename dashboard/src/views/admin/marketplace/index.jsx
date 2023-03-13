import { React, useState, useEffect } from "react";
import ReactWordcloud from "react-wordcloud";
import ReactApexChart from 'react-apexcharts';

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
 const [movieBudget, setMovieBudget] = useState("1");
 const [movieName, setMovieName] = useState("");
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


 const handleMovieBudgetChange = (budget) => {
   setMovieBudget(budget);
 };
 const handleMovieNameChange = (name) => {
  setMovieName(name);
 }
 const handleMovieReviewClick = (words) => {
  setMovieCloud(words);
 }
 const handleMovieReviewResultClick = (result) => {
  setcloudResult(result);
 }
 const handleMovieBudgetClick = (budget, revenue) => {
  var million = 1000000;
  budget = budget / million;
  revenue = revenue / million;
  setBarSeries([
    {
      name: "Amount",
      data: [
        {
          x: "Budget",
          y: budget,
        },
        {
          x: "Revenue",
          y: revenue,
        },
      ],
    },
  ]);
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
  transitionDuration: 1000
};

const barOptions = {
  chart: {
    type: 'bar',
    height: 500
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    title: {
      text: 'Budget and Revenue',
      style: {fontSize: 12, color: "#595959"}
    },
    categories: ['Budget', 'Revenue'],
  },
  yaxis: {
    title: {
      text: 'Amount (USD)',
      style: {fontSize: 12, color: "#595959"}
    },
    labels: {
      formatter: function (value) {
        return value + " M";
      }
    },
    min: 0,
    max: 3000, // At most 3000 millions
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return "$ " + val + " M"
      }
    }
  }
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
    
     <SearchBar onMovieBudgetChange={handleMovieBudgetChange} onMovieNameChange={handleMovieNameChange} onMovieReviewClick={handleMovieReviewClick} onMovieReviewResultClick={handleMovieReviewResultClick} onMovieBudgetClick={handleMovieBudgetClick}
     />
    <h2>Movie Budget: {movieBudget}</h2>
    <h2>Movie Name: {movieName}</h2>
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
     //  value={products.map((product) => (
     //   <p>{product.movie_name}, {product.movie_budget}</p>
     //  ))}
    />
    <MiniStatistics
     name="Movie Casts"
     value="Actor 1"
     //  value={products.map((product) => (
     //   <p>{product.movie_star1}, {product.movie_star2}</p>
     //  ))}
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
              <Text onMovieReviewResultClick={handleMovieReviewResultClick}>{cloudResult}</Text>
              <div style={{ height: 400, width: 600 }}>
                <ReactWordcloud options={options} onMovieReviewClick={handleMovieReviewClick} words={movieCloud} />
              </div>
          </div>
            </Box>
        </Flex>
      </Box>
    </Card>
   </SimpleGrid>

  {/* Column Chart */}
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
        Movie Budget and Revenue
        </Text>
      </Flex>

      <Box h="400px" mt="auto">
        <Flex>
            <Box>
              {/* <h1>{movieBudgetNum}</h1> */}
              <div id="chart">
                <ReactApexChart options={barOptions} series={barSeries} type="bar" height={350} />
              </div>
            </Box>
        </Flex>
      </Box>
    </Card>
   </SimpleGrid>
   

   {/* Main Fields */}
   {/* <Grid
    mb="20px"
    gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
    gap={{ base: "20px", xl: "20px" }}
    display={{ base: "block", xl: "grid" }}
   >
    <Flex
     flexDirection="column"
     gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
    > */}
     {/* <Image
      src="https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_UX67_CR0,0,67,98_AL_.jpg"
      alt="Dan Abramov"
      objectFit='cover'
     /> */}
     {/* <Banner />
     <Flex direction="column"> */}
      {/* <Flex
       mt="45px"
       mb="20px"
       justifyContent="space-between"
       direction={{ base: "column", md: "row" }}
       align={{ base: "start", md: "center" }}
      >
       <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
        Trending NFTs
       </Text>
       <Flex
        align="center"
        me="20px"
        ms={{ base: "24px", md: "0px" }}
        mt={{ base: "20px", md: "0px" }}
       >
        <Link
         color={textColorBrand}
         fontWeight="500"
         me={{ base: "34px", md: "44px" }}
         to="#art"
        >
         Art
        </Link>
        <Link
         color={textColorBrand}
         fontWeight="500"
         me={{ base: "34px", md: "44px" }}
         to="#music"
        >
         Music
        </Link>
        <Link
         color={textColorBrand}
         fontWeight="500"
         me={{ base: "34px", md: "44px" }}
         to="#collectibles"
        >
         Collectibles
        </Link>
        <Link color={textColorBrand} fontWeight="500" to="#sports">
         Sports
        </Link>
       </Flex>
      </Flex> */}
      {/* <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
       <NFT
        name="Abstract Colors"
        author="By Esthera Jackson"
        bidders={[
         Avatar1,
         Avatar2,
         Avatar3,
         Avatar4,
         Avatar1,
         Avatar1,
         Avatar1,
         Avatar1,
        ]}
        image={Nft1}
        currentbid="0.91 ETH"
        download="#"
       />
       <NFT
        name="ETH AI Brain"
        author="By Nick Wilson"
        bidders={[
         Avatar1,
         Avatar2,
         Avatar3,
         Avatar4,
         Avatar1,
         Avatar1,
         Avatar1,
         Avatar1,
        ]}
        image={Nft2}
        currentbid="0.91 ETH"
        download="#"
       />
       <NFT
        name="Mesh Gradients "
        author="By Will Smith"
        bidders={[
         Avatar1,
         Avatar2,
         Avatar3,
         Avatar4,
         Avatar1,
         Avatar1,
         Avatar1,
         Avatar1,
        ]}
        image={Nft3}
        currentbid="0.91 ETH"
        download="#"
       />
      </SimpleGrid> */}
      {/* <Text
       mt="45px"
       mb="36px"
       color={textColor}
       fontSize="2xl"
       ms="24px"
       fontWeight="700"
      >
       Recently Added
      </Text> */}
      {/* <SimpleGrid
       columns={{ base: 1, md: 3 }}
       gap="20px"
       mb={{ base: "20px", xl: "0px" }}
      >
       <NFT
        name="Swipe Circles"
        author="By Peter Will"
        bidders={[
         Avatar1,
         Avatar2,
         Avatar3,
         Avatar4,
         Avatar1,
         Avatar1,
         Avatar1,
         Avatar1,
        ]}
        image={Nft4}
        currentbid="0.91 ETH"
        download="#"
       />
       <NFT
        name="Colorful Heaven"
        author="By Mark Benjamin"
        bidders={[
         Avatar1,
         Avatar2,
         Avatar3,
         Avatar4,
         Avatar1,
         Avatar1,
         Avatar1,
         Avatar1,
        ]}
        image={Nft5}
        currentbid="0.91 ETH"
        download="#"
       />
       <NFT
        name="3D Cubes Art"
        author="By Manny Gates"
        bidders={[
         Avatar1,
         Avatar2,
         Avatar3,
         Avatar4,
         Avatar1,
         Avatar1,
         Avatar1,
         Avatar1,
        ]}
        image={Nft6}
        currentbid="0.91 ETH"
        download="#"
       />
      </SimpleGrid> */}
     {/* </Flex>
    </Flex> */}
    {/* <Flex
     flexDirection="column"
     gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
    > */}
     {/* <Card px="0px" mb="20px">
      <TableTopCreators
       tableData={tableDataTopCreators}
       columnsData={tableColumnsTopCreators}
      />
     </Card> */}
     {/* <Card p="0px"> */}
      {/* <Flex
       align={{ sm: "flex-start", lg: "center" }}
       justify="space-between"
       w="100%"
       px="22px"
       py="18px"
      >
       <Text color={textColor} fontSize="xl" fontWeight="600">
        History
       </Text>
       <Button variant="action">See all</Button>
      </Flex> */}

      {/* <HistoryItem
       name="Colorful Heaven"
       author="By Mark Benjamin"
       date="30s ago"
       image={Nft5}
       price="0.91 ETH"
      />
      <HistoryItem
       name="Abstract Colors"
       author="By Esthera Jackson"
       date="58s ago"
       image={Nft1}
       price="0.91 ETH"
      />
      <HistoryItem
       name="ETH AI Brain"
       author="By Nick Wilson"
       date="1m ago"
       image={Nft2}
       price="0.91 ETH"
      />
      <HistoryItem
       name="Swipe Circles"
       author="By Peter Will"
       date="1m ago"
       image={Nft4}
       price="0.91 ETH"
      />
      <HistoryItem
       name="Mesh Gradients "
       author="By Will Smith"
       date="2m ago"
       image={Nft3}
       price="0.91 ETH"
      />
      <HistoryItem
       name="3D Cubes Art"
       author="By Manny Gates"
       date="3m ago"
       image={Nft6}
       price="0.91 ETH"
      /> */}
     {/* </Card> */}
    {/* </Flex>
   </Grid> */}
   {/* Delete Product */}
  </Box>
 );
}