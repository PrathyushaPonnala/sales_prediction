import React, { useState } from "react";
import { api, endpoints } from "../services/api";
import { getTotalRevenue, calculateGrowth } from "../utils/dataHelpers";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function SalesHistory() {
  const [productId, setProductId] = useState("P12");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get(endpoints.history(productId));
      // Map API response to Recharts format
      const formatted = res.data.map((item) => ({
        date: item.ds.split("T")[0], // Clean date
        sales: item.y,
      }));
      setData(formatted);
    } catch (err) {
      console.error("Failed to fetch history", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4, minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Historical Performance
      </Typography>

      {/* Controls */}
      <Paper sx={{ p: 2, mb: 3, display: "flex", gap: 2 }}>
        <TextField
          label="Product ID"
          size="small"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <Button variant="contained" onClick={fetchData} disabled={loading}>
          {loading ? "Loading..." : "Analyze Product"}
        </Button>
      </Paper>

      {data.length > 0 && (
        <>
          {/* KPI Cards */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ bgcolor: "#e3f2fd" }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <AttachMoneyIcon color="primary" />
                    <Typography variant="h6">Total Sales (1 Year)</Typography>
                  </Stack>
                  <Typography variant="h3" fontWeight="bold">
                    {Number(getTotalRevenue(data)).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ bgcolor: "#e8f5e9" }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <TrendingUpIcon color="success" />
                    <Typography variant="h6">YoY Growth Trend</Typography>
                  </Stack>
                  <Typography variant="h3" fontWeight="bold" color="success.main">
                    {calculateGrowth(data)}%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Chart */}
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Weekly Sales Volume
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </>
      )}
    </Box>
  );
}