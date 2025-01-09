
// import React, { useEffect, useState } from "react";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import axios from "axios";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";

// // Material Dashboard 2 React example components
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";

// function OfferNewsList() {
//   const [tableData, setTableData] = useState({ columns: [], rows: [] });

//   // Fetch API data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8080/api/offerAndNews/getAllOfferAndNews",
//           {
//             headers: {
//               Authorization:
//                 "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI3NWU4OGUxZC1lMjVhLTQzOWYtOWUzMy02MTI0ZWQyMTk5ZjMiLCJ1c2VyUm9sZSI6IlNVUEVSX0FETUlOIiwiYWNjZXNzQ29kZSI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SjFjMlZ5U1dRaU9pSTNOV1U0T0dVeFpDMWxNalZoTFRRek9XWXRPV1V6TXkwMk1USTBaV1F5TVRrNVpqTWlMQ0pwWVhRaU9qRTNNelU0T1RBeE5qRXNJbVY0Y0NJNk1UY3pOamMxTkRFMk1YMC5aTnRVaTZQYk5DUHFxRnF6TTVoQng4WFpXT0h6eWRxV2ZOSmZvQjlvby1jIiwiaWF0IjoxNzM1ODkwMTgwfQ.q2BtFNfOEvw0KD-2bKC8SkhyBm8VbxVCxEWEOzwvX9A",
//             },
//           }
//         );

//         const data = response.data.data;

//         // Map API response to table data format
//         const rows = data.map((item, index) => ({
//           srNo: index + 1,
//           type: item.type || "N/A",
//           text: item.text || "N/A",
//           actions: (
//             <MDBox display="flex" justifyContent="center">
//               <IconButton color="primary" size="small">
//                 <EditIcon />
//               </IconButton>
//               <IconButton color="secondary" size="small">
//                 <DeleteIcon />
//               </IconButton>
//             </MDBox>
//           ),
//         }));

//         // Define table columns
//         const columns = [
//           { Header: "Sr. No", accessor: "srNo", align: "center" },
//           { Header: "Type", accessor: "type", align: "center" },
//           { Header: "Text", accessor: "text", align: "center" },
//           { Header: "Actions", accessor: "actions", align: "center" },
//         ];

//         setTableData({ columns, rows });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <DashboardLayout>
//       <MDBox pt={6} pb={3}>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <Card>
//               <MDBox
//                 mx={2}
//                 mt={-3}
//                 py={3}
//                 px={2}
//                 variant="gradient"
//                 bgColor="info"
//                 borderRadius="lg"
//                 coloredShadow="info"
//                 display="flex"
//                 justifyContent="center"
//                 alignItems="center"
//               >
//                 <h2 style={{ color: "white", margin: 0 }}>News and Offers</h2>
//               </MDBox>
//               <MDBox pt={3} px={3}>
//                 <DataTable
//                   table={tableData}
//                   isSorted={false}
//                   entriesPerPage={false}
//                   showTotalEntries={false}
//                   noEndBorder
//                 />
//               </MDBox>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default OfferNewsList;

import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

function OfferNewsList() {
  const [tableData, setTableData] = useState({ columns: [], rows: [] });
  const [loading, setLoading] = useState(true); // Loader state

  // Fetch API data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/offerAndNews/getAllOfferAndNews",
          {
            headers: {
              Authorization:
                "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI3NWU4OGUxZC1lMjVhLTQzOWYtOWUzMy02MTI0ZWQyMTk5ZjMiLCJ1c2VyUm9sZSI6IlNVUEVSX0FETUlOIiwiYWNjZXNzQ29kZSI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SjFjMlZ5U1dRaU9pSTNOV1U0T0dVeFpDMWxNalZoTFRRek9XWXRPV1V6TXkwMk1USTBaV1F5TVRrNVpqTWlMQ0pwWVhRaU9qRTNNelU0T1RBeE5qRXNJbVY0Y0NJNk1UY3pOamMxTkRFMk1YMC5aTnRVaTZQYk5DUHFxRnF6TTVoQng4WFpXT0h6eWRxV2ZOSmZvQjlvby1jIiwiaWF0IjoxNzM1ODkwMTgwfQ.q2BtFNfOEvw0KD-2bKC8SkhyBm8VbxVCxEWEOzwvX9A",
            },
          }
        );

        const data = response.data.data;

        // Map API response to table data format
        const rows = data.map((item, index) => ({
          srNo: index + 1,
          type: item.type || "N/A",
          text: item.text || "N/A",
          actions: (
            <MDBox display="flex" justifyContent="center">
              <IconButton color="primary" size="small">
                <EditIcon />
              </IconButton>
              <IconButton color="secondary" size="small">
                <DeleteIcon />
              </IconButton>
            </MDBox>
          ),
        }));

        // Define table columns
        const columns = [
          { Header: "Sr. No", accessor: "srNo", align: "center" },
          { Header: "Type", accessor: "type", align: "center" },
          { Header: "Text", accessor: "text", align: "center" },
          { Header: "Actions", accessor: "actions", align: "center" },
        ];

        setTableData({ columns, rows });
        setLoading(false); // Set loading to false after data is loaded
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <h2 style={{ color: "white", margin: 0 }}>News and Offers</h2>
              </MDBox>
              <MDBox pt={3} px={3}>
                {loading ? ( // Show loader while data is loading
                  <MDBox
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="300px" // Adjust height to your preference
                  >
                    <CircularProgress color="info" />
                  </MDBox>
                ) : (
                  <DataTable
                    table={tableData}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default OfferNewsList;

