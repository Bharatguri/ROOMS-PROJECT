import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboard
import Dashboard from "./pages/Dashboard";

// GymNest Pages (Sidebar Links)
import Profile from "./pages/Profile";
import City from "./pages/City";
import SearchGym from "./pages/SearchGym";
import TrainerProfile from "./pages/TrainerProfile";import Diets from "./pages/Diets";
import Supplements from "./pages/Supplements";

// Protected Route Component
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
  
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

    
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/city"
          element={
            <ProtectedRoute>
              <City />
            </ProtectedRoute>
          }
        />

        <Route
          path="/searchgym"
          element={
            <ProtectedRoute>
              <SearchGym />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trainer-profile"
          element={
            <ProtectedRoute>
              <TrainerProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/diets"
          element={
            <ProtectedRoute>
              <Diets />
            </ProtectedRoute>
          }
        />

        <Route
          path="/supplements"
          element={
            <ProtectedRoute>
              <Supplements />
            </ProtectedRoute>
          }
        />

        {/* ✅ FALLBACK ROUTE */}
        <Route path="*" element={<h1 className="p-6">404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
