import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllMyBookingsQuery } from "@/redux/features/bookings/bookings";
import { selectCurrentUser } from "@/redux/store";
import { TBooking } from "@/types/booking";

export default function MyBookings() {
  const user = selectCurrentUser();
  const { data } = useGetAllMyBookingsQuery(user?._id as string);
  console.log("my bookings data =>", data);

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
  );
}
