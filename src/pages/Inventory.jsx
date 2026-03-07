import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import { useGetInventoryQuery } from "../features/inventory/inventoryApi";

/* Scrap image lookup */
const SCRAP_IMAGES = {
  iron: "src/assets/iron.png",
  steel: "src/assets/steel.png",
  tina: "src/assets/tina.png",
  aluminium: "src/assets/aluminium.png",
  copper: "src/assets/copper.png",
  pital: "src/assets/pital.png",
  carton: "src/assets/carton.png",
  books: "src/assets/books.png",
  newspaper: "src/assets/newspaper.png",
  magazine: "src/assets/magazine.png",
  plastic: "src/assets/plastic.png",
  "pet-bottle": "src/assets/pet-bottle.png",
  glass: "src/assets/glass.png",
  "e-waste": "src/assets/e-waste.png",
  battery: "src/assets/battery.png",
  "cable-wire": "src/assets/cable-wire.png",
  motor: "src/assets/motor.png",
  fridge: "src/assets/fridge.png",
  ac: "src/assets/ac.png",
  "washing-machine": "src/assets/washing-machine.png",
};

function Inventory() {
  const { data: inventory = [], isLoading } = useGetInventoryQuery();

  const handleSell = (item) => {
    console.log("Sell clicked:", item);
  };

  if (isLoading) {
    return (
      <Box textAlign="center" mt={6}>
        <Typography>Loading inventory...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 6, px: 3 }}>

      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h4" fontWeight={700}>
          My Inventory
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">

        {inventory.length === 0 ? (
          <Typography>No inventory available</Typography>
        ) : (

          inventory.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.scrapType}>

              <Paper
                elevation={3}
                sx={{
                    p: 3,
                    width: "100%",        // ⭐ important fix
                    borderRadius: 4,
                    textAlign: "center",
                    transition: "0.3s",
                    "&:hover": {
                    transform: "translateY(-5px)",
                    },
                }}
                >

                {/* Top content */}
                <Box>

                  {/* Image */}
                  <Box
                    component="img"
                    src={SCRAP_IMAGES[item.scrapType]}
                    alt={item.scrapType}
                    sx={{
                      width: "100%",
                      height: 150,
                      objectFit: "cover",
                      borderRadius: 3,
                      mb: 2,
                    }}
                  />

                  <Typography variant="h6" fontWeight={600}>
                    {item.scrapType.toUpperCase()}
                  </Typography>

                  <Typography sx={{ mt: 1 }}>
                    Total Quantity: <b>{item.totalQuantity} kg</b>
                  </Typography>

                  <Typography>
                    Avg Cost Price: <b>₹ {item.averageCostPrice}</b>
                  </Typography>

                  <Typography sx={{ mb: 2 }}>
                    Total Value: ₹ {item.totalQuantity * item.averageCostPrice}
                  </Typography>

                </Box>

                {/* Button pinned to bottom */}
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: "auto",
                    backgroundColor: "#b15d5d",
                    "&:hover": { backgroundColor: "#8c4b4b" }
                  }}
                  onClick={() => handleSell(item)}
                >
                  Sell
                </Button>

              </Paper>

            </Grid>
          ))

        )}

      </Grid>

    </Box>
  );
}

export default Inventory;