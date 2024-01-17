import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import FoodPage from "./pages/Food/FoodPage";
import CartPage from "./pages/Cart/CartPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import PaymentPage from "./pages/Payment/PaymentPage";
import OrderTrackPage from "./pages/OrderTrackPage/OrderTrackPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import OrdersPage from "./pages/Orders/OrdersPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/search/:searchTerm" element={<HomePage />}></Route>
      <Route path="/tag/:tag" element={<HomePage />}></Route>
      <Route path="/food/:id" element={<FoodPage />}></Route>
      <Route path="/cart" element={<CartPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route
        path="/checkout"
        element={
          <AuthRoute>
            <CheckoutPage />
          </AuthRoute>
        }
      ></Route>
      <Route
        path="/payment"
        element={
          <AuthRoute>
            <PaymentPage />
          </AuthRoute>
        }
      ></Route>
      <Route
        path="/track/:orderId"
        element={
          <AuthRoute>
            <OrderTrackPage />
          </AuthRoute>
        }
      ></Route>
      <Route
        path="/profile"
        element={
          <AuthRoute>
            <ProfilePage />
          </AuthRoute>
        }
      ></Route>
       <Route
        path="/orders/:filter?" // making it optional with '?' .
        element={
          <AuthRoute>
            <OrdersPage />
          </AuthRoute>
        }
      ></Route>
    </Routes>
  );
}
