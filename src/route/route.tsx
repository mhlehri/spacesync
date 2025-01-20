import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import About from "@/pages/About";
import AddRoom from "@/pages/AddRoom";
import Booking from "@/pages/Booking";
import BookingManagement from "@/pages/BookingManagement";
import ConfirmationPage from "@/pages/Confirmatin";
import Contact from "@/pages/Contact";
import CreateSlot from "@/pages/CreateSlot";
import Dashboard from "@/pages/Dashboard";
import Error from "@/pages/Error";
import Login from "@/pages/Login";
import MeetingRooms from "@/pages/MeetingsRooms";
import MyBookings from "@/pages/MyBookings";
import RoomDetails from "@/pages/RoomDetails";
import RoomManagement from "@/pages/RoomManagement";
import SignUp from "@/pages/SignUp";
import SlotManagement from "@/pages/SlotManagement";
import UpdateRoom from "@/pages/UpdateRoom";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout";
import Home from "../pages/Home";
import AdminRoute from "@/components/layout/AdminRoute";
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
        path: "/meeting-rooms/:id",
        element: (
          <ProtectedRoute>
            <RoomDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <AdminDashboardLayout />
      </AdminRoute>
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
        path: "room-management/create-room",
        element: <AddRoom />,
      },
      {
        path: "room-management/update-room/:id",
        element: <UpdateRoom />,
      },
      {
        path: "slot-management/create-slot",
        element: <CreateSlot />,
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
]);
