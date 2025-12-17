import React, { useState } from "react";
import { api, endpoints } from "../services/api.js";
import { Box, Typography, Paper, TextField, Button, Grid, Chip } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function BusinessDashboard() {
  const [inputIds, setInputIds] = useState("P1, P12, P15");
  const [comparisonData, setComparisonData] = useState([]);

  // Fetches forecast for multiple products and aggregates total sales
  const generateComparison = async () => {
    const ids = inputIds.split(",").map((s) => s.trim());
    const results = [];

    for (const id of ids) {
      try {
        const res = await api.get(endpoints.forecast(id));
        const totalSales = res.data.reduce((sum, item) => sum + item.predicted_sales, 0);
        results.push({
          product: id,
          totalPotential: totalSales.toFixed(0),
        });
      } catch (e) {
        console.warn(`Could not fetch ${id}`);
      }
    }
    setComparisonData(results);
  };

  return (
    <Box sx={{ p: 4, minHeight: "100vh", bgcolor: "#eceff1" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Business Intelligence Dashboard
      </Typography>
      <Typography mb={3}>Compare total projected revenue across multiple products.</Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="subtitle2" gutterBottom>
          Enter Product IDs (comma separated)
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            value={inputIds}
            onChange={(e) => setInputIds(e.target.value)}
            placeholder="e.g. P12, P55, P102"
          />
          <Button variant="contained" size="large" onClick={generateComparison}>
            Compare
          </Button>
        </Box>
      </Paper>

      {comparisonData.length > 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, height: 400 }}>
              <Typography variant="h6" gutterBottom>Revenue Potential Comparison</Typography>
              <ResponsiveContainer>
                <BarChart data={comparisonData} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="product" type="category" />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="totalPotential" fill="#00bcd4" barSize={20} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: 400, overflow: 'auto' }}>
              <Typography variant="h6" gutterBottom>Leaderboard</Typography>
              {comparisonData
                .sort((a, b) => b.totalPotential - a.totalPotential)
                .map((item, index) => (
                  <Box key={item.product} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, p: 1, bgcolor: index === 0 ? '#e0f7fa' : 'white', borderRadius: 1 }}>
                    <Typography fontWeight="bold">#{index + 1} {item.product}</Typography>
                    <Chip label={`$${Number(item.totalPotential).toLocaleString()}`} size="small" color={index === 0 ? "primary" : "default"} />
                  </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}