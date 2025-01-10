
// import React, { useEffect, useState } from "react";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDBadge from "components/MDBadge";
// import IconButton from "@mui/material/IconButton";  // For buttons
// import EditIcon from "@mui/icons-material/Edit";   // Edit icon
// import DeleteIcon from "@mui/icons-material/Delete"; // Delete icon

// export default function Data() {
//   const [rows, setRows] = useState([]);

//   useEffect(() => {
//     const fetchPublications = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/api/publications/getAllPublication", {
//           method: "GET",
//           headers: {
//             Authorization:
//               "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJkNTNjMGY2MC1kMThiLTQ1MjgtOGRiYS1iZGU1NDU2OWQ5YzgiLCJ1c2VyUm9sZSI6IkNMSUVOVCIsImFjY2Vzc0NvZGUiOiJleUpoYkdjaU9pSklVekkxTmlKOS5leUoxYzJWeVNXUWlPaUprTlROak1HWTJNQzFrTVRoaUxUUTFNamd0T0dSaVlTMWlaR1UxTkRVMk9XUTVZemdpTENKcFlYUWlPakUzTXpZd09ETTFPVGdzSW1WNGNDSTZNVGN6TmprME56VTVPSDAueGJhMm84M3pyRmtwcWNwNWdMZGE0dUk1clMyZkJicW5QQ0F1akNDRERVVSIsImlhdCI6MTczNjA4MzYxNX0.TnIXFH_QA9KtMWavl6lkipCDdDIJywCUk5VWly98Gns",
//           },
//         });
//         const data = await response.json();
//         const formattedRows = data.map((item) => ({
//           publication: item.publication,
//           orgPrice: parseInt(item.orgPrice, 10),  // Convert to integer
//           marginPrice: parseInt(item.marginPrice, 10),  // Convert to integer
//           usdPrice: parseInt(item.usdPrice, 10),  // Convert to integer
//           wordsAllowed: parseInt(item.wordsAllowed, 10),  // Convert to integer
//           backlinksAllowed: item.backlinksAllowed,  // Convert to integer
//           tat: parseInt(item.tat, 10),  // Convert to integer
//           sponsored: item.sponsored ? "Yes" : "No",  // Map boolean to 'Yes' or 'No'
//           indexed: item.indexed ? "Yes" : "No",  // Map boolean to 'Yes' or 'No'
//           doFollow: item.doFollow ? "Yes" : "No",  // Map boolean to 'Yes' or 'No'
//           genres: item.genres,  // Keep as string or array, no change
//           sample: (
//             <a href={item.sample} target="_blank" rel="noopener noreferrer">
//               Sample Link
//             </a>
//           ),
//           daChecker: (
//             <a href={item.daChecker} target="_blank" rel="noopener noreferrer">
//               DA Checker
//             </a>
//           ),
//           trafficChecker: (
//             <a href={item.trafficChecker} target="_blank" rel="noopener noreferrer">
//               Traffic Checker
//             </a>
//           ),
//           action: (
//             <MDBox display="flex" justifyContent="space-around">
//               <IconButton
//                 color="primary"
//                 onClick={() => handleEdit(item)}  
//               >
//                 <EditIcon />
//               </IconButton>
//               <IconButton
//                 color="secondary"
//                 onClick={() => handleDelete(item)}  
//               >
//                 <DeleteIcon />
//               </IconButton>
//             </MDBox>
//           ),
//         }));
//         setRows(formattedRows);
//       } catch (error) {
//         console.error("Error fetching publications:", error);
//       }
//     };

//     fetchPublications();
//   }, []);

//   // Handle Edit button click
//   const handleEdit = (item) => {
//     console.log("Edit", item);
//     // Implement your edit functionality here
//   };

//   // Handle Delete button click
//   const handleDelete = (item) => {
//     console.log("Delete", item);
//     // Implement your delete functionality here
//   };

//   return {
//     columns: [
//       { Header: "publication", accessor: "publication", align: "left", sortable: false },
//       { Header: "orgPrice", accessor: "orgPrice", align: "left", sortable: false },
//       { Header: "marginPrice", accessor: "marginPrice", align: "left", sortable: false },
//       { Header: "usdPrice", accessor: "usdPrice", align: "left", sortable: false },
//       { Header: "wordsAllowed", accessor: "wordsAllowed", align: "left", sortable: false },
//       { Header: "backlinksAllowed", accessor: "backlinksAllowed", align: "left", sortable: false },
//       { Header: "tat", accessor: "tat", align: "left", sortable: false },
//       { Header: "sponsored", accessor: "sponsored", align: "center", sortable: false },
//       { Header: "indexed", accessor: "indexed", align: "center", sortable: false },
//       { Header: "doFollow", accessor: "doFollow", align: "center", sortable: false },
//       { Header: "genres", accessor: "genres", align: "left", sortable: false },
//       { Header: "sample", accessor: "sample", align: "left", sortable: false },
//       { Header: "daChecker", accessor: "daChecker", align: "center", sortable: false },
//       { Header: "trafficChecker", accessor: "trafficChecker", align: "center", sortable: false },
//       { Header: "Action", accessor: "action", align: "center", sortable: false },  // No sorting arrows here
//     ],
//     rows,
//   };
// }








import React, { useEffect, useState } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import EditIcon from "@mui/icons-material/Edit";   // Edit icon
import DeleteIcon from "@mui/icons-material/Delete"; // Delete icon
import axios from "axios";

import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
export default function Data() {
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [editId, setEditId] = useState(null);

  useEffect(() => {
 
  
    fetchPublications();
  }, []);
  
  const fetchPublications = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/publications/getAllPublication", {
        method: "GET",
        headers: {
          Authorization: 
          "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJjOGEzMmI1NC1iNWZlLTRjZmUtYWI5YS1lYWJlNGY4ZmJhMDEiLCJ1c2VyUm9sZSI6IlNVUEVSX0FETUlOIiwiYWNjZXNzQ29kZSI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SjFjMlZ5U1dRaU9pSmpPR0V6TW1JMU5DMWlOV1psTFRSalptVXRZV0k1WVMxbFlXSmxOR1k0Wm1KaE1ERWlMQ0pwWVhRaU9qRTNNelkwTWpNNU56QXNJbVY0Y0NJNk1UY3pOekk0TnprM01IMC5JZDlzRlg1VDkxbDh0ZEY2SkVtTzZSQkRlU3ZlbEZaMkNpUnNLZWwtMFdNIiwiaWF0IjoxNzM2NDkzMTI4fQ.T7LAfYz2l80Y79vbCJf3gLgrgJn4hUFlAIR19q9W6rY"
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data); // Log the response to check its structure

      // Ensure data is an array before mapping
      const formattedRows = Array.isArray(data)
        ? data.map((item) => ({
            publication: item.publication || "N/A",
            orgPrice: parseInt(item.orgPrice, 10) || 0,
            marginPrice: parseInt(item.marginPrice, 10) || 0,
            usdPrice: parseInt(item.usdPrice, 10) || 0,
            wordsAllowed: parseInt(item.wordsAllowed, 10) || 0,
            backlinksAllowed: item.backlinksAllowed !== null ? item.backlinksAllowed : "N/A",
            tat: parseInt(item.tat, 10) || 0,
            sponsored: item.sponsored ? "Yes" : "No",
            indexed: item.indexed ? "Yes" : "No",
            doFollow: item.doFollow ? "Yes" : "No",
            genres: item.genres || "N/A",
            sample: item.sample ? (
              <a href={item.sample} target="_blank" rel="noopener noreferrer">
                Sample Link
              </a>
            ) : "N/A",
            daChecker: item.daChecker ? (
              <a href={item.daChecker} target="_blank" rel="noopener noreferrer">
                DA Checker
              </a>
            ) : "N/A",
            trafficChecker: item.trafficChecker ? (
              <a href={item.trafficChecker} target="_blank" rel="noopener noreferrer">
                Traffic Checker
              </a>
            ) : "N/A",
            action: (
              <MDBox display="flex" justifyContent="space-around">
                <IconButton color="primary" onClick={() => handleEdit(item)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDelete(item)}>
                  <DeleteIcon />
                </IconButton>
              </MDBox>
            ),
          }))
        : []; // Default to an empty array if data is not an array

      setRows(formattedRows);
    } catch (error) {
      console.error("Error fetching publications:", error.message);
    }
  };
  const handleEdit = (item) => {
    setEditData(item);
    setEditId(item.userId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditData({});
    setEditId(null);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/publications/edit/${editId}`, {
        method: "PUT",
        headers: {
          Authorization:
          "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJkNTNjMGY2MC1kMThiLTQ1MjgtOGRiYS1iZGU1NDU2OWQ5YzgiLCJ1c2VyUm9sZSI6IkNMSUVOVCIsImFjY2Vzc0NvZGUiOiJleUpoYkdjaU9pSklVekkxTmlKOS5leUoxYzJWeVNXUWlPaUprTlROak1HWTJNQzFrTVRoaUxUUTFNamd0T0dSaVlTMWlaR1UxTkRVMk9XUTVZemdpTENKcFlYUWlPakUzTXpZd09ETTFPVGdzSW1WNGNDSTZNVGN6TmprME56VTVPSDAueGJhMm84M3pyRmtwcWNwNWdMZGE0dUk1clMyZkJicW5QQ0F1akNDRERVVSIsImlhdCI6MTczNjA4MzYxNX0.TnIXFH_QA9KtMWavl6lkipCDdDIJywCUk5VWly98Gns",

          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        fetchPublications(); // Refresh data
        handleCloseModal();
      } else {
        console.error("Error updating publication:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating publication:", error);
    }
  };

  
  const handleDelete = async (item) => {
    console.log(item)
    const confirmed = window.confirm("Are you sure you want to delete this publication?");
    if (confirmed) {
      try {
        const response = await axios.delete(
        //  `http://localhost:8080/auth/delete/${userId}`,
          `http://localhost:8080/api/publications/remove/${item.userId}` ,
          {
            headers: {
              Authorization:
              "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJjOGEzMmI1NC1iNWZlLTRjZmUtYWI5YS1lYWJlNGY4ZmJhMDEiLCJ1c2VyUm9sZSI6IlNVUEVSX0FETUlOIiwiYWNjZXNzQ29kZSI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SjFjMlZ5U1dRaU9pSmpPR0V6TW1JMU5DMWlOV1psTFRSalptVXRZV0k1WVMxbFlXSmxOR1k0Wm1KaE1ERWlMQ0pwWVhRaU9qRTNNelkwTWpNNU56QXNJbVY0Y0NJNk1UY3pOekk0TnprM01IMC5JZDlzRlg1VDkxbDh0ZEY2SkVtTzZSQkRlU3ZlbEZaMkNpUnNLZWwtMFdNIiwiaWF0IjoxNzM2NDkzMTI4fQ.T7LAfYz2l80Y79vbCJf3gLgrgJn4hUFlAIR19q9W6rY"

            },
          }
        );
        if (response.status === 200) {
          alert("Publication deleted successfully!");
          fetchPublications();

        }
      } catch (error) {
        console.error("Error deleting publication:", error);
        alert("Failed to delete publication. Please try again.");
      }
    }
  };

   return {
    columns: [
      { Header: "publication", accessor: "publication", align: "left", sortable: false },
      { Header: "orgPrice", accessor: "orgPrice", align: "left", sortable: false },
      { Header: "marginPrice", accessor: "marginPrice", align: "left", sortable: false },
      { Header: "usdPrice", accessor: "usdPrice", align: "left", sortable: false },
      { Header: "wordsAllowed", accessor: "wordsAllowed", align: "left", sortable: false },
      { Header: "backlinksAllowed", accessor: "backlinksAllowed", align: "left", sortable: false },
      { Header: "tat", accessor: "tat", align: "left", sortable: false },
      { Header: "sponsored", accessor: "sponsored", align: "center", sortable: false },
      { Header: "indexed", accessor: "indexed", align: "center", sortable: false },
      { Header: "doFollow", accessor: "doFollow", align: "center", sortable: false },
      { Header: "genres", accessor: "genres", align: "left", sortable: false },
      { Header: "sample", accessor: "sample", align: "left", sortable: false },
      { Header: "daChecker", accessor: "daChecker", align: "center", sortable: false },
      { Header: "trafficChecker", accessor: "trafficChecker", align: "center", sortable: false },
      { Header: "Action", accessor: "action", align: "center", sortable: false },  // No sorting arrows here
    ],
    rows,
  };

}
