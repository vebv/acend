
import { useState, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MDBox from "components/MDBox";
import axios from "axios";

const HorizontalCardSlider = () => {
  const [news, setNews] = useState([]); // Replace 'offers' with 'news'
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef();

  // Fetch news data from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/offerAndNews/getAllOfferAndNews", {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI3NWU4OGUxZC1lMjVhLTQzOWYtOWUzMy02MTI0ZWQyMTk5ZjMiLCJ1c2VyUm9sZSI6IlNVUEVSX0FETUlOIiwiYWNjZXNzQ29kZSI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SjFjMlZ5U1dRaU9pSTNOV1U0T0dVeFpDMWxNalZoTFRRek9XWXRPV1V6TXkwMk1USTBaV1F5TVRrNVpqTWlMQ0pwWVhRaU9qRTNNelU0T1RBeE5qRXNJbVY0Y0NJNk1UY3pOamMxTkRFMk1YMC5aTnRVaTZQYk5DUHFxRnF6TTVoQng4WFpXT0h6eWRxV2ZOSmZvQjlvby1jIiwiaWF0IjoxNzM1ODkwMTgwfQ.q2BtFNfOEvw0KD-2bKC8SkhyBm8VbxVCxEWEOzwvX9A",
          },
        });

        // Log the response to check the structure
        console.log(response.data);

        setNews(response.data.data); // Assuming the news data is in the 'data' property
        setLoading(false);
      } catch (err) {
        setError("Failed to load news.");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Auto slide every 5 seconds
  useEffect(() => {
    if (news.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => {
          const nextSlide = prevSlide + 1;
          // When we reach the end of the news, go back to the first
          if (nextSlide >= news.length) {
            return 0; // Restart from the first news
          }
          return nextSlide;
        });
      }, 5000); // 5 seconds

      return () => clearInterval(interval);
    }
  }, [news]);

  const handleNext = () => {
    setCurrentSlide((prevSlide) => {
      const nextSlide = prevSlide + 1;
      if (nextSlide >= news.length) {
        return 0; // Restart from the first news
      }
      return nextSlide;
    });
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => {
      const prevSlideIndex = prevSlide - 1 < 0 ? news.length - 1 : prevSlide - 1;
      return prevSlideIndex;
    });
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <MDBox
      ref={sliderRef}
      sx={{
        display: "flex",
        overflow: "hidden",
        width: "100%", // Full width
        height: "50px", // Adjust height to fit the news text
        borderRadius: "8px",
        position: "relative",
        justifyContent: "center", // Center the content
        alignItems: "center", // Center the content vertically
      }}
    >
      <MDBox
        sx={{
          display: "flex",
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: "transform 0.5s ease-in-out", // Smooth transition
          width: "100%", // Ensure the width is 100%
        }}
      >
        {/* Filter news items to display only those with type 'NEWS' */}
        {news
          .filter((item) => item.type === "NEWS") // Filter by 'NEWS' type
          .map((item, index) => (
            <MDBox
              key={item.offersAndNews} // Use offersAndNews for unique key
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minWidth: "100%", // Ensure each news item takes full screen width
                padding: "0 20px", // Optional padding
                backgroundColor: "#f4f4f4",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
            >
              <Typography variant="h6" color="text.secondary">
                {item.text} {/* Display the text from the response */}
              </Typography>
            </MDBox>
          ))}
      </MDBox>

      {/* Arrow Buttons */}
      <IconButton
        sx={{
          position: "absolute",
          top: "50%",
          left: "0",
          transform: "translateY(-50%)",
          zIndex: 10,
        }}
        onClick={handlePrev}
      >
        <ArrowBackIcon />
      </IconButton>
      <IconButton
        sx={{
          position: "absolute",
          top: "50%",
          right: "0",
          transform: "translateY(-50%)",
          zIndex: 10,
        }}
        onClick={handleNext}
      >
        <ArrowForwardIcon />
      </IconButton>
    </MDBox>
  );
};

export default HorizontalCardSlider;
