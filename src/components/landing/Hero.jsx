import { Box, Typography, Button, Grid } from "@mui/material";
import RecyclingIcon from "@mui/icons-material/Recycling";
import { motion } from "framer-motion";

function Hero() {

    return (
        <Box
            sx={{
              minHeight: "55vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              px: 3,
              background: "linear-gradient(135deg, #f8f9fb, #eef2f7)",
              overflow: "hidden"}}>

            <Grid container spacing={4} justifyContent="center" maxWidth="md">
              <Grid item xs={12}>
                
                  {/* Icon Animation */}
                  <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      whileHover={{
                          rotate: 15,
                          scale: 1.1,
                      }}
                      style={{ display: "inline-block" }}
                      >
                      <RecyclingIcon
                          sx={{
                          fontSize: 120,
                          color: "primary.main",
                          mb: 2,
                          cursor: "pointer",
                          }}
                      />
                  </motion.div>

                {/* Title Animation */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Typography variant="h3" fontWeight={700} gutterBottom>
                    Sell Scrap Smart.
                    <br />
                    Buy Scrap Easy.
                  </Typography>
                </motion.div>

                {/* Subtitle Animation */}
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                      Connect sellers and shopkeepers instantly.
                      Fast pickup. Transparent pricing. Secure process.
                    </Typography>
                </motion.div>
              </Grid>
            </Grid>
        </Box>
    );
}

export default Hero;