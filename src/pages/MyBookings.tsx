import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllRoomsQuery } from "@/redux/features/rooms/rooms";
import { useGetAllMyBookingsQuery } from "@/redux/features/bookings/bookings";
import { selectCurrentUser } from "@/redux/store";

// This would typically come from an API or database
const initialBookings = [
  {
    id: 1,
    roomName: "Executive Suite",
    date: new Date("2023-07-15T09:00:00"),
    status: "Confirmed",
  },
  {
    id: 2,
    roomName: "Brainstorm Hub",
    date: new Date("2023-07-20T14:00:00"),
    status: "Unconfirmed",
  },
  // ... more bookings
];

export default function MyBookings() {
  const user = selectCurrentUser();
  const { data, isError } = useGetAllMyBookingsQuery(user?._id as string);
  console.log("my bookings data =>", data);
  const [bookings, setBookings] = useState(initialBookings);

  const handleCancelBooking = (bookingId: number) => {
    // Here you would typically send a request to your backend to cancel the booking
    setBookings(bookings.filter((booking) => booking.id !== bookingId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      <Table>
        <TableCaption>A list of your recent bookings</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Room Name</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((booking) => (
            <TableRow key={booking._id}>
              <TableCell>{booking.room.name}</TableCell>
              <TableCell>{booking.date.toLocaleString()}</TableCell>
              <TableCell>{booking.isConfirmed}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleCancelBooking(booking.id)}
                >
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
