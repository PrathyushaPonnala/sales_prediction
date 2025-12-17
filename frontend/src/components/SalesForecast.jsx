import React, { useState } from "react";
import { api, endpoints } from "../services/api.js";
import { aggregateData } from "../utils/dataHelpers.js";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export default function SalesForecast() {
  const [productId, setProductId] = useState("P12");
  const [rawData, setRawData] = useState([]);
  const [view, setView] = useState("weekly"); // weekly, monthly, yearly

  const fetchData = async () => {
    try {
      const res = await api.get(endpoints.forecast(productId));
      const formatted = res.data.map((item) => ({
        date: item.forecast_date.split("T")[0],
        sales: item.predicted_sales,
      }));
      setRawData(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  const chartData = aggregateData(rawData, view);

  return (
    <Box sx={{ p: 4, minHeight: "100vh", bgcolor: "#fff3e0" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Future Demand Forecast
        </Typography>
      </Stack>

      <Paper sx={{ p: 2, mb: 3, display: "flex", justifyContent: "space-between" }}>
        <Stack direction="row" gap={2}>
          <TextField
            label="Product ID"
            size="small"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
          <Button variant="contained" onClick={fetchData} color="warning">
            Generate Forecast
          </Button>
        </Stack>

        {rawData.length > 0 && (
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(e, newView) => newView && setView(newView)}
            size="small"
          >
            <ToggleButton value="weekly">Weekly Detail</ToggleButton>
            <ToggleButton value="monthly">Monthly View</ToggleButton>
            <ToggleButton value="yearly">Yearly View</ToggleButton>
          </ToggleButtonGroup>
        )}
      </Paper>

      {rawData.length > 0 && (
        <Paper sx={{ p: 3, height: 500 }}>
          <Typography variant="h6" gutterBottom>
            Projected Sales ({view})
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value.toFixed(0)} units`, "Predicted Sales"]}
                contentStyle={{ borderRadius: '10px' }}
              />
              <Legend />
              <Bar dataKey="sales" fill="#ff9800" name="Predicted Sales" radius={[4, 4, 0, 0]} />
              {/* Add an average line to help business owners see the baseline */}
              <ReferenceLine y={chartData.reduce((a, b) => a + b.sales, 0) / chartData.length} label="Avg" stroke="red" strokeDasharray="3 3" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      )}
    </Box>
  );
}