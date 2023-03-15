// The main dashboard view
// Chakra imports
import {
 Avatar,
 Box,
 Button,
 Flex,
 FormLabel,
 Icon,
 Select,
 SimpleGrid,
 useColorModeValue,
} from "@chakra-ui/react";
import { useState, React } from "react";
import axios from "axios";
import Tableau from "tableau-react";
import TableauEmbed from "../../../components/charts/TableauEmbed";

export default function UserReports() {
 // Chakra Color Mode
 const brandColor = useColorModeValue("brand.500", "white");
 const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

 // new line start
 const [profileData, setProfileData] = useState(null);

 const options = {
  hideTabs: true,
  hideToolbar: true,
 };

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
  <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
   <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
    {/* <Tableau
     url="https://public.tableau.com/views/MoviesOverview_16784935676620/MoviesOverview"
     options={options}
    /> */}
    <TableauEmbed/>
    {/* <Tableau
     url="https://public.tableau.com/views/MoviesOverview_16784935676620/javascripts/api/tableau-version.min.js"
     options={options}
    /> */}
    
   </SimpleGrid>
   <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
    <Tableau
     url="https://public.tableau.com/views/ProfitForEachGenreAcrossYears/1?:language=zh-TW&publish=yes&:display_count=n&:origin=viz_share_link"
     options={options}
    />
   </SimpleGrid>
   <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
    <Tableau url="https://public.tableau.com/views/heatmap_moviestar_top20/Top20MovieStarsConnection?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link" />
   </SimpleGrid>
   

   <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
    <Tableau url="https://public.tableau.com/views/barchart_actorProfit/ProfitForTop20Actors?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link" />
   </SimpleGrid>

   <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
    <Tableau url="https://public.tableau.com/views/barchart_directorProfit/ProfitForTop20Directors?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link" />
   </SimpleGrid>

   <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
    <Tableau url="https://public.tableau.com/views/radarchart_rating2/GenreRating?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link" />
   </SimpleGrid>


   {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
    <Tableau
     url="https://public.tableau.com/views/barchart_actorProfit/ProfitForTop20Actors?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link"
     options={options}
    />
    <Tableau
     url="https://public.tableau.com/views/barchart_directorProfit/ProfitForTop20Directors?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link"
     options={options}
    />
   </SimpleGrid> */}
   {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
    <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
    <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
     <DailyTraffic />
     <PieCard />
    </SimpleGrid>
   </SimpleGrid>
   <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
    <ComplexTable
     columnsData={columnsDataComplex}
     tableData={tableDataComplex}
    />
    <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
     <Tasks />
     <MiniCalendar h="100%" minW="100%" selectRange={false} />
    </SimpleGrid>
   </SimpleGrid> */}
  </Box>
 );
}
