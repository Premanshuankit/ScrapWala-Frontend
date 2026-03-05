import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";
import {
  useGetIncomingRequestsQuery,
  useCreateOrderMutation,
  useRejectSellRequestMutation,
} from "../features/transaction/transactionApi";

function BuyerIncoming() {
  const { data = [], isLoading, isFetching } =
    useGetIncomingRequestsQuery();

  const [createOrder, { isLoading: isAccepting }] =
    useCreateOrderMutation();

  const [rejectRequest, { isLoading: isRejecting }] =
    useRejectSellRequestMutation();

  const handleAccept = async (id) => {
    try {
      await createOrder(id).unwrap();
      alert("Order Created Successfully");
    } catch (err) {
      alert(err?.data?.message || "Failed to accept request");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectRequest(id).unwrap();
      alert("Request Rejected");
    } catch (err) {
      alert(err?.data?.message || "Failed to reject request");
    }
  };

  if (isLoading) {
    return (
      <Box p={4} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 6, px: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Incoming Sell Requests
      </Typography>

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
            { label: "Seller Name", flex: 1.5 },
            { label: "Scrap Type", flex: 1 },
            { label: "Quantity (kg)", flex: 1 },
            { label: "Rate (₹/kg)", flex: 1 },
            { label: "Total Amount", flex: 1.2 },
            { label: "Status", flex: 1 },
            { label: "Action", flex: 1.2 },
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

        {/* ROWS */}
        {data.length === 0 && (
          <Box sx={{ p: 3 }}>
            <Typography>No incoming requests</Typography>
          </Box>
        )}

        {data.map((req, index) => (
          <Box
            key={req._id}
            sx={{
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #eee",
              backgroundColor: index % 2 === 0 ? "#fff" : "#fafafa",
              "&:hover": { backgroundColor: "#f9f9f9" },
              py: 2,
            }}
          >
            {/* Seller Name */}
            <Box sx={{ flex: 1.5, px: 2 }}>
              {req.seller?.firstname}
            </Box>

            {/* Scrap Type */}
            <Box sx={{ flex: 1, px: 2 }}>
              {req.scrapType}
            </Box>

            {/* Quantity */}
            <Box sx={{ flex: 1, px: 2 }}>
              {req.quantity}
            </Box>

            {/* Price */}
            <Box sx={{ flex: 1, px: 2 }}>
              ₹ {req.ratePerKg || "-"}
            </Box>

            {/* Total Amount */}
            <Box sx={{ flex: 1.2, px: 2 }}>
              ₹ {(req.quantity * (req.ratePerKg || 0)).toFixed(2)}
            </Box>

            {/* Status */}
            <Box sx={{ flex: 1, px: 2 }}>
              <Chip
                label={req.status}
                color={
                  req.status === "OPEN"
                    ? "warning"
                    : req.status === "ACCEPTED"
                    ? "success"
                    : "default"
                }
              />
            </Box>

            {/* Actions */}
            <Box sx={{ flex: 1.2, px: 2 }}>
              {req.status === "OPEN" ? (
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    size="small"
                    disabled={isAccepting}
                    onClick={() => handleAccept(req._id)}
                    sx={{
                      backgroundColor: "#b15d5dff",
                      "&:hover": { backgroundColor: "#923434ff" },
                    }}
                  >
                    Accept
                  </Button>

                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    disabled={isRejecting}
                    onClick={() => handleReject(req._id)}
                  >
                    Reject
                  </Button>
                </Box>
              ) : (
                <Typography>-</Typography>
              )}
            </Box>
          </Box>
        ))}

        {isFetching && (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default BuyerIncoming;