import { useState } from "react";
import {
  Box, Stack,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Autocomplete, 
  Chip
} from "@mui/material";
import { useCreateListingMutation, useCreateAllListingMutation } from "../features/listing/listingApi";

const SCRAP_TYPES = [
    { type: "iron", defaultRate: 30, image: "src/assets/iron.png" },
    { type: "steel", defaultRate: 58, image: "src/assets/steel.png" },
    { type: "tina", defaultRate: 16, image: "src/assets/tina.png" },
    { type: "aluminium", defaultRate: 120, image: "src/assets/aluminium.png" },
    { type: "copper", defaultRate: 600, image: "src/assets/copper.png" },
    { type: "pital", defaultRate: 400, image: "src/assets/pital.png" },
    { type: "carton", defaultRate: 10, image: "src/assets/carton.png" },
    { type: "books", defaultRate: 13, image: "src/assets/books.png" },
    { type: "newspaper", defaultRate: 20, image: "src/assets/newspaper.png" },
    { type: "magazine", defaultRate: 14, image: "src/assets/magazine.png" },
    { type: "plastic", defaultRate: 11, image: "src/assets/plastic.png" },
    { type: "pet-bottle", defaultRate: 20, image: "src/assets/pet-bottle.png" },
    { type: "glass", defaultRate: 5, image: "src/assets/glass.png" },
    { type: "e-waste", defaultRate: 100, image: "src/assets/e-waste.png" },
    { type: "battery", defaultRate: 90, image: "src/assets/battery.png" },
    { type: "cable-wire", defaultRate: 130, image: "src/assets/cable-wire.png" },
    { type: "motor", defaultRate: 600, image: "src/assets/motor.png" },
    { type: "fridge", defaultRate: 13, image: "src/assets/fridge.png" },
    { type: "ac", defaultRate: 200, image: "src/assets/ac.png" },
    { type: "washing-machine", defaultRate: 23, image: "src/assets/washing-machine.png" },
];

function ScrapListing() {
    const [createListing] = useCreateListingMutation();
    const [createAllListing, { isLoading }] = useCreateAllListingMutation();

    // Store current rates
    const [rates, setRates] = useState(
      SCRAP_TYPES.reduce((acc, item) => {
        acc[item.type] = item.defaultRate;
        return acc;
      }, {})
    );

    // Track edit mode
    const [editingItems, setEditingItems] = useState({});

    // Track edited values
    const [editedRates, setEditedRates] = useState({});

    const [selectedTypes, setSelectedTypes] = useState([]);

    const handleChange = (type, value) => {
      setRates((prev) => ({
        ...prev,
        [type]: value,
      }));

      setEditedRates((prev) => ({
        ...prev,
        [type]: value,
      }));
    };

    const handleEditToggle = (type) => {
      setEditingItems((prev) => ({
        ...prev,
        [type]: !prev[type],
      }));
    };

    // Keep original List All logic unchanged
    const handleSubmitAll = async () => {
      try {
        const payload = SCRAP_TYPES.map((item) => ({
          type: item.type,
          rate: Number(rates[item.type]),
        }));

        await createAllListing(payload).unwrap();
        alert("All items listed successfully");
      } catch (err) {
        console.error(err);
      }
    };

    // New Update Edited Items logic
    const handleUpdateEdited = async () => {
      try {
        const updatePromises = Object.keys(editedRates).map((type) =>
          createListing({
            scrapType: type,
            ratePerKg: Number(editedRates[type]),
          }).unwrap()
        );

        await Promise.all(updatePromises);

        alert("Edited items updated successfully");

        setEditedRates({});
        setEditingItems({});
      } catch (err) {
        console.error(err);
      }
    };

    const filteredScrapTypes =
      selectedTypes.length === 0
        ? SCRAP_TYPES
        : SCRAP_TYPES.filter((item) =>
            selectedTypes.includes(item.type)
      );

    return (
      <Box sx={{ py: 6, px: 3 }}>
        
        {/* Header Section */}
        
        <Box mb={4} maxWidth={600} mx="auto">
          <Autocomplete
            multiple
            options={SCRAP_TYPES.map((item) => item.type)}
            value={selectedTypes}
            onChange={(event, newValue) => {
              setSelectedTypes(newValue);
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option.toUpperCase()}
                  {...getTagProps({ index })}
                  color="primary"
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Filter Scrap Type"
                placeholder="Select scrap types"
              />
            )}
          />
        </Box>

        <Box textAlign="center" mb={6}>
          <Typography variant="h4" fontWeight={700} mb={2}>
            Scrap Listing
          </Typography>

          {/* Existing List All Button */}
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmitAll}
            disabled={isLoading}
            sx={{ mr: 2 }}
          >
            {isLoading ? "Listing..." : "List All Items"}
          </Button>

          {/* New Update Button */}
          {Object.keys(editedRates).length > 0 && (
            <Button
              variant="outlined"
              size="large"
              onClick={handleUpdateEdited}
            >
              Update Edited Items
            </Button>
          )}
        </Box>

        {/* Scrap Items */}
        <Grid container spacing={4} justifyContent="center">
          {filteredScrapTypes.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.type}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  textAlign: "center",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}>
                {/* Image */}
                <Box
                  component="img"
                  src={item.image}
                  alt={item.type}
                  sx={{
                    width: "100%",
                    height: 150,
                    objectFit: "cover",
                    borderRadius: 3,
                    mb: 2,
                  }}/>

                <Typography variant="h6" fontWeight={600}>
                  {item.type.toUpperCase()}
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    pt = {2} >
                    <TextField
                      label="Your Rate"
                      type="number"
                      value={rates[item.type]}
                      disabled={!editingItems[item.type]}
                      onChange={(e) =>
                        handleChange(item.type, e.target.value)
                      }
                      sx={{ flex: 1 }}
                    />

                  <Button
                      variant="outlined"
                      sx={{ minWidth: 100, minHeight: 55 }}
                      onClick={() => handleEditToggle(item.type)}
                    >
                    {editingItems[item.type] ? "Cancel" : "Edit"}
                  </Button>
                </Stack>

              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
}

export default ScrapListing;