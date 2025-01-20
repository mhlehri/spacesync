import ProtectedRoute from "@/components/layout/ProtectedRoute";
import About from "@/pages/About";
import Booking from "@/pages/Booking";
import BookingManagement from "@/pages/BookingManagement";
import ConfirmationPage from "@/pages/Confirmatin";
import Contact from "@/pages/Contact";
import Error from "@/pages/Error";
import Login from "@/pages/Login";
import MeetingRooms from "@/pages/MeetingsRooms";
import MyBookings from "@/pages/MyBookings";
import RoomDetails from "@/pages/RoomDetails";
import RoomManagement from "@/pages/RoomManagement";
import SignUp from "@/pages/SignUp";
import SlotManagement from "@/pages/SlotManagement";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout";
import Home from "../pages/Home";
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout";
import Dashboard from "@/pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "meeting-rooms",
        element: <MeetingRooms />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "my-bookings",
        element: (
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        ),
      },
      {
        path: "booking/:roomId",
        element: (
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        ),
      },
      {
        path: "booking/:roomId/confirmation",
        element: (
          <ProtectedRoute>
            <ConfirmationPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <AdminDashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "room-management",
            element: <RoomManagement />,
          },
          {
            path: "booking-management",
            element: <BookingManagement />,
          },
          {
            path: "slot-management",
            element: <SlotManagement />,
          },
        ],
      },
      {
        path: "/meeting-rooms/:id",
        element: (
          <ProtectedRoute>
            <RoomDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
