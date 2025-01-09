import { useState, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MDBox from "components/MDBox";
import axios from "axios";

const HorizontalCardSliderForOffers = () => {
  const [offers, setOffers] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef();

  // Fetch offers data from API
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/offers/getAllOffers", {
          headers: {
            Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI3NWU4OGUxZC1lMjVhLTQzOWYtOWUzMy02MTI0ZWQyMTk5ZjMiLCJ1c2VyUm9sZSI6IlNVUEVSX0FETUlOIiwiYWNjZXNzQ29kZSI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SjFjMlZ5U1dRaU9pSTNOV1U0T0dVeFpDMWxNalZoTFRRek9XWXRPV1V6TXkwMk1USTBaV1F5TVRrNVpqTWlMQ0pwWVhRaU9qRTNNelU0T1RBeE5qRXNJbVY0Y0NJNk1UY3pOamMxTkRFMk1YMC5aTnRVaTZQYk5DUHFxRnF6TTVoQng4WFpXT0h6eWRxV2ZOSmZvQjlvby1jIiwiaWF0IjoxNzM1ODkwMTgwfQ.q2BtFNfOEvw0KD-2bKC8SkhyBm8VbxVCxEWEOzwvX9A",
          },
        });
        setOffers(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load offers.");
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  // Auto slide every 5 seconds
  useEffect(() => {
    if (offers.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => {
          const nextSlide = prevSlide + 1;
          // When we reach the end of the offers, go back to the first
          if (nextSlide >= offers.length) {
            return 0; // Restart from the first offer
          }
          return nextSlide;
        });
      }, 5000); // 5 seconds

      return () => clearInterval(interval);
    }
  }, [offers]);

  const handleNext = () => {
    setCurrentSlide((prevSlide) => {
      const nextSlide = prevSlide + 1;
      if (nextSlide >= offers.length) {
        return 0; // Restart from the first offer
      }
      return nextSlide;
    });
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => {
      const prevSlideIndex = prevSlide - 1 < 0 ? offers.length - 1 : prevSlide - 1;
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
        height: "50px", // Adjust height to fit the offer text
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
        {/* Loop through the offers and display them */}
        {offers.map((offer, index) => (
          <MDBox
            key={offer.offersId} // Use offersId for unique key
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minWidth: "100%", // Ensure each offer takes full screen width
              padding: "0 20px", // Optional padding
              backgroundColor: "#f4f4f4",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          >
            <Typography variant="h6" color="text.secondary">
              {offer.offers}
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

export default HorizontalCardSliderForOffers;
