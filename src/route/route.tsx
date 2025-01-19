import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Error from "@/pages/Error";
import MyBookings from "@/pages/MyBookings";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout";
import Home from "../pages/Home";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import AdminDashboard from "@/pages/Dashboard";
import RoomDetails from "@/pages/RoomDetails";
import MeetingRooms from "@/pages/MeetingsRooms";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

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
        path: "/meeting-rooms",
        element: <MeetingRooms />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/my-bookings",
        element: (
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/dashboard",
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ),
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
