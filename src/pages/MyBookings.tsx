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
import { useGetAllMyBookingsQuery } from "@/redux/features/bookings/bookingsApi";
import { selectCurrentUser } from "@/redux/store";
import { TBooking } from "@/types/booking";
import { Calendar, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function MyBookings() {
  const user = selectCurrentUser();
  const { data, isLoading } = useGetAllMyBookingsQuery(user?._id as string);
  // console.log("my bookings data =>", data);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-0 py-12 flex items-center justify-center h-[70vh]">
      {data && !isLoading && data?.data.length > 0 ? (
        <div>
          <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
          <Table>
            <TableCaption>A list of your recent bookings</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Room Name</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((booking: TBooking) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking.room.name}</TableCell>
                  <TableCell>{booking.date.toLocaleString()}</TableCell>
                  <TableCell>{booking.isConfirmed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-gray-500 my-4 text-2xl text-center">
          <X className="mx-auto size-40" />
          <h6> No bookings yet</h6>
          <Button className="mt-4" variant="outline" asChild>
            <Link to="/meeting-rooms" className="text-indigo-600">
              <Calendar className="mx-auto size-4" /> Book a room
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
