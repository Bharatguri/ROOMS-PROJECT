import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import Stays from "./pages/Stays";
import Tiffins from "./pages/Tiffins";
import OwnerProperties from "./pages/OwnerProperties";
import ProviderPlans from "./pages/ProviderPlans";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/stays"
          element={
            <ProtectedRoute>
              <Stays />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tiffins"
          element={
            <ProtectedRoute>
              <Tiffins />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/properties"
          element={
            <ProtectedRoute>
              <OwnerProperties />
            </ProtectedRoute>
          }
        />

        <Route
          path="/provider/plans"
          element={
            <ProtectedRoute>
              <ProviderPlans />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
