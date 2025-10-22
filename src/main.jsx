import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./page/Home/Dasdboard.jsx";
import CartPage from "./page/Cart/Cart.jsx";
import DetailProduct from "./page/DetailProduct/DetailProduct.jsx";
import CasualPage from "./page/Filter/Filter.jsx";
import CheckoutPage from "./page/Checkout/Checkout.jsx";
import OrdersPage from "./page/Order/Order.jsx";
import OrderDetailsPage from "./page/Order/Details/Details.jsx";
import OrderSuccessPage from "./page/Checkout/success/Success.jsx";
import PendingPaymentPage from "./page/Checkout/pending/Pending.jsx";
import ReactDOM from "react-dom/client";
import React from "react";
import CartProvider from "./context/CartProvider.jsx";
import LoginPage from "./layouts/login/Login.jsx";
import RegisterPage from "./layouts/register/Register.jsx";
import ResetPasswordPage from "./layouts/reset-password/Reset-password.jsx";
import ForgotPasswordPage from "./layouts/reset-password/ForgotPassword.jsx";
import ChangePasswordPage from "./layouts/change-password/ChangePassword.jsx";
import EmailConfirmationPage from "./layouts/register/EmailConfirmation.jsx";
import ProfilePage from "./page/Profile/Profile.jsx";
import FindOrder from "./page/FindOrder/Find.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/Cart",
        element: <CartPage />,
      },
      {
        path: "/FilterProduct",
        element: <CasualPage />,
      },
      {
        path: "/Checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/Orders",
        element: <OrdersPage />,
      },
      {
        path: "/Detail-Orders",
        element: <OrderDetailsPage />,
      },
      {
        path: "/Detail-Orders/:id",
        element: <OrderDetailsPage />,
      },
      {
        path: "/Success-Checkout",
        element: <OrderSuccessPage />,
      },
      {
        path: "/Pending-Checkout",
        element: <PendingPaymentPage />,
      },
      {
        path: "/DetailProduct/:id",
        element: <DetailProduct />,
      },
      {
        path: "/Login",
        element: <LoginPage />,
      },
      {
        path: "/Register",
        element: <RegisterPage />,
      },
      {
        path: "/Reset-Password",
        element: <ResetPasswordPage />,
      },
      {
        path: "/Forgot-Password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/Change-Password",
        element: <ChangePasswordPage />,
      },
      {
        path: "/Email-Confirmation",
        element: <EmailConfirmationPage />,
      },
      {
        path: "/Profile",
        element: <ProfilePage />,
      },
      {
        path: "/FindOrder",
        element: <FindOrder />,
      },
    ],
  },
 
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router}></RouterProvider>
    </CartProvider>
  </React.StrictMode>
);
