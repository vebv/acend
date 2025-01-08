
import React, { useEffect, useState } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

export default function Data() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch("http://192.168.0.106:8080/api/publications/getAllPublication", {
          method: "GET",
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJkNTNjMGY2MC1kMThiLTQ1MjgtOGRiYS1iZGU1NDU2OWQ5YzgiLCJ1c2VyUm9sZSI6IkNMSUVOVCIsImFjY2Vzc0NvZGUiOiJleUpoYkdjaU9pSklVekkxTmlKOS5leUoxYzJWeVNXUWlPaUprTlROak1HWTJNQzFrTVRoaUxUUTFNamd0T0dSaVlTMWlaR1UxTkRVMk9XUTVZemdpTENKcFlYUWlPakUzTXpZd09ETTFPVGdzSW1WNGNDSTZNVGN6TmprME56VTVPSDAueGJhMm84M3pyRmtwcWNwNWdMZGE0dUk1clMyZkJicW5QQ0F1akNDRERVVSIsImlhdCI6MTczNjA4MzYxNX0.TnIXFH_QA9KtMWavl6lkipCDdDIJywCUk5VWly98Gns",
          },
        });
        const data = await response.json();
        const formattedRows = data.map((item) => ({
          publication: item.publication,
          orgPrice: `$${item.orgPrice}`,
          marginPrice: `$${item.marginPrice}`,
          usdPrice: `$${item.usdPrice}`,
          wordsAllowed: item.wordsAllowed.toString(),
          backlinksAllowed: item.backlinksAllowed,
          tat: `${item.tat} days`,
          sponsored: (
            <MDBadge
              badgeContent={item.sponsored ? "Yes" : "No"}
              color={item.sponsored ? "success" : "dark"}
              variant="gradient"
              size="sm"
            />
          ),
          indexed: (
            <MDBadge
              badgeContent={item.indexed ? "Yes" : "No"}
              color={item.indexed ? "success" : "dark"}
              variant="gradient"
              size="sm"
            />
          ),
          doFollow: (
            <MDBadge
              badgeContent={item.doFollow ? "Yes" : "No"}
              color={item.doFollow ? "success" : "dark"}
              variant="gradient"
              size="sm"
            />
          ),
          genres: item.genres,
          sample: (
            <a href={item.sample} target="_blank" rel="noopener noreferrer">
              Sample Link
            </a>
          ),
          daChecker: (
            <a href={item.daChecker} target="_blank" rel="noopener noreferrer">
              DA Checker
            </a>
          ),
          trafficChecker: (
            <a href={item.trafficChecker} target="_blank" rel="noopener noreferrer">
              Traffic Checker
            </a>
          ),
        }));
        setRows(formattedRows);
      } catch (error) {
        console.error("Error fetching publications:", error);
      }
    };

    fetchPublications();
  }, []);

  return {
    columns: [
      { Header: "publication", accessor: "publication", align: "left" },
      { Header: "orgPrice", accessor: "orgPrice", align: "left" },
      { Header: "marginPrice", accessor: "marginPrice", align: "left" },
      { Header: "usdPrice", accessor: "usdPrice", align: "left" },
      { Header: "wordsAllowed", accessor: "wordsAllowed", align: "left" },
      { Header: "backlinksAllowed", accessor: "backlinksAllowed", align: "left" },
      { Header: "tat", accessor: "tat", align: "left" },
      { Header: "sponsored", accessor: "sponsored", align: "center" },
      { Header: "indexed", accessor: "indexed", align: "center" },
      { Header: "doFollow", accessor: "doFollow", align: "center" },
      { Header: "genres", accessor: "genres", align: "left" },
      { Header: "sample", accessor: "sample", align: "left" },
      { Header: "daChecker", accessor: "daChecker", align: "center" },
      { Header: "trafficChecker", accessor: "trafficChecker", align: "center" },
    ],
    rows,
  };
}
