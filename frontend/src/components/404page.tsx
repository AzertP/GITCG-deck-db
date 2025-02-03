import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        bgcolor: "#f9f9f9",
        p: 3,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, color: "primary.main", mb: 2 }} />
      <Typography variant="h3" gutterBottom>
        404: Page Not Found
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
        Sorry, the page you are looking for does not exist. You can go back to the homepage.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{
          px: 4,
          py: 1.5,
          fontSize: "16px",
          borderRadius: "8px",
        }}
      >
        Go Home
      </Button>
    </Box>
  );
}