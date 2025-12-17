import React, { useState } from "react";
import { api, endpoints } from "../services/api.js";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Fade,
} from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function LiveForecast() {
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleLiveUpdate = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await api.post(endpoints.live(productId));
      setResult(res.data);
    } catch (err) {
      alert("Error triggering live forecast. Ensure product history exists.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4, minHeight: "100vh", bgcolor: "#f3e5f5" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Live Model Retraining
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        Note: Future updates will allow uploading CSVs for new products directly here. 
        Currently, this triggers a re-train on existing database history.
      </Alert>

      <Paper sx={{ p: 4, maxWidth: 800, mx: "auto", textAlign: "center" }}>
        <AutoFixHighIcon sx={{ fontSize: 60, color: "secondary.main", mb: 2 }} />
        
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 4 }}>
          <TextField
            label="Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            disabled={loading}
          />
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleLiveUpdate}
            disabled={loading || !productId}
            startIcon={loading && <CircularProgress size={20} color="inherit" />}
          >
            {loading ? "Retraining Model..." : "Generate Live Forecast"}
          </Button>
        </Box>

        {/* Results Section */}
        <Fade in={!!result}>
          <Box sx={{ mt: 4, textAlign: 'left' }}>
            {result && (
              <>
                <Alert severity="success" sx={{ mb: 2 }}>
                  {result.message}
                </Alert>
                
                <Typography variant="h6" gutterBottom>
                  New Forecast Preview (Next 2 Years)
                </Typography>
                <Box sx={{ height: 200, width: '100%', bgcolor: '#fafafa', p: 1, borderRadius: 2 }}>
                  <ResponsiveContainer>
                    <LineChart data={result.forecast}>
                       <XAxis dataKey="date" hide />
                       <Tooltip />
                       <Line type="monotone" dataKey="sales" stroke="#9c27b0" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </>
            )}
          </Box>
        </Fade>
      </Paper>
    </Box>
  );
}