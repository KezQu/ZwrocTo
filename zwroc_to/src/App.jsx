import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { logEvent } from "firebase/analytics";
import { analytics } from "./firebase";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import RestorePassword from "./pages/restore_password/restore_password";
import Profile from "./pages/profile/profile";
import MapScreen from "./pages/map/map";
import Portfel from "./pages/portfel/portfel";
import Nagrody from "./pages/nagrody/nagrody";
import ScanCoupon from "./pages/scan_coupon/scan_coupon";
import MachinesList from "./pages/machines_list/machines_list";

function AnalyticsTracker() {
  const location = useLocation();
  useEffect(() => {
    logEvent(analytics, "page_view", { page_path: location.pathname });
  }, [location.pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <div className="app-layout">
        <div className="app-main">
          <Routes>
            <Route path="/" element={<Navigate to="/map" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/restore_password" element={<RestorePassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/map" element={<MapScreen />} />
            <Route path="/automaty" element={<MachinesList />} />
            <Route path="/portfel" element={<Portfel />} />
            <Route path="/nagrody" element={<Nagrody />} />
            <Route path="/skanuj-kupon" element={<ScanCoupon />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
