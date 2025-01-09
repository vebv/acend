import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation after successful login

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import Tables from "layouts/tables";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [identifier, setIdentifier] = useState(""); // identifier (mobile number or username)
  const [password, setPassword] = useState(""); // password
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(""); // Reset error before API call
    setMessage(""); // Reset success message before API call
    console.log("Submitting form with identifier:", identifier); // Add log here
  
    try {
      // Call the login API to get the access token
      const loginResponse = await axios.post("http://localhost:8080/auth/login", {
        identifier, // send identifier (mobile number or username)
        password,   // send password
      });
      console.log("Login API Response:", loginResponse); // Log the response
  
      if (loginResponse.data.accessToken) {
        // Store token in local storage
        localStorage.setItem("accessToken", loginResponse.data.accessToken);
        setMessage("Login successful!");
  
        // Now use the access token to call the authentication API
        const authResponse = await axios.post("http://localhost:8080/auth/authenticate", {
          accessCode: loginResponse.data.accessToken, // Pass the accessToken from the login response
        });
  
        console.log("Authentication API Response:", authResponse); // Log the auth API response
  
        if (authResponse.data.sessionToken) {
          // Store session token in local storage
          localStorage.setItem("sessionToken", authResponse.data.sessionToken);
          setMessage("Authentication successful.");
  
          // Redirect to the /Tables page after successful authentication
          navigate("/Tables");
        } else {
          setError("Authentication failed.");
        }
      } else {
        setError("Login failed, no access token received.");
      }
    } catch (error) {
      // Handle errors, both network and response errors
      if (error.response) {
        // Server errors
        console.error("API error:", error.response.data); // Log the API error
        setError(error.response.data.message || "Something went wrong!");
      } else if (error.request) {
        // Network errors
        console.error("Network error:", error.request); // Log network error
        setError("Network error, please try again.");
      } else {
        console.error("Error:", error.message); // Log other errors
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <BasicLayout image={bgImage}>
      <Card>
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
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="text" // identifier can be email or phone number
                label="Identifier (Mobile or Email)"
                fullWidth
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            {message && (
              <MDTypography variant="body1" color="success.main" align="center">
                {message}
              </MDTypography>
            )}
            {error && (
              <MDTypography variant="body1" color="error.main" align="center">
                {error}
              </MDTypography>
            )}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
