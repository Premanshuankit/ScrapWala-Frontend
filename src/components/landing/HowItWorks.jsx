import { Box, Typography, Grid, Paper } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentsIcon from "@mui/icons-material/Payments";

function HowItWorks() {
  const steps = [
    {
        icon: <PersonAddIcon fontSize="large" />,
        title: "Register",
        desc: "Create an account as seller or shopkeeper.",
    },
    {
        icon: <LocalShippingIcon fontSize="large" />,
        title: "Sell in Minutes",
        desc: "Quickly list your scrap without hassle.",
    },
    {
        icon: <PaymentsIcon fontSize="large" />,
        title: "Get Paid",
        desc: "Secure and transparent transactions.",
    },
  ];

    return (
      <Box
          sx={{
              py: 10,
              px: 3,
              textAlign: "center",
              backgroundColor: "#ffffff",
            }}>
          <Box sx={{ maxWidth: "1100px", mx: "auto" }}>
            
            <Typography
              variant="h4"
              fontWeight={700}
              gutterBottom>
              How It Works
            </Typography>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 6 }}>
              Simple steps to buy and sell scrap efficiently.
            </Typography>

            <Grid container spacing={4} justifyContent="center">
              {steps.map((step, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      textAlign: "center",
                      height: "100%",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-6px)",
                      },
                    }}>
                    <Box sx={{ color: "primary.main", mb: 2 }}>
                      {step.icon}
                    </Box>

                    <Typography variant="h6" fontWeight={600}>
                      {step.title}
                    </Typography>

                    <Typography color="text.secondary" mt={1}>
                      {step.desc}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
      </Box>
    );
}

export default HowItWorks;