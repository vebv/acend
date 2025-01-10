

import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";


import MDBox from "components/MDBox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import { FormControl, InputLabel, Select, MenuItem} from '@mui/material';



function OfferNewsList() {
  const [tableData, setTableData] = useState({ columns: [], rows: [] });
  const [loading, setLoading] = useState(true); // Loader state
  const [open, setOpen] = useState(false); // Modal state
  const [selectedItem, setSelectedItem] = useState(null); 
  const [formData, setFormData] = useState({ type: '', text: '' }); 

  // Fetch API data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/offerAndNews/getAllOfferAndNews",
        {
          headers: {
            Authorization:
"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJjOGEzMmI1NC1iNWZlLTRjZmUtYWI5YS1lYWJlNGY4ZmJhMDEiLCJ1c2VyUm9sZSI6IlNVUEVSX0FETUlOIiwiYWNjZXNzQ29kZSI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SjFjMlZ5U1dRaU9pSmpPR0V6TW1JMU5DMWlOV1psTFRSalptVXRZV0k1WVMxbFlXSmxOR1k0Wm1KaE1ERWlMQ0pwWVhRaU9qRTNNelkwTWpNNU56QXNJbVY0Y0NJNk1UY3pOekk0TnprM01IMC5JZDlzRlg1VDkxbDh0ZEY2SkVtTzZSQkRlU3ZlbEZaMkNpUnNLZWwtMFdNIiwiaWF0IjoxNzM2NDIzOTg1fQ.h504ZL2SKWBe74hWkEvbQT7nqlvuY_MCF-s-FiQkaZU"

          },
        }
      );

      const data = response.data.data;
      console.log(data);

      // Map API response to table data format
      const rows = data.map((item, index) => ({
        srNo: index + 1,
        type: item.type || "N/A",
        text: item.text || "N/A",
        actions: (
          <MDBox display="flex" justifyContent="center">
            <IconButton color="primary" size="small" onClick={() => handleEdit(item)}>
              <EditIcon />
            </IconButton>
            <IconButton color="secondary" size="small" onClick={() => handleDelete(item)}>
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
  
  const handleDelete = async (item) => {
    console.log(item)
    const confirmed = window.confirm(
      `Are you sure you want to delete this ${item.type}?`
    );
    
    if (confirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/api/offerAndNews/remove/${item.offersAndNews}`,
        
          {
            headers: {
              Authorization:
"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJjOGEzMmI1NC1iNWZlLTRjZmUtYWI5YS1lYWJlNGY4ZmJhMDEiLCJ1c2VyUm9sZSI6IlNVUEVSX0FETUlOIiwiYWNjZXNzQ29kZSI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SjFjMlZ5U1dRaU9pSmpPR0V6TW1JMU5DMWlOV1psTFRSalptVXRZV0k1WVMxbFlXSmxOR1k0Wm1KaE1ERWlMQ0pwWVhRaU9qRTNNelkwTWpNNU56QXNJbVY0Y0NJNk1UY3pOekk0TnprM01IMC5JZDlzRlg1VDkxbDh0ZEY2SkVtTzZSQkRlU3ZlbEZaMkNpUnNLZWwtMFdNIiwiaWF0IjoxNzM2NDIzOTg1fQ.h504ZL2SKWBe74hWkEvbQT7nqlvuY_MCF-s-FiQkaZU"
            },
          }
        );
        if (response.status === 200) {
          alert("deleted successfully!");
          // Refresh the user list after deletion
         
          fetchData();

        }
      } catch (error) {
        console.error("Error deleting :", error);
        alert("Failed to delete. Please try again.");
      }
    }
  };

  // Handle Edit Action - Open modal with item data
  const handleEdit = (item) => {
    setSelectedItem(item); // Set item to edit
    setFormData({ type: item.type, text: item.text }); 
    setOpen(true); // Open modal
  };

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  // Handle save edited data
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/offerAndNews/edit/${selectedItem.offersAndNews}`,
        formData,
        {
          headers: {
            Authorization:
"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJjOGEzMmI1NC1iNWZlLTRjZmUtYWI5YS1lYWJlNGY4ZmJhMDEiLCJ1c2VyUm9sZSI6IlNVUEVSX0FETUlOIiwiYWNjZXNzQ29kZSI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SjFjMlZ5U1dRaU9pSmpPR0V6TW1JMU5DMWlOV1psTFRSalptVXRZV0k1WVMxbFlXSmxOR1k0Wm1KaE1ERWlMQ0pwWVhRaU9qRTNNelkwTWpNNU56QXNJbVY0Y0NJNk1UY3pOekk0TnprM01IMC5JZDlzRlg1VDkxbDh0ZEY2SkVtTzZSQkRlU3ZlbEZaMkNpUnNLZWwtMFdNIiwiaWF0IjoxNzM2NDIzOTg1fQ.h504ZL2SKWBe74hWkEvbQT7nqlvuY_MCF-s-FiQkaZU"

          },
        }
      );

      if (response.status === 200) {
        alert("Offer/News updated successfully!");
        setOpen(false); // Close modal
        fetchData(); // Refresh data after editing
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
  };

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
                {loading ? (
                  <MDBox
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="300px"
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

<Dialog
  open={open}
  onClose={handleClose}
  sx={{
    '& .MuiDialog-paper': {
      width: '500px', // Set the desired width
      height: '400px', // Set the desired height
      padding: '20px', // Add padding inside the modal
    },
  }}
>
  <DialogTitle>Edit Offer/News</DialogTitle>
  <DialogContent>
    
  <MDBox mb={3}>
    <TextField
      label="Text"
      name="text"
      value={formData.text}
      onChange={handleChange}
      fullWidth
      margin="normal"
    />
    </MDBox>
    <MDBox mb={2}>
      <FormControl fullWidth>
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          value={formData.type}
          onChange={handleChange}
          label="Type"
          sx={{
            height: '40px', // Adjust as needed
            overflow: 'visible', // Prevent cropping
          }}
        >
          <MenuItem value="OFFERS">OFFERS</MenuItem>
          <MenuItem value="NEWS">NEWS</MenuItem>
        </Select>
      </FormControl>
    </MDBox>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="secondary">
      Close
    </Button>
    <Button onClick={handleSave} color="primary">
      Save
    </Button>
  </DialogActions>
</Dialog>

    </DashboardLayout>
  );
}
 export default OfferNewsList;

