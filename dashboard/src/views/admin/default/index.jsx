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
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import { useState, React } from "react";
import {
 MdAddTask,
 MdAttachMoney,
 MdBarChart,
 MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import OverviewBubble from "views/admin/default/components/OverviewBubble";
import OverviewWordCloud from "views/admin/default/components/OverviewWordCloud";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
 columnsDataCheck,
 columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import axios from "axios";
import Tableau from "tableau-react";

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
    <Tableau
     url="https://public.tableau.com/views/MoviesOverview_16784935676620/MoviesOverview?:language=zh-TW&publish=yes&:display_count=n&:origin=viz_share_link"
     options={options}
    />
   </SimpleGrid>
   <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
    <Tableau
     url="https://public.tableau.com/views/ProfitForEachGenreAcrossYears/1?:language=zh-TW&publish=yes&:display_count=n&:origin=viz_share_link"
     options={options}
    />
   </SimpleGrid>
   <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
    <TotalSpent />
    <WeeklyRevenue />
   </SimpleGrid>
   <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
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
   </SimpleGrid>
  </Box>
 );
}
