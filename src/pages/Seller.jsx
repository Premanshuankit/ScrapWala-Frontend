import { useState, useEffect, useMemo } from "react";
import { Box, Stack, Typography, Grid, Paper } from "@mui/material";
import { useGetAllListingsQuery } from "../features/marketplace/marketplaceApi";
import { Tooltip } from "@mui/material";
import { useSelector } from "react-redux";

function SellerLanding() {
    const { data: listings = [] } = useGetAllListingsQuery();
    const [selectedBuyer, setSelectedBuyer] = useState(null);

    const buyers = [
      ...new Map(
        listings.map((item) => [
          item.buyerId._id,
          item.buyerId,
        ])
      ).values(),
    ];

    const ellipsisStyle = {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      maxWidth: "100%",
    };

    useEffect(() => {
      if (buyers.length > 0 && !selectedBuyer) {
        setSelectedBuyer(buyers[0]);
      }
    }, [buyers]);

    const buyerListings = listings.filter(
      (item) => item.buyerId._id === selectedBuyer?._id
    );

    return (
      <Box sx={{ py: 6, px: 3 }}>
        <Typography variant='h3' gutterBottom>Available Buyers</Typography>
        {/* ROW 1 — BUYERS */}
        <Grid container spacing={3}>
          {buyers.map((buyer) => (
            <Grid item xs={12} sm={6} md={3} key={buyer._id}>

              <Paper
                  onClick={() => setSelectedBuyer(buyer)}
                  sx={{
                    width: 300,
                    p: 3,
                    cursor: "pointer",
                    borderRadius: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    border:
                      selectedBuyer?._id === buyer._id
                        ? "2px solid #b15d5d"
                        : "1px solid #e0e0e0",
                    transition: "0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: 6,
                    }}} >

                  <Box
                    component="img"
                    src={`http://localhost:3000/${buyer.shopImage}`}
                    alt={buyer.shopname}
                    sx={{
                      width: "100%",
                      height: 160,
                      objectFit: "cover",
                      borderRadius: 3,
                      mb: 2}}/>

                  <Box sx={{ flexGrow: 1 }}>
                    {/* First Name */}
                    <Tooltip title={buyer.firstname}>
                      <Typography variant="h6" fontWeight={600} sx={ellipsisStyle}>
                        {buyer.firstname}
                      </Typography>
                    </Tooltip>

                    {/* Shop Name */}
                    <Tooltip title={buyer.shopname}>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ ...ellipsisStyle, fontWeight: 500, mb: 1 }}
                      >
                        {buyer.shopname}
                      </Typography>
                    </Tooltip>

                    {/* Mobile */}
                    <Tooltip title={buyer.mobile}>
                      <Typography variant="body2" color="text.secondary" sx={ellipsisStyle}>
                        {buyer.mobile}
                      </Typography>
                    </Tooltip>

                    {/* Address */}
                    <Tooltip
                      title={`${buyer.address.street}, ${buyer.address.city}, ${buyer.address.state}`}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          ...ellipsisStyle,
                          mt: 1,
                        }}>
                        {buyer.address.street}, {buyer.address.city}, {buyer.address.state}
                      </Typography>
                    </Tooltip>
                  </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* ROW 2 — LISTINGS */}
        <Grid container spacing={3} mt={4}>
          {buyerListings.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item._id}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6">
                  {item.scrapType.toUpperCase()}
                </Typography>

                <Typography color="primary">
                  ₹ {item.ratePerKg} / kg
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

      </Box>
    );
}

export default SellerLanding;