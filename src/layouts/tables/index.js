import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"; // Import TextField for search input

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import HorizontalCardSlider from "examples/Navbars/HorizontalCardSlider";
import HorizontalCardSliderForOffers from "examples/Navbars/DashboardNavbar/HorizontalCardSliderForOffers";

function Tables() {
  const { columns, rows } = authorsTableData();

  // State for toggling filter buttons
  const [filterEnabled, setFilterEnabled] = useState(false);
  const [closeEnabled, setCloseEnabled] = useState(false);
  const [filterOneEnabled, setFilterOneEnabled] = useState(false);
  const [filterTwoEnabled, setFilterTwoEnabled] = useState(false);
  const [filterThreeEnabled, setFilterThreeEnabled] = useState(false);

  // Handle toggle for filters
  const handleToggleFilter = () => setFilterEnabled((prev) => !prev);
  const handleToggleClose = () => setCloseEnabled((prev) => !prev);
  const handleToggleFilterOne = () => setFilterOneEnabled((prev) => !prev);
  const handleToggleFilterTwo = () => setFilterTwoEnabled((prev) => !prev);
  const handleToggleFilterThree = () => setFilterThreeEnabled((prev) => !prev);

  return (
    <DashboardLayout>
      <HorizontalCardSlider/>
      <HorizontalCardSlider/>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
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
                justifyContent="space-between" // Align buttons and search bar properly
                alignItems="center"
              >
                {/* Left Side Buttons */}
                <MDBox display="flex" alignItems="center" gap={2}>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: filterEnabled ? "green" : "gray",
                      color: "white",
                      height: "30px",
                      fontSize: "12px",
                    }}
                    onClick={handleToggleFilter}
                  >
                    Enable Filter
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: closeEnabled ? "green" : "gray",
                      color: "white",
                      height: "30px",
                      fontSize: "12px",
                    }}
                    onClick={handleToggleClose}
                  >
                    Close Filter
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: filterOneEnabled ? "green" : "gray",
                      color: "white",
                      height: "30px",
                      fontSize: "12px",
                    }}
                    onClick={handleToggleFilterOne}
                  >
                    Filter 1
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: filterTwoEnabled ? "green" : "gray",
                      color: "white",
                      height: "30px",
                      fontSize: "12px",
                    }}
                    onClick={handleToggleFilterTwo}
                  >
                    Filter 2
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: filterThreeEnabled ? "green" : "gray",
                      color: "white",
                      height: "30px",
                      fontSize: "12px",
                    }}
                    onClick={handleToggleFilterThree}
                  >
                    Filter 3
                  </Button>
                </MDBox>

                {/* Right Side Search Input */}
                <MDBox>
                  <TextField
                    variant="outlined"
                    placeholder="Search..."
                    size="small"
                    style={{ backgroundColor: "white", borderRadius: "5px" }}
                  />
                </MDBox>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
