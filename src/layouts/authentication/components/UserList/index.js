
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import axios from "axios";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DataTable from "examples/Tables/DataTable";

// Material UI Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Material UI components for modal
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, Select, MenuItem} from '@mui/material';

function UserList() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false); // Modal state
  const [selectedUser, setSelectedUser] = useState(null); // User to edit
  const [formData, setFormData] = useState({
    email: "",
    mobileNumber: "",
    userRole: "",
  });
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/auth/getAllUsers", {
        headers: {
          Authorization:
          "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJjOGEzMmI1NC1iNWZlLTRjZmUtYWI5YS1lYWJlNGY4ZmJhMDEiLCJ1c2VyUm9sZSI6IlNVUEVSX0FETUlOIiwiYWNjZXNzQ29kZSI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SjFjMlZ5U1dRaU9pSmpPR0V6TW1JMU5DMWlOV1psTFRSalptVXRZV0k1WVMxbFlXSmxOR1k0Wm1KaE1ERWlMQ0pwWVhRaU9qRTNNelkwTWpNNU56QXNJbVY0Y0NJNk1UY3pOekk0TnprM01IMC5JZDlzRlg1VDkxbDh0ZEY2SkVtTzZSQkRlU3ZlbEZaMkNpUnNLZWwtMFdNIiwiaWF0IjoxNzM2NDIzOTg1fQ.h504ZL2SKWBe74hWkEvbQT7nqlvuY_MCF-s-FiQkaZU"
        },
      });

      // Define columns with Edit and Delete
      const userColumns = [
        { Header: "Sr. No.", accessor: "srNo", align: "center" },
        { Header: "Email", accessor: "email", align: "center" },
        { Header: "Mobile Number", accessor: "mobileNumber", align: "center" },
        { Header: "User Role", accessor: "userRole", align: "center" },
        {
          Header: "Actions", // Action column header
          accessor: "actions", // Action column accessor
          align: "center",
        },
      ];

      // Map rows from API response with Sr. No. and Actions
      const userRows = response.data.map((user, index) => ({
        srNo: index + 1, // Generate Sr. No. starting from 1
        email: user.email,
        mobileNumber: user.mobileNumber,
        userRole: user.userRole,
        actions: (
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            {/* Edit and Delete Icons */}
            <EditIcon
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => handleEdit(user)} // Open modal on edit
            />
            <DeleteIcon
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => handleDelete(user.userId)}
            />
          </div>
        ),
      }));

      setColumns(userColumns);
      setRows(userRows);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Call fetchUsers once when the component is mounted
  }, []);
  // Handle Edit Action - Open modal with user data
  const handleEdit = (user) => {
    setSelectedUser(user); // Set user to edit
    setFormData({
      email: user.email,
      mobileNumber: user.mobileNumber,
      userRole: user.userRole,
    });
    setOpen(true); // Open modal
  };

  // Handle Delete Action
  const handleDelete = async (userId) => {
    console.log(userId)
    const confirmed = window.confirm("Are you sure you want to delete this publication?");
    if (confirmed) {
      try {
        const response = await axios.delete(
        //  `http://localhost:8080/auth/delete/${userId}`,
          `http://localhost:8080/auth/delete/${userId}` ,
          {
            headers: {
              Authorization:
"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJjOGEzMmI1NC1iNWZlLTRjZmUtYWI5YS1lYWJlNGY4ZmJhMDEiLCJ1c2VyUm9sZSI6IlNVUEVSX0FETUlOIiwiYWNjZXNzQ29kZSI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SjFjMlZ5U1dRaU9pSmpPR0V6TW1JMU5DMWlOV1psTFRSalptVXRZV0k1WVMxbFlXSmxOR1k0Wm1KaE1ERWlMQ0pwWVhRaU9qRTNNelkwTWpNNU56QXNJbVY0Y0NJNk1UY3pOekk0TnprM01IMC5JZDlzRlg1VDkxbDh0ZEY2SkVtTzZSQkRlU3ZlbEZaMkNpUnNLZWwtMFdNIiwiaWF0IjoxNzM2NDIzOTg1fQ.h504ZL2SKWBe74hWkEvbQT7nqlvuY_MCF-s-FiQkaZU"
            },
          }
        );
        if (response.status === 200) {
          alert("Publication deleted successfully!");
          // Refresh the user list after deletion
          setRows((prevRows) => prevRows.filter((row) => row.id !== userId));
          fetchUsers();

        }
      } catch (error) {
        console.error("Error deleting publication:", error);
        alert("Failed to delete publication. Please try again.");
      }
    }
  };

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle save user data after editing
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/auth/edit/${selectedUser.userId}`, // Use user ID dynamically

        formData,
        {
          headers: {
            Authorization:
"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJjOGEzMmI1NC1iNWZlLTRjZmUtYWI5YS1lYWJlNGY4ZmJhMDEiLCJ1c2VyUm9sZSI6IlNVUEVSX0FETUlOIiwiYWNjZXNzQ29kZSI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SjFjMlZ5U1dRaU9pSmpPR0V6TW1JMU5DMWlOV1psTFRSalptVXRZV0k1WVMxbFlXSmxOR1k0Wm1KaE1ERWlMQ0pwWVhRaU9qRTNNelkwTWpNNU56QXNJbVY0Y0NJNk1UY3pOekk0TnprM01IMC5JZDlzRlg1VDkxbDh0ZEY2SkVtTzZSQkRlU3ZlbEZaMkNpUnNLZWwtMFdNIiwiaWF0IjoxNzM2NDIzOTg1fQ.h504ZL2SKWBe74hWkEvbQT7nqlvuY_MCF-s-FiQkaZU"
          },
        }
      );
      if (response.status === 200) {
        alert("User updated successfully!");
        setOpen(false); // Close modal
        fetchUsers();
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to delete publication. Please try again.");

    }
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DashboardLayout>
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
                justifyContent="center" // Center-align the text
                alignItems="center"
              >
                <MDBox>
                  <h2 style={{ color: "white", margin: 0 }}>User List</h2>
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

      {/* Modal for Edit */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mobile Number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
         
         <MDBox mb={2}>
  <FormControl fullWidth>
    <InputLabel>User Role</InputLabel>
    <Select
      name="userRole" // Ensure name is set for consistency
      value={formData.userRole}
      onChange={(e) => 
        setFormData((prevData) => ({
          ...prevData,
          userRole: e.target.value, // Update userRole directly
        }))
      }
      label="User Role"
      sx={{
        height: "40px",
      }}
    >
      <MenuItem value="ADMIN">ADMIN</MenuItem>
      <MenuItem value="BUSINESS_TEAM">BUSINESS TEAM</MenuItem>
      <MenuItem value="CLIENT">CLIENT</MenuItem>
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

export default UserList;
