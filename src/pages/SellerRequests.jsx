import {
  Box,
  Typography,
  Paper,
  Chip,
  CircularProgress,
} from "@mui/material";

import {
  useGetMySellRequestsQuery,
  useGetSellerOrdersQuery,
} from "../features/seller/sellerApi";

function SellerRequests() {
  const { data: requests = [], isLoading: loadingReq } =
    useGetMySellRequestsQuery();

  const { data: orders = [], isLoading: loadingOrders } =
    useGetSellerOrdersQuery();

  if (loadingReq || loadingOrders) {
    return (
      <Box textAlign="center" py={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 6, px: 3 }}>
      {/* SELL REQUESTS */}

      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        My Sell Requests
      </Typography>

      <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden", mb: 6 }}>
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
            { label: "Scrap Type", flex: 1.5 },
            { label: "Quantity", flex: 1 },
            { label: "Status", flex: 1 },
          ].map((col) => (
            <Box
              key={col.label}
              sx={{
                flex: col.flex,
                px: 2,
                py: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              {col.label}
            </Box>
          ))}
        </Box>

        {/* ROWS */}
        {requests.length === 0 && (
          <Box p={3}>
            <Typography>No sell requests</Typography>
          </Box>
        )}

        {requests.map((req, index) => (
          <Box
            key={req._id}
            sx={{
              display: "flex",
              borderBottom: "1px solid #eee",
              backgroundColor: index % 2 === 0 ? "#fff" : "#fafafa",
              py: 2,
              "&:hover": { backgroundColor: "#f9f9f9" },
            }}
          >
            <Box sx={{ flex: 1.5, px: 2 }}>{req.scrapType}</Box>

            <Box sx={{ flex: 1, px: 2 }}>{req.quantity}</Box>

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
          </Box>
        ))}
      </Paper>

      {/* ORDERS */}

      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        My All Orders
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
            { label: "Scrap Type", flex: 1.5 },
            { label: "Total Amount", flex: 1 },
            { label: "Status", flex: 1 },
          ].map((col) => (
            <Box
              key={col.label}
              sx={{
                flex: col.flex,
                px: 2,
                py: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              {col.label}
            </Box>
          ))}
        </Box>

        {/* ROWS */}
        {orders.length === 0 && (
          <Box p={3}>
            <Typography>No orders yet</Typography>
          </Box>
        )}

        {orders.map((order, index) => (
          <Box
            key={order._id}
            sx={{
              display: "flex",
              borderBottom: "1px solid #eee",
              backgroundColor: index % 2 === 0 ? "#fff" : "#fafafa",
              py: 2,
              "&:hover": { backgroundColor: "#f9f9f9" },
            }}
          >
            <Box sx={{ flex: 1.5, px: 2 }}>{order.scrapType}</Box>

            <Box sx={{ flex: 1, px: 2 }}>₹ {order.totalAmount}</Box>

            <Box sx={{ flex: 1, px: 2 }}>
              <Chip
                label={order.status}
                color={
                  order.status === "SCHEDULED"
                    ? "info"
                    : order.status === "COLLECTED"
                    ? "success"
                    : "default"
                }
              />
            </Box>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}

export default SellerRequests;