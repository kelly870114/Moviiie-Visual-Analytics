// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";

import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/dataTables/variables/columnsData";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
import React from "react";
import Tableau from "tableau-react";

export default function Settings() {
  // Chakra Color Mode

  const options = {
    hideTabs: true,
    hideToolbar: true
  };

  return (
    <Box pt={{ base: "130px", md: "100px", xl: "100px" }}>
      
      <Tableau
        url="https://public.tableau.com/views/heatmap_moviestar_top20/Top20MovieStarsConnection?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link"
      />

      <Tableau
        url="https://public.tableau.com/views/barchart_actorProfit/ProfitForTop20Actors?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link"
        options={options}
      />


      <Tableau
        url="https://public.tableau.com/views/barchart_directorProfit/ProfitForTop20Directors?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link"
        options={options}
      />

      <Tableau
        url="https://public.tableau.com/views/radarchart_rating2/GenreRating?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link"
        options={options}
      />


      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}>

      </SimpleGrid>
    </Box>
  );
}
