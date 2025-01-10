

// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Grid,
//   Card,
//   Button,
//   CircularProgress,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import MDBox from "components/MDBox";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";
// import authorsTableData from "layouts/tables/data/authorsTableData";
// import HorizontalCardSlider from "examples/Navbars/HorizontalCardSlider";
// import UploadFileIcon from "@mui/icons-material/UploadFile";
// import DownloadIcon from "@mui/icons-material/Download";
// import HorizontalCardSliderForOffers from "examples/Navbars/DashboardNavbar/HorizontalCardSliderForOffers";

// function Tables() {
//   const { columns, rows: fetchedRows } = authorsTableData();

//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     sponsored: null,
//     indexed: null,
//     doFollow: null,
//   });
//   const [uploading, setUploading] = useState(false);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setOpenSnackbar(false);
//     setUploading(true);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch(
//         "http://localhost:8080/api/publications/addBulkPublication",
//         {
//           method: "POST",
//           headers: {
//             Authorization:
//               "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJjOGEzMmI1NC1iNWZlLTRjZmUtYWI5YS1lYWJlNGY4ZmJhMDEiLCJ1c2VyUm9sZSI6IlNVUEVSX0FETUlOIiwiYWNjZXNzQ29kZSI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SjFjMlZ5U1dRaU9pSmpPR0V6TW1JMU5DMWlOV1psTFRSalptVXRZV0k1WVMxbFlXSmxOR1k0Wm1KaE1ERWlMQ0pwWVhRaU9qRTNNelkwTWpNNU56QXNJbVY0Y0NJNk1UY3pOekk0TnprM01IMC5JZDlzRlg1VDkxbDh0ZEY2SkVtTzZSQkRlU3ZlbEZaMkNpUnNLZWwtMFdNIiwiaWF0IjoxNzM2NDI0MjAzfQ.dqNdubEwUFwhkRU-kj7OLR59nXDNiFCDPyuu8N2O4gI", // Replace with your actual token
//           },
//           body: formData,
//         }
//       );

//       const data = await response.json();

//       if (response.status === 201) {
//         setSnackbarMessage(data.message || "Publication successfully uploaded!");
//         setOpenSnackbar(true);
//         setTimeout(() => setOpenSnackbar(false), 2000); // Hide Snackbar after 2 seconds
//         if (Array.isArray(data)) {
//           setRows(data); // Update table rows
//         }
//       } else {
//         alert(`Upload failed: ${data.message || "Unknown error"}`);
//       }
//     } catch (error) {
//       alert(`Error: ${error.message}`);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   const handleDownloadExcel = () => {
//     console.log("Download button clicked");
//     // Add your download handling code here
//   };

//   const toggleFilter = (filterKey) => {
//     setFilters((prevFilters) => {
//       const current = prevFilters[filterKey];
//       let next;
//       if (current === null) {
//         next = "yes";
//       } else if (current === "yes") {
//         next = "no";
//       } else {
//         next = null;
//       }
//       return { ...prevFilters, [filterKey]: next };
//     });
//   };

//   const clearAllFilters = () => {
//     setFilters({
//       sponsored: null,
//       indexed: null,
//       doFollow: null,
//     });
//   };

//   const filteredRows = useMemo(() => {
//     if (Object.values(filters).every((value) => value === null)) return rows;

//     return rows.filter((row) =>
//       Object.entries(filters).every(([key, value]) => {
//         if (value === null) return true;
//         return row[key]?.toLowerCase() === value.toLowerCase();
//       })
//     );
//   }, [rows, filters]);

//   useEffect(() => {
//     setLoading(true);
//     setTimeout(() => {
//       setRows(fetchedRows);
//       setLoading(false);
//     }, 2000);
//   }, [fetchedRows]);

//   return (
//     <DashboardLayout>
//       <HorizontalCardSlider />
// <HorizontalCardSliderForOffers/>
//       <MDBox pt={6} pb={3}>
//         <Grid container spacing={6}>
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
//                 justifyContent="space-between"
//                 alignItems="center"
//               >
//                 <MDBox display="flex" alignItems="center" gap={2}>
//                   <Button
//                     variant="contained"
//                     style={{
//                       backgroundColor:
//                         filters.indexed === "yes"
//                           ? "green"
//                           : filters.indexed === "no"
//                           ? "red"
//                           : "gray",
//                       color: "white",
//                     }}
//                     onClick={() => toggleFilter("indexed")}
//                   >
//                     {filters.indexed === "yes"
//                       ? "Yes"
//                       : filters.indexed === "no"
//                       ? "No"
//                       : "Indexed"}
//                   </Button>
//                   <Button
//                     variant="contained"
//                     style={{
//                       backgroundColor:
//                         filters.sponsored === "yes"
//                           ? "green"
//                           : filters.sponsored === "no"
//                           ? "red"
//                           : "gray",
//                       color: "white",
//                     }}
//                     onClick={() => toggleFilter("sponsored")}
//                   >
//                     {filters.sponsored === "yes"
//                       ? "Yes"
//                       : filters.sponsored === "no"
//                       ? "No"
//                       : "Sponsored"}
//                   </Button>
//                   <Button
//                     variant="contained"
//                     style={{
//                       backgroundColor:
//                         filters.doFollow === "yes"
//                           ? "green"
//                           : filters.doFollow === "no"
//                           ? "red"
//                           : "gray",
//                       color: "white",
//                     }}
//                     onClick={() => toggleFilter("doFollow")}
//                   >
//                     {filters.doFollow === "yes"
//                       ? "Yes"
//                       : filters.doFollow === "no"
//                       ? "No"
//                       : "DoFollow"}
//                   </Button>
//                   <Button
//                     variant="contained"
//                     style={{
//                       backgroundColor: "white",
//                       color: "grey",
//                     }}
//                     onClick={clearAllFilters}
//                   >
//                     Remove Filters
//                   </Button>
//                 </MDBox>
//                 <MDBox display="flex" alignItems="center" gap={2}>
//                 <Button
//                     variant="contained"
//                     style={{
//                       backgroundColor: "white",
//                       color: "grey",
//                     }}
//                     // onClick={}
//                   >
//                     Add
//                   </Button>
//                   <Button
//                     variant="contained"
//                     component="label"
//                     style={{
//                       backgroundColor: "white",
//                       color: "grey",
//                       height: "30px",
//                       fontSize: "12px",
//                     }}
//                   >
//                     {uploading ? (
//                       <CircularProgress color="inherit" size={24} />
//                     ) : (
//                       <UploadFileIcon style={{ marginRight: "8px" }} />
//                     )}
//                     <input
//                       hidden
//                       accept=".xlsx"
//                       type="file"
//                       onChange={handleFileUpload}
//                     />
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="white"
//                     style={{
//                       height: "30px",
//                       fontSize: "12px",
//                     }}
//                     onClick={handleDownloadExcel}
//                   >
//                     <DownloadIcon />
//                   </Button>
//                 </MDBox>
//               </MDBox>
//               <MDBox pt={3}>
//                 {loading ? (
//                   <CircularProgress />
//                 ) : (
//                   <DataTable
//                     table={{ columns, rows: filteredRows }}
//                     isSorted
//                     showTotalEntries
//                     entriesPerPage={5}
//                     canSearch
//                   />
//                 )}
//               </MDBox>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={2000} // Snackbar auto hides after 2 seconds
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity="success">
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </DashboardLayout>
//   );
// }

// export default Tables;









import React, { useState, useEffect, useMemo } from "react";
import {
  Grid,
  Card,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  InputAdornment,
} from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import authorsTableData from "layouts/tables/data/authorsTableData";
import HorizontalCardSlider from "examples/Navbars/HorizontalCardSlider";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import {  Modal, TextField, Radio, RadioGroup, FormControlLabel, FormControl, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Slider } from "@mui/material"; // Import Slider
import MDTypography from "components/MDTypography";
import HorizontalCardSliderforOffers from "examples/Navbars/DashboardNavbar/HorizontalCardSliderForOffers";

function Tables() {
  const { columns, rows: fetchedRows } = authorsTableData();
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [sliderRange, setSliderRange] = useState([0, 0]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sponsored: null,
    indexed: null,
    doFollow: null,
  });
  const [uploading, setUploading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [publicationData, setPublicationData] = useState({
    publication: "",
    orgPrice: "",
    marginPrice: "",
    usdPrice: "",
    wordsAllowed: "",
    backlinksAllowed: "yes",
    tat: "",
    sponsored: true,
    indexed: true,
    doFollow: true,
    genres: "",
    sample: "",
    daChecker: "",
    trafficChecker: ""
  });

 
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPublicationData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setPublicationData((prevData) => ({
      ...prevData,
      [name]: value === "yes"
    }));
  };
  

  // const handleMarginPriceChange = (event, newValue) => {
  //   setMarginPriceRange(newValue);
  // };
  useEffect(() => {
    if (rows.length > 0) {
      const marginPrices = rows.map(row => parseFloat(row.marginPrice) || 0);
      const minPrice = Math.min(...marginPrices);
      const maxPrice = Math.max(...marginPrices);
      setPriceRange([minPrice, maxPrice]);
      setSliderRange([minPrice, maxPrice]);
    }
  }, [rows]);
  const handleSavePublication = async () => {
    const requestBody = {
      publication: publicationData.publication,
      orgPrice: parseFloat(publicationData.orgPrice),
      marginPrice: parseFloat(publicationData.marginPrice),
      usdPrice: parseFloat(publicationData.usdPrice),
      wordsAllowed: parseInt(publicationData.wordsAllowed),
      backlinksAllowed: publicationData.backlinksAllowed,
      tat: parseInt(publicationData.tat),
      sponsored: publicationData.sponsored,
      indexed: publicationData.indexed,
      doFollow: publicationData.doFollow,
      genres: publicationData.genres,
      sample: publicationData.sample,
      daChecker: publicationData.daChecker,
      trafficChecker: publicationData.trafficChecker,
    };
  
    try {
      const response = await fetch(`http://localhost:8080/api/publications/addPublication`, {
        method: "POST",
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJjOGEzMmI1NC1iNWZlLTRjZmUtYWI5YS1lYWJlNGY4ZmJhMDEiLCJ1c2VyUm9sZSI6IlNVUEVSX0FETUlOIiwiYWNjZXNzQ29kZSI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SjFjMlZ5U1dRaU9pSmpPR0V6TW1JMU5DMWlOV1psTFRSalptVXRZV0k1WVMxbFlXSmxOR1k0Wm1KaE1ERWlMQ0pwWVhRaU9qRTNNelkwTWpNNU56QXNJbVY0Y0NJNk1UY3pOekk0TnprM01IMC5JZDlzRlg1VDkxbDh0ZEY2SkVtTzZSQkRlU3ZlbEZaMkNpUnNLZWwtMFdNIiwiaWF0IjoxNzM2NDkzMTI4fQ.T7LAfYz2l80Y79vbCJf3gLgrgJn4hUFlAIR19q9W6rY",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.status === 201) {
        const result = await response.json(); // Parse response to get the result
  
        // Assuming the result is the saved publication object
        setRows([...rows, result]); // Add the saved publication to the rows
        setSnackbarMessage("Publication added successfully!");
        setOpenSnackbar(true); // Show success snackbar
        handleCloseModal(); // Close modal after successful save
      } else {
        const error = await response.text(); // Get the error message
        console.error("Error saving publication:", error);
        setSnackbarMessage("Failed to save publication: " + error);
        setOpenSnackbar(true); // Show error snackbar
      }
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage("An error occurred while saving the publication.");
      setOpenSnackbar(true); // Show error snackbar
    }
  };
  
 
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setOpenSnackbar(false);
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://localhost:8080/api/publications/addBulkPublication",
        {
          method: "POST",
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJjOGEzMmI1NC1iNWZlLTRjZmUtYWI5YS1lYWJlNGY4ZmJhMDEiLCJ1c2VyUm9sZSI6IlNVUEVSX0FETUlOIiwiYWNjZXNzQ29kZSI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SjFjMlZ5U1dRaU9pSmpPR0V6TW1JMU5DMWlOV1psTFRSalptVXRZV0k1WVMxbFlXSmxOR1k0Wm1KaE1ERWlMQ0pwWVhRaU9qRTNNelkwTWpNNU56QXNJbVY0Y0NJNk1UY3pOekk0TnprM01IMC5JZDlzRlg1VDkxbDh0ZEY2SkVtTzZSQkRlU3ZlbEZaMkNpUnNLZWwtMFdNIiwiaWF0IjoxNzM2NDI0MjAzfQ.dqNdubEwUFwhkRU-kj7OLR59nXDNiFCDPyuu8N2O4gI", // Replace with your actual token
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.status === 201) {
        setSnackbarMessage(data.message || "Publication successfully uploaded!");
        setOpenSnackbar(true);
        setTimeout(() => setOpenSnackbar(false), 2000); // Hide Snackbar after 2 seconds
        if (Array.isArray(data)) {
          setRows(data); // Update table rows
        }
      } else {
        alert(`Upload failed: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleDownloadExcel = () => {
    console.log("Download button clicked");
    // Add your download handling code here
  };

  const toggleFilter = (filterKey) => {
    setFilters((prevFilters) => {
      const current = prevFilters[filterKey];
      let next;
      if (current === null) {
        next = "yes";
      } else if (current === "yes") {
        next = "no";
      } else {
        next = null;
      }
      return { ...prevFilters, [filterKey]: next };
    });
  };

  const clearAllFilters = () => {
    setFilters({
      sponsored: null,
      indexed: null,
      doFollow: null,
    });
  //  setMarginPriceRange([0, 1000]); // Reset range
  };
  const handleRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };
  
  const filteredRows = useMemo(() => {
    if (Object.values(filters).every(value => value === null) && 
        (priceRange[0] === sliderRange[0] && priceRange[1] === sliderRange[1])) 
      return rows;
  
    return rows.filter(row => {
      const marginPrice = parseFloat(row.marginPrice) || 0;
      const withinRange = marginPrice >= priceRange[0] && marginPrice <= priceRange[1];
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (value === null) return true;
        return row[key]?.toLowerCase() === value.toLowerCase();
      });
      return withinRange && matchesFilters;
    });
  }, [rows, filters, priceRange, sliderRange]);
  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setRows(fetchedRows);
      
      setLoading(false);
    }, 2000);
  }, [fetchedRows]);
console.log("check",rows)
  return (
    <DashboardLayout>
      <HorizontalCardSlider />
      <HorizontalCardSliderforOffers/>
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
                <MDBox display="flex" alignItems="center" gap={2}>
              
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor:
                        filters.indexed === "yes"
                          ? "green"
                          : filters.indexed === "no"
                          ? "red"
                          : "gray",
                      color: "white",
                    }}
                    onClick={() => toggleFilter("indexed")}
                  >
                    {filters.indexed === "yes"
                      ? "Yes"
                      : filters.indexed === "no"
                      ? "No"
                      : "Indexed"}
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor:
                        filters.sponsored === "yes"
                          ? "green"
                          : filters.sponsored === "no"
                          ? "red"
                          : "gray",
                      color: "white",
                    }}
                    onClick={() => toggleFilter("sponsored")}
                  >
                    {filters.sponsored === "yes"
                      ? "Yes"
                      : filters.sponsored === "no"
                      ? "No"
                      : "Sponsored"}
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor:
                        filters.doFollow === "yes"
                          ? "green"
                          : filters.doFollow === "no"
                          ? "red"
                          : "gray",
                      color: "white",
                    }}
                    onClick={() => toggleFilter("doFollow")}
                  >
                    {filters.doFollow === "yes"
                      ? "Yes"
                      : filters.doFollow === "no"
                      ? "No"
                      : "DoFollow"}
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "white",
                      color: "grey",
                    }}
                    onClick={clearAllFilters}
                  >
                    Remove Filters
                  </Button>
                </MDBox>
                <MDBox display="flex" alignItems="center" gap={2}>
                <Button
                    variant="contained"
                    style={{
                      backgroundColor: "white",
                      color: "grey",
                    }}
                    onClick={handleOpenModal}
                  >
                    Add
                  </Button>
                  <Button
                    variant="contained"
                    component="label"
                    style={{
                      backgroundColor: "white",
                      color: "grey",
                      height: "30px",
                      fontSize: "12px",
                    }}
                  >
                    {uploading ? (
                      <CircularProgress color="inherit" size={24} />
                    ) : (
                      <UploadFileIcon style={{ marginRight: "8px" }} />
                    )}
                    <input
                      hidden
                      accept=".xlsx"
                      type="file"
                      onChange={handleFileUpload}
                    />
                  </Button>
                  <Button
                    variant="contained"
                    color="white"
                    style={{
                      height: "30px",
                      fontSize: "12px",
                    }}
                    onClick={handleDownloadExcel}
                  >
                    <DownloadIcon />
                  </Button>
                </MDBox>
              </MDBox>
              <MDBox display="flex" alignItems="center" gap={2} style={{ width: "60%",marginLeft: "16px" }}>

            {/* //</MDBox>  <MDBox display="flex" flexDirection="column" alignItems="center" gap={2}> */}
  <Slider
    value={priceRange}
    onChange={handleRangeChange}
    min={sliderRange[0]}
    max={sliderRange[1]}
    valueLabelDisplay="auto"
    marks={[
      { value: sliderRange[0], label: `${sliderRange[0]}` },
      { value: sliderRange[1], label: `${sliderRange[1]}` },
    ]}
    style={{ width: "80%" }}
  />
  {/* <MDTypography>
    Selected Range: {priceRange[0]} - {priceRange[1]}
  </MDTypography> */}
</MDBox>

              <MDBox pt={3}>
              
                {loading ? (
                  <CircularProgress />
                ) : (
                  <DataTable
                    table={{ columns, rows: filteredRows }}
                    isSorted
                    showTotalEntries
                    entriesPerPage={5}
                    canSearch
                    
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
  <div style={{ padding: 20 }}>
    <DialogTitle>Add Publication</DialogTitle>
    <DialogContent>
    <div style={{margin: 20 }}></div>
      <TextField
        label="Publication"
        fullWidth
        name="publication"
        value={publicationData.publication}
        onChange={handleInputChange}
        
        style={{ marginBottom: 16 }} // Add margin here
      />
      <TextField
        label="Original Price"
        fullWidth
        name="orgPrice"
        value={publicationData.orgPrice}
        onChange={handleInputChange}
        type="number"
        style={{ marginBottom: 16 }} // Add margin here
      />
      <TextField
        label="Margin Price"
        fullWidth
        name="marginPrice"
        value={publicationData.marginPrice}
        onChange={handleInputChange}
        type="number"
        style={{ marginBottom: 16 }} // Add margin here
      />
      <TextField
        label="USD Price"
        fullWidth
        name="usdPrice"
        value={publicationData.usdPrice}
        onChange={handleInputChange}
        type="number"
        style={{ marginBottom: 16 }} // Add margin here
      />
      <TextField
        label="Words Allowed"
        fullWidth
        name="wordsAllowed"
        value={publicationData.wordsAllowed}
        onChange={handleInputChange}
        type="number"
        style={{ marginBottom: 16 }} // Add margin here
      />
      <TextField
        label="Genres"
        fullWidth
        name="genres"
        value={publicationData.genres}
        onChange={handleInputChange}
        style={{ marginBottom: 16 }} // Add margin here
      />
      <TextField
        label="Sample"
        fullWidth
        name="sample"
        value={publicationData.sample}
        onChange={handleInputChange}
        style={{ marginBottom: 16 }} // Add margin here
      />
      <TextField
        label="DA Checker"
        fullWidth
        name="daChecker"
        value={publicationData.daChecker}
        onChange={handleInputChange}
        style={{ marginBottom: 16 }} // Add margin here
      />
      <TextField
        label="Traffic Checker"
        fullWidth
        name="trafficChecker"
        value={publicationData.trafficChecker}
        onChange={handleInputChange}
        style={{ marginBottom: 16 }} // Add margin here
      />
      <TextField
        label="TAT (Turnaround Time)"
        fullWidth
        name="tat"
        value={publicationData.tat}
        onChange={handleInputChange}
        type="number"
        style={{ marginBottom: 16 }} // Add margin here
      />

      <FormControl component="fieldset" style={{ marginBottom: 16 }}> {/* Add margin here */}
        <RadioGroup
          name="sponsored"
          value={publicationData.sponsored ? "yes" : "no"}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Sponsored" />
          <FormControlLabel value="no" control={<Radio />} label="Not Sponsored" />
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" style={{ marginBottom: 16 }}> {/* Add margin here */}
        <RadioGroup
          name="indexed"
          value={publicationData.indexed ? "yes" : "no"}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Indexed" />
          <FormControlLabel value="no" control={<Radio />} label="Not Indexed" />
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" style={{ marginBottom: 16 }}> {/* Add margin here */}
        <RadioGroup
          name="doFollow"
          value={publicationData.doFollow ? "yes" : "no"}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="yes" control={<Radio />} label="DoFollow" />
          <FormControlLabel value="no" control={<Radio />} label="NoFollow" />
        </RadioGroup>
      </FormControl>
    </DialogContent>

    <DialogActions>
      <Button onClick={handleCloseModal} color="secondary">Cancel</Button>
      <Button onClick={handleSavePublication} color="primary">Save</Button>
    </DialogActions>
  </div>
</Dialog>


      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000} // Snackbar auto hides after 2 seconds
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}

export default Tables;


