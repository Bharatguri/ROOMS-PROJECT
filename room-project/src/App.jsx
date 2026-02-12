import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./profile/Profile";
import City from "./pages/City";   
import SearchGym from "./pages/SearchGym";
import CreateTrainerProfile from "./AdminPannel/CreateTrainerProfile"; 
import TrainerProfile from "./pages/TrainerProfile"; 
import Diets from "./pages/Diets";
import SaleProduct from "./pages/Supplements";
import GymDetails from "./pages/GymDetails";
import TrainerBooking from "./pages/TrainerBooking";
import Membership from "./pages/Membership";
import VerifyOtp from "./auth/VerifyOtp";


import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./auth/ForgetPassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/CreateTrainerProfile" element={<CreateTrainerProfile />} />

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
          path="/gym/:id"
          element={
            <ProtectedRoute>
              <GymDetails />
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
          path="/Trainerprofile"
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
          path="/SaleProduct"
          element={
            <ProtectedRoute>
              <SaleProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/book-trainer/:name"
          element={
            <ProtectedRoute>
              <TrainerBooking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/membership"
          element={
            <ProtectedRoute>
              <Membership />
            </ProtectedRoute>
          }
        />

        <Route path="/forgot-password"
         element={<ForgotPassword />} />

        {/* ✅ FALLBACK ROUTE */}
        <Route path="*" element={<h1 className="p-6">404 Page Not Found</h1>} />
      </Routes>

      
    </BrowserRouter>
  );
}
