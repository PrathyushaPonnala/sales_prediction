import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import SalesHistory from "./components/SalesHistory.jsx";
import SalesForecast from "./components/SalesForecast.jsx";
import LiveForecast from "./components/LiveForecast.jsx";
import ModelMetrics from "./components/ModelMetrics.jsx";

import BusinessDashboard from "./components/BusinessDashboard.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/history" element={<SalesHistory />} />
          <Route path="/forecast" element={<SalesForecast />} />
          <Route path="/live" element={<LiveForecast />} />
          <Route path="/metrics" element={<ModelMetrics />} />
        <Route path="/dashboard" element={<BusinessDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
