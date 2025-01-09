
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"; 
import CircularProgress from "@mui/material/CircularProgress"; 
import UploadFileIcon from "@mui/icons-material/UploadFile"; 
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import HorizontalCardSlider from "examples/Navbars/HorizontalCardSlider";

// Custom Pop-Up Component
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Tables() {
  const { columns, rows: fetchedRows } = authorsTableData();

  // State for toggling filter buttons
  const [filterEnabled, setFilterEnabled] = useState(false);
  const [closeEnabled, setCloseEnabled] = useState(false);
  const [filterOneEnabled, setFilterOneEnabled] = useState(false);
  const [filterTwoEnabled, setFilterTwoEnabled] = useState(false);
  const [filterThreeEnabled, setFilterThreeEnabled] = useState(false);

  // State for loading
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar visibility

  // Handle toggle for filters
  const handleToggleFilter = () => setFilterEnabled((prev) => !prev);
  const handleToggleClose = () => setCloseEnabled((prev) => !prev);
  const handleToggleFilterOne = () => setFilterOneEnabled((prev) => !prev);
  const handleToggleFilterTwo = () => setFilterTwoEnabled((prev) => !prev);
  const handleToggleFilterThree = () => setFilterThreeEnabled((prev) => !prev);

  // Simulate data fetching
  useEffect(() => {
    setLoading(true); // Set loading to true
    setTimeout(() => {
      setRows(fetchedRows);
      setLoading(false); // Set loading to false after data fetch
    }, 2000); // Simulate a delay
  }, [fetchedRows]);

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Reset the Snackbar visibility before starting the upload
    setOpenSnackbar(false); // Close Snackbar before the file upload

    setUploading(true); // Start uploading

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/api/publications/addBulkPublication", {
        method: "POST",
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI3NWU4OGUxZC1lMjVhLTQzOWYtOWUzMy02MTI0ZWQyMTk5ZjMiLCJ1c2VyUm9sZSI6IlNVUEVSX0FETUlOIiwiYWNjZXNzQ29kZSI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SjFjMlZ5U1dRaU9pSTNOV1U0T0dVeFpDMWxNalZoTFRRek9XWXRPV1V6TXkwMk1USTBaV1F5TVRrNVpqTWlMQ0pwWVhRaU9qRTNNelU0T1RBeE5qRXNJbVY0Y0NJNk1UY3pOamMxTkRFMk1YMC5aTnRVaTZQYk5DUHFxRnF6TTVoQng4WFpXT0h6eWRxV2ZOSmZvQjlvby1jIiwiaWF0IjoxNzM1ODkwMTgwfQ.q2BtFNfOEvw0KD-2bKC8SkhyBm8VbxVCxEWEOzwvX9A",
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setOpenSnackbar(true); // Show Snackbar if upload is successful
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setUploading(false); 
    }
  };

  const handleDownloadDummyExcel = () => {
    // Define custom headers
    const headers = [
      "publication", 
      "orgPrice", 
      "marginPrice", 
      "usdPrice", 
      "wordsAllowed", 
      "backlinksAllowed", 
      "tat", 
      "sponsored", 
      "indexed", 
      "doFollow", 
      "genres", 
      "sample", 
      "daChecker", 
      "trafficChecker"
    ];
  
    // Define some static rows of data
    const dummyData = [
      {
        publication: "Example Publication 1", 
        orgPrice: 100, 
        marginPrice: 80, 
        usdPrice: 120, 
        wordsAllowed: 500, 
        backlinksAllowed: 10, 
        tat: 5, 
        sponsored: "Yes", 
        indexed: "No", 
        doFollow: "Yes", 
        genres: "Tech, Science", 
        sample: "Sample 1", 
        daChecker: "Checked", 
        trafficChecker: "Good"
      },
      {
        publication: "Example Publication 2", 
        orgPrice: 150, 
        marginPrice: 120, 
        usdPrice: 160, 
        wordsAllowed: 800, 
        backlinksAllowed: 20, 
        tat: 4, 
        sponsored: "No", 
        indexed: "Yes", 
        doFollow: "No", 
        genres: "Health, Lifestyle", 
        sample: "Sample 2", 
        daChecker: "Unchecked", 
        trafficChecker: "Average"
      }
    ];
  
    // Convert the static data to match the headers
    const worksheet = XLSX.utils.json_to_sheet(dummyData, { header: headers });
  
    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dummy Data");
  
    // Write the workbook to an array buffer
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  
    // Create a blob from the array buffer and download the file
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "DummyData.xlsx");
  };
  

  // Handle All Data Excel Download
const handleDownloadAllDataExcel = () => {
  // Filter the rows and map the sponsored, indexed, and doFollow fields
  const filteredRows = rows.map(({ sponsored, indexed, doFollow, ...rest }) => ({
    ...rest,
    sponsored: sponsored ? "Yes" : "No",
    indexed: indexed ? "Yes" : "No",
    doFollow: doFollow ? "Yes" : "No",
  }));

  // Convert the filtered rows to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(filteredRows);
  
  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "All Data");

  // Write the workbook to an array buffer
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // Create a blob from the array buffer and download the file
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, "AllData.xlsx");
};


  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <DashboardLayout>
      <HorizontalCardSlider />
      <HorizontalCardSlider />
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
                justifyContent="space-between"
                alignItems="center"
              >
                {/* Left Side Buttons */}
                <MDBox display="flex" alignItems="center" gap={2}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "blue", color: "white", height: "30px", fontSize: "12px" }}
                    onClick={handleDownloadDummyExcel}
                  >
                    Download Dummy Excel
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "blue", color: "white", height: "30px", fontSize: "12px" }}
                    onClick={handleDownloadAllDataExcel}
                  >
                    Download All Data
                  </Button>
                </MDBox>

                {/* Filters */}
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

                {/* Search Input */}
                <MDBox display="flex" alignItems="center" gap={2}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "grey", color: "white", height: "30px", fontSize: "12px" }}
                    startIcon={<UploadFileIcon />}
                    component="label"
                  >
                    Upload
                    <input type="file" hidden accept=".xlsx, .xls" onChange={handleFileUpload} />
                  </Button>
                  <TextField
                    variant="outlined"
                    placeholder="Search..."
                    size="small"
                    style={{ backgroundColor: "white", borderRadius: "5px" }}
                  />
                </MDBox>
              </MDBox>
              <MDBox pt={3}>
                {loading ? (
                  <MDBox display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                    <CircularProgress />
                  </MDBox>
                ) : (
                  <DataTable
                    table={{ columns, rows }}
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

      {/* Snackbar for success messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          File uploaded successfully!
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}

export default Tables;
