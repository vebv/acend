
import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function CreateUserForm() {
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState(""); // Dropdown value
  const [margin, setMargin] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // For success message
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null); // For storing the API response

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage(""); // Clear any previous messages

    // API URL
    const apiUrl = "http://localhost:8080/auth/register";

    // Request body
    const requestBody = {
      email,
      mobileNumber,
      password,
      userRole,
      margin: parseFloat(margin), // Ensure margin is treated as a number
    };

    // Send POST request
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success response
        console.log("API Response:", data);

        // Check if message exists in response
        if (data.message) {
          setMessage(data.message); // Set the success message
        } else {
          setError("Unexpected response format");
        }

        setLoading(false);
      })
      .catch((err) => {
        // Handle error
        console.error("API Error:", err);
        setError("Failed to submit form. Please try again.");
        setLoading(false);
      });
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        {/* Blue Gradient Header */}
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Create User
          </MDTypography>
        </MDBox>

        {/* Form Section */}
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            {/* Email Input */}
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>

            {/* Mobile Number Input */}
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Mobile Number"
                fullWidth
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </MDBox>

            {/* Password Input */}
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>

            {/* User Role Dropdown */}
            <MDBox mb={2}>
              <FormControl fullWidth>
                <InputLabel id="user-role-label">User Role</InputLabel>
                <Select
                  labelId="user-role-label"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  label="User Role"
                  sx={{
                    height: "40px",
                  }}
                >
                  <MenuItem value="SUPER_ADMIN">SUPER_ADMIN</MenuItem>
                  <MenuItem value="ADMIN">ADMIN</MenuItem>
                  <MenuItem value="BUISNESSTEAM">BUISNESSTEAM</MenuItem>
                  <MenuItem value="CLIENT">CLIENT</MenuItem>
                </Select>
              </FormControl>
            </MDBox>

            {/* Margin Input */}
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Margin"
                fullWidth
                value={margin}
                onChange={(e) => setMargin(e.target.value)}
              />
            </MDBox>

            {/* Message and Error */}
            {message && (
              <MDTypography variant="body1" color="success.main" align="center">
                {message} {/* Displaying the success message */}
              </MDTypography>
            )}
            {error && (
              <MDTypography variant="body1" color="error.main" align="center">
                {error}
              </MDTypography>
            )}

            {/* Submit Button */}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default CreateUserForm;
