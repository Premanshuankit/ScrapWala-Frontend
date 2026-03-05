import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Tooltip,
  Dialog,
  DialogContent,
  Paper,
  CircularProgress,
  TextField,
  MenuItem,
} from "@mui/material";
import { FixedSizeList as List } from "react-window";
import { useGetAllListingsQuery } from "../features/marketplace/marketplaceApi";
import { useCreateSellRequestMutation } from "../features/transaction/transactionApi";
import { useSelector } from "react-redux";

const ROW_HEIGHT = 72;

function SellerLanding() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [shopFilter, setShopFilter] = useState("");
  const [debouncedShopFilter, setDebouncedShopFilter] = useState("");
  const [scrapFilter, setScrapFilter] = useState("");
  const [firstnameFilter, setFirstnameFilter] = useState("");
  const [debouncedFirstnameFilter, setDebouncedFirstnameFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [debouncedCityFilter, setDebouncedCityFilter] = useState("");
  const [pinFilter, setPinFilter] = useState("");
  const [debouncedPinFilter, setDebouncedPinFilter] = useState("");
  const auth = useSelector((state) => state.auth);
  const currentUserId = useSelector((state) => state.auth?.user?.id);

  const [openSellDialog, setOpenSellDialog] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [quantity, setQuantity] = useState("");

  const [createSellRequest, { isLoading: isSelling }] =
    useCreateSellRequestMutation();

  const { data, isFetching } = useGetAllListingsQuery({
    page,
    limit: 10,
    shopname: debouncedShopFilter,
    scrapType: scrapFilter,
    firstname: debouncedFirstnameFilter,
    city: debouncedCityFilter,
    pincode: debouncedPinFilter,
  });

  const listings = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const scrapTypes = [...new Set(listings.map((i) => i.scrapType))];
  // const firstnames = [
  //   ...new Set(listings.map((i) => i.buyer.firstname)),
  // ];

  const handleSellClick = (listing) => {
    setSelectedListing(listing);
    setOpenSellDialog(true);
  };

  const handleSubmitSell = async () => {
    if (!quantity || quantity < 1) return;

    try {
      await createSellRequest({
        scrapType: selectedListing.scrapType,
        quantity: Number(quantity),
        buyerId: selectedListing.buyerId,
      }).unwrap();

      console.log("Selected Listing:", selectedListing);
      console.log("Payload:", {
        scrapType: selectedListing?.scrapType,
        quantity: Number(quantity),
        buyerId: selectedListing?.buyer?._id,
      });
      alert("Sell Request Sent Successfully");

      setOpenSellDialog(false);
      setQuantity("");
    } catch (err) {
      alert(err?.data?.message || "Failed to create sell request");
    }
  };

  const handleScroll = useCallback(
    ({ scrollDirection, scrollOffset }) => {
      if (isFetching) return;
      if (scrollDirection !== "forward") return;

      const totalHeight = listings.length * ROW_HEIGHT;
      const visibleHeight = 600;

      if (scrollOffset + visibleHeight >= totalHeight - ROW_HEIGHT) {
        if (page < totalPages) {
          setPage((prev) => prev + 1);
        }
      }
    },
    [listings.length, isFetching, page, totalPages],
  );

  // Debounce shop filter
  useEffect(() => {
    const timer = setTimeout(() => {
      if (shopFilter.length >= 3 || shopFilter.length === 0) {
        setDebouncedShopFilter(shopFilter);
        // setPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [shopFilter]);

  // Debounce firstname filter
  useEffect(() => {
    const timer = setTimeout(() => {
      if (firstnameFilter.length >= 3 || firstnameFilter.length === 0) {
        setDebouncedFirstnameFilter(firstnameFilter);
        // setPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [firstnameFilter]);

  // Debounce city filter
  useEffect(() => {
    const timer = setTimeout(() => {
      if (cityFilter.length >= 3 || cityFilter.length === 0) {
        setDebouncedCityFilter(cityFilter);
        // setPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [cityFilter]);

  // Debounce pincode filter
  useEffect(() => {
    const timer = setTimeout(() => {
      if (pinFilter.length >= 3 || pinFilter.length === 0) {
        setDebouncedPinFilter(pinFilter);
        // setPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [pinFilter]);

  const EllipsisCell = ({ flex, children, tooltip }) => (
    <Box
      sx={{
        flex,
        px: 2,
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        overflow: "hidden",
      }}
    >
      <Tooltip title={tooltip || children || ""} arrow>
        <Typography
          noWrap
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "100%",
          }}
        >
          {children}
        </Typography>
      </Tooltip>
    </Box>
  );

  const Row = ({ index, style }) => {
    const item = listings[index];
    if (!item) return null;

    return (
      <Box
        style={style}
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #eee",
          backgroundColor: index % 2 === 0 ? "#fff" : "#fafafa",
        }}
      >
        {/* Shop Name */}
        <Box
          sx={{
            flex: 1.8,
            px: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
            minWidth: 0,
          }}
          onClick={() =>
            setSelectedImage(`http://localhost:3000/${item.buyer.shopImage}`)
          }
        >
          <Avatar
            src={`http://localhost:3000/${item.buyer.shopImage}`}
            sx={{ width: 42, height: 42 }}
          />
          <Typography noWrap sx={{ minWidth: 0 }}>
            {item.buyer.shopname}
          </Typography>
        </Box>

        <EllipsisCell flex={1.1}>{item.scrapType}</EllipsisCell>
        <EllipsisCell flex={1}>₹ {item.ratePerKg}</EllipsisCell>
        <EllipsisCell flex={1.2}>{item.buyer.firstname}</EllipsisCell>

        <EllipsisCell
          flex={1.6}
          tooltip={`${item.buyer.address?.street}, ${item.buyer.address?.city}`}
        >
          {item.buyer.address?.street}, {item.buyer.address?.city}
        </EllipsisCell>

        <EllipsisCell
          flex={1.4}
          tooltip={`${item.buyer.address?.state}, ${item.buyer.address?.pincode}`}
        >
          {item.buyer.address?.state}, {item.buyer.address?.pincode}
        </EllipsisCell>

        <EllipsisCell flex={1}>{item.buyer.mobile}</EllipsisCell>

        <Box
          sx={{
            flex: 0.9,
            px: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#b15d5d",
              "&:hover": { backgroundColor: "#8c4b4b" },
            }}
            onClick={() => handleSellClick(item)}
            disabled={item.buyer._id === currentUserId}
          >
            Sell
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ py: 6, px: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Available Buyers
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 3, display: "flex", gap: 3 }}>
        <TextField
          label="Shop Name"
          size="small"
          value={shopFilter}
          helperText={
            shopFilter.length > 0 && shopFilter.length < 3
              ? "Enter at least 3 characters"
              : ""
          }
          onChange={(e) => setShopFilter(e.target.value)}
          sx={{ width: 250 }}
        />

        <TextField
          select
          label="Scrap Type"
          size="small"
          value={scrapFilter}
          onChange={(e) => {
            setScrapFilter(e.target.value);
            setPage(1);
          }}
          sx={{ width: 220 }}
        >
          <MenuItem value="">All</MenuItem>
          {scrapTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Buyer Name"
          size="small"
          value={firstnameFilter}
          helperText={
            firstnameFilter.length > 0 && firstnameFilter.length < 3
              ? "Enter at least 3 characters"
              : ""
          }
          onChange={(e) => setFirstnameFilter(e.target.value)}
          sx={{ width: 250 }}
        />

        <TextField
          label="City Name"
          size="small"
          value={cityFilter}
          helperText={
            cityFilter.length > 0 && cityFilter.length < 3
              ? "Enter at least 3 characters"
              : ""
          }
          onChange={(e) => setCityFilter(e.target.value)}
          sx={{ width: 250 }}
        />

        <TextField
          label="Pincode"
          size="small"
          value={pinFilter}
          helperText={
            pinFilter.length > 0 && pinFilter.length < 3
              ? "Enter at least 3 characters"
              : ""
          }
          onChange={(e) => setPinFilter(e.target.value)}
          sx={{ width: 250 }}
        />
      </Box>

      <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            backgroundColor: "#f5f5f5",
            fontWeight: 600,
            borderBottom: "2px solid #ddd",
          }}
        >
          {[
            { label: "Shop Name", flex: 1.8 },
            { label: "Scrap Type", flex: 1.1 },
            { label: "Rate (₹/kg)", flex: 1 },
            { label: "Buyer", flex: 1.2 },
            { label: "Street & City", flex: 1.6 },
            { label: "State & Pincode", flex: 1.4 },
            { label: "Mobile", flex: 1 },
            { label: "Action", flex: 0.9 },
          ].map((col) => (
            <Box
              key={col.label}
              sx={{
                flex: col.flex,
                px: 2,
                py: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              {col.label}
            </Box>
          ))}
        </Box>

        {/* LIST */}
        <List
          height={600}
          itemCount={listings.length}
          itemSize={ROW_HEIGHT}
          width="100%"
          onScroll={handleScroll}
        >
          {Row}
        </List>

        {isFetching && (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Paper>

      <Dialog
        open={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        maxWidth="md"
      >
        <DialogContent sx={{ p: 0 }}>
          <Box
            component="img"
            src={selectedImage}
            sx={{ width: "100%", height: "auto" }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={openSellDialog}
        onClose={() => setOpenSellDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h6" mb={2}>
            Sell {selectedListing?.scrapType}
          </Typography>

          <TextField
            label="Quantity (kg)"
            fullWidth
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            fullWidth
            disabled={isSelling}
            onClick={handleSubmitSell}
            sx={{
              backgroundColor: "#b15d5d",
              "&:hover": { backgroundColor: "#8c4b4b" },
            }}
          >
            {isSelling ? "Sending..." : "Confirm Sell"}
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default SellerLanding;
