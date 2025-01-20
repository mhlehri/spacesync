import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  useDeleteBookingByIdMutation,
  useGetAllBookingsQuery,
} from "@/redux/features/bookings/bookingsApi";
import { TBooking } from "@/types/booking";
import { toast } from "sonner";

export default function BookingManagement() {
  //? Use the useGetAllBookingsQuery hook to fetch all bookings
  const { data: bookingsData, isLoading: areBookingsLoading } =
    useGetAllBookingsQuery("");

  const bookings = bookingsData?.data || [];

  //? Use the useDeleteBookingByIdMutation hook to delete a booking
  const [deleteBooking] = useDeleteBookingByIdMutation();

  return (
    <div className="py-12">
      <h2 className="text-2xl font-semibold mb-4">Booking Management</h2>
      <Table>
        <TableCaption>A list of all bookings</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Room Name</TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {areBookingsLoading
            ? "loading..."
            : bookings
            ? bookings.map((booking: TBooking) => (
                <TableRow key={booking?._id}>
                  <TableCell>{booking?.room?.name}</TableCell>
                  <TableCell>{booking?.user?.name}</TableCell>
                  <TableCell>{booking?.date}</TableCell>
                  <TableCell>{booking?.slots[0]?.startTime}</TableCell>
                  <TableCell>{booking?.isConfirmed}</TableCell>
                  <TableCell>
                    <Button
                      disabled={booking.isConfirmed === "confirmed"}
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => {
                        // Handle approve action
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      disabled={booking.isConfirmed === "confirmed"}
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        // Handle reject action
                      }}
                    >
                      Reject
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="ml-2"
                        >
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Are you sure to delete the booking?
                          </DialogTitle>
                          <DialogDescription>
                            This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose>
                            <Button
                              variant="destructive"
                              onClick={async () => {
                                const res = await deleteBooking(booking._id);
                                if (res.data) {
                                  toast.success(
                                    "Booking deleted successfully",
                                    {
                                      richColors: true,
                                      position: "top-right",
                                    }
                                  );
                                }
                                if (res.error) {
                                  toast.error("Failed to delete", {
                                    richColors: true,
                                    position: "top-right",
                                  });
                                }
                              }}
                            >
                              Delete
                            </Button>
                          </DialogClose>
                          <DialogClose>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            : "No bookings found"}
        </TableBody>
      </Table>
    </div>
  );
}
