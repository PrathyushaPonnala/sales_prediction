import React, { useEffect, useState } from "react";
import { api, endpoints } from "../services/api.js";
import { Box, Typography, Grid, Paper, CircularProgress } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";

const MetricCard = ({ title, value, subtext, color }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      textAlign: "center",
      height: "100%",
      borderTop: `6px solid ${color}`,
    }}
  >
    <Typography color="text.secondary" variant="subtitle1">
      {title}
    </Typography>
    <Typography variant="h3" fontWeight="bold" sx={{ my: 2 }}>
      {value}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      {subtext}
    </Typography>
  </Paper>
);

export default function ModelMetrics() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    api.get(endpoints.metrics).then((res) => setMetrics(res.data));
    
  }, []);
  
  console.log(metrics);
  if (!metrics) return <Box p={4}><CircularProgress /></Box>;

  return (
    <Box sx={{ p: 4, minHeight: "100vh", bgcolor: "#e0f7fa" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Model Health & Performance
      </Typography>

      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={3}>
          <MetricCard
            title="Forecast Accuracy"
            value={`${(metrics.accuracy).toFixed(1)}%`}
            subtext="1 - Accuracy (Higher is better)"
            color="#00c853"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard
            title="Error Rate (WMAPE)"
            value={`${(metrics.wmape).toFixed(1)}%`}
            subtext="Weighted Mean Abs Percentage Error"
            color="#ff3d00"
          />
        </Grid>
        {/* <Grid item xs={12} md={3}>
          <MetricCard
            title="RMSE"
            value={metrics.rmse}
            subtext="Root Mean Squared Error"
            color="#2962ff"
          />
        </Grid> */}
        <Grid item xs={12} md={3}>
          <MetricCard
            title="Model Version"
            value={metrics.model_version}
            subtext={`Last Trained: ${new Date(metrics.last_trained).toLocaleDateString()}`}
            color="#6200ea"
          />
        </Grid>
      </Grid>
    </Box>
  );
}