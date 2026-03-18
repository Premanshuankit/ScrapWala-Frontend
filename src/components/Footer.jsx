import {
  Box,
  Typography,
  Grid,
  Container,
  IconButton,
  Button,
} from "@mui/material";
import RecyclingIcon from "@mui/icons-material/Recycling";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";

function Footer() {
    return (
      <Box
        component="footer"
        sx={{
          backgroundColor: "#b15d5dff",
          color: "#ffffff",
          mt: 0,
          pt: 8,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            
            <Grid item xs={12} md={5}>
              <Box display="flex" alignItems="center" mb={2}>
                <RecyclingIcon sx={{ color: "#fefefeff", mr: 1 }} />
                <Typography variant="h6" fontWeight={600}>
                  SCRAP MANAGER
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.8 }}>
                Connecting scrap sellers and shopkeepers through a
                transparent, secure and efficient marketplace.
              </Typography>

              <Box>
                <IconButton href="https://github.com/Premanshuankit"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ color: "#fff" }}>
                  <GitHubIcon />
                </IconButton>
                <IconButton href="https://www.linkedin.com/in/premanshu-ankit"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ color: "#fff" }}>
                  <LinkedInIcon />
                </IconButton>
                <IconButton sx={{ color: "#fff" }}>
                  <InstagramIcon />
                </IconButton>
                <IconButton sx={{ color: "#fff" }}>
                  <FacebookIcon />
                </IconButton>
              </Box>

              <Button
                variant="outlined"
                sx={{
                  mt: 3,
                  borderColor: "#fff",
                  color: "#fff",
                  borderRadius: 2,
                }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Back To Top
              </Button>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1" fontWeight={600} mb={2}>
                Site Map
              </Typography>

              <Typography variant="body2" sx={{ mb: 1 }}>
                Homepage
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Dashboard
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Register
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Contact Us
              </Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1" fontWeight={600} mb={2}>
                Legal
              </Typography>

              <Typography variant="body2" sx={{ mb: 1 }}>
                Privacy Policy
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Terms of Service
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Refund Policy
              </Typography>
            </Grid>
          </Grid>
        </Container>

        <Box
          sx={{
            backgroundColor: "#e6a23c",
            mt: 6,
            py: 1.5,
            textAlign: "center",
            color: "#1a1a1a",
            fontSize: "14px",
          }}>
            © {new Date().getFullYear()} Scrap Manager. All Rights Reserved.{" "}
            <span style={{ marginLeft: "4px" }}>
              Developed by{" "}
            </span>
            <a
              href="https://github.com/Premanshuankit"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#1a1a1a",
                fontWeight: 500,
                textDecoration: "underline",
              }}>
              Premanshu Ankit
            </a>
        </Box>
      </Box>
    );
}

export default Footer;