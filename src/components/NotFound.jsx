import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
              minHeight: "70vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              px: 2,
            }}>
          <ErrorOutlineIcon sx={{ fontSize: 80, mb: 2, color: "primary.main" }} />

          <Typography variant="h2" fontWeight={700} gutterBottom>
            404
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Oops! The page you’re looking for doesn’t exist.
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{
              mt: 2,
              px: 4,
              borderRadius: 2}}>
                Go Back Home
          </Button>
        </Box>
    );
}

export default NotFound;