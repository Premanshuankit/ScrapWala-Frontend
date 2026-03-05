import { Box, Typography, Paper } from "@mui/material";
import { useGetBuyerOrdersQuery } from "../features/transaction/transactionApi";

function BuyerOrders() {
  const { data = [] } = useGetBuyerOrdersQuery();

  return (
    <Box p={4}>
      <Typography variant="h5" mb={3}>My Orders</Typography>

      {data.map((order) => (
        <Paper key={order._id} sx={{ p: 2, mb: 2 }}>
          <Typography>Scrap: {order.scrapType}</Typography>
          <Typography>Qty: {order.quantity}</Typography>
          <Typography>Total: ₹{order.totalAmount}</Typography>
          <Typography>Status: {order.status}</Typography>
        </Paper>
      ))}
    </Box>
  );
}

export default BuyerOrders;