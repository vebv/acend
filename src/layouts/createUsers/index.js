import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, MenuItem, Select, InputLabel, FormControl, Snackbar } from "@mui/material";
import MDBox from "components/MDBox";  // Fixed import path (remove extra space)
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

function UserCreate() {
  const [formData, setFormData] = useState({
    email: "",
    mobileNumber: "",  // Updated name for mobileNumber
    password: "",
    userRole: "ADMIN",  // Default userRole is ADMIN
    margin: 15,  // Default margin value
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Prepare the request body dynamically based on the selected userRole
      let requestData = { ...formData };

      if (formData.userRole !== "CLIENT") {
        // Remove margin field if userRole is not CLIENT
        delete requestData.margin;
      } else {
        // Ensure margin is sent as an integer
        requestData.margin = parseInt(formData.margin, 10);
      }

      // Debugging: Log the request body that will be sent to the API
      console.log("Request Body (before sending to API):", requestData);

      // Send the data to the backend API
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      // Debugging: Log the response status
      console.log("API Response Status:", response.status);

      if (response.ok && response.status === 201) {
        // Debugging: Log success
        console.log("User created successfully");
        setOpenSnackbar(true); // Show success message if API returns status 201
        setTimeout(() => setOpenSnackbar(false), 2000); // Close the Snackbar after 2 seconds
      } else {
        console.error("Error saving form, Response Status:", response.status);
        // Handle error
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClose = () => {
    setFormData({
      email: "",
      mobileNumber: "",  // Reset to empty value
      password: "",
      userRole: "ADMIN",  // Reset to default userRole
      margin: 15,  // Reset to default margin
    });
  };

  // Debugging: Log the form data whenever it changes
  console.log("Form Data (current state):", formData);

  return (
    <DashboardLayout>
      <MDBox
        pt={3}
        pb={3}
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ overflow: "hidden" }}  // Prevent vertical scroll
      >
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={8} md={6}>
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
                <h2 style={{ color: "white", margin: 0 }}>Create User</h2>
              </MDBox>
              <MDBox
                py={4}
                px={3}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                sx={{ paddingLeft: 12 }}  
              >
                <Grid container spacing={2} direction="column" alignItems="center">
                  <Grid item xs={12} style={{ width: "100%" }}>
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      name="email"  // Ensure name is consistent with formData keys
                      value={formData.email}
                      onChange={handleInputChange}
                      sx={{ maxWidth: 400 }}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ width: "100%" }}>
                    <TextField
                      fullWidth
                      label="Mobile Number"
                      variant="outlined"
                      name="mobileNumber"  // Updated name to match formData key
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      sx={{ maxWidth: 400 }}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ width: "100%" }}>
                    <TextField
                      fullWidth
                      label="Password"
                      variant="outlined"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      sx={{ maxWidth: 400 }}
                    />
                  </Grid>
                  {/* UserRole dropdown */}
                  <Grid item xs={12} style={{ width: "100%" }}>
                    <FormControl fullWidth variant="outlined" sx={{ maxWidth: 400 }} >
                      <InputLabel>User Role</InputLabel>
                      <Select
                        label="User Role"
                        name="userRole"
                        value={formData.userRole}
                        onChange={handleInputChange}
                        sx={{
                            height: "40px",
                          }}
                      >
                        <MenuItem value="ADMIN">ADMIN</MenuItem>
                        <MenuItem value="CLIENT">CLIENT</MenuItem>
                        <MenuItem value="BUSINESS_TEAM">BUSINESS_TEAM</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* Margin input field only visible for CLIENT role */}
                  {formData.userRole === "CLIENT" && (
                    <Grid item xs={12} style={{ width: "100%" }}>
                      <TextField
                        fullWidth
                        label="Margin"
                        variant="outlined"
                        name="margin"
                        type="number"
                        value={formData.margin}
                        onChange={handleInputChange}
                        sx={{ maxWidth: 400 }}
                      />
                    </Grid>
                  )}
                </Grid>
                <Box display="flex" justifyContent="center" mt={3} gap={2}>
                  <Button variant="contained" color="primary" onClick={handleSave}>
                    Save
                  </Button>
                </Box>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        message="User created successfully"
        autoHideDuration={2000} // Hide after 2 seconds
        onClose={() => setOpenSnackbar(false)}
      />
    </DashboardLayout>
  );
}

export default UserCreate;
