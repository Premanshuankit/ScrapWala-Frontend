import { Box, Typography, Paper } from "@mui/material";
import { useGetSellerOrdersQuery } from "../features/transaction/transactionApi";

function SellerOrders() {
  const { data = [] } = useGetSellerOrdersQuery();

  return (
    <Box p={4}>
      <Typography variant="h5" mb={3}>Orders Received</Typography>

      {data.map((order) => (
        <Paper key={order._id} sx={{ p: 2, mb: 2 }}>
          <Typography>Buyer: {order.buyerId?.firstname}</Typography>
          <Typography>Scrap: {order.scrapType}</Typography>
          <Typography>Qty: {order.quantity}</Typography>
          <Typography>Total: ₹{order.totalAmount}</Typography>
          <Typography>Status: {order.status}</Typography>
        </Paper>
      ))}
    </Box>
  );
}

export default SellerOrders;