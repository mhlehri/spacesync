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
  useUpdateBookingByIdMutation,
} from "@/redux/features/bookings/bookingsApi";
import { TBooking } from "@/types/booking";
import { toast } from "sonner";

export default function BookingManagement() {
  //? Use the useGetAllBookingsQuery hook to fetch all bookings
  const { data: bookingsData, isLoading: areBookingsLoading } =
    useGetAllBookingsQuery("");

  const bookings = bookingsData?.data || [];
  // console.log(bookings);
  //? Use the useDeleteBookingByIdMutation hook to delete a booking
  const [deleteBooking] = useDeleteBookingByIdMutation();

  const [updateBooking] = useUpdateBookingByIdMutation();

  return (
    <div className="py-12">
      <h2 className="text-2xl font-semibold mb-4">Booking Management</h2>
      <div className="h-96 overflow-y-scroll">
        <Table className="overflow-x-auto">
          <TableCaption>A list of all bookings</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>SN.</TableHead>
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
              ? bookings.map((booking: TBooking, index: number) => (
                  <TableRow key={booking?._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{booking?.room?.name}</TableCell>
                    <TableCell>{booking?.user?.name}</TableCell>
                    <TableCell>{booking?.date}</TableCell>
                    <TableCell>
                      {booking?.slots[0]?.startTime}-
                      {booking?.slots[0]?.endTime}
                    </TableCell>
                    <TableCell>{booking?.isConfirmed}</TableCell>
                    <TableCell className="flex gap-2 flex-wrap">
                      <Button
                        disabled={booking.isConfirmed === "confirmed"}
                        variant="outline"
                        size="sm"
                        className="mr-2"
                        onClick={async () => {
                          const res = await updateBooking({
                            id: booking._id,
                            data: { isConfirmed: "confirmed" },
                          });
                          if (res.data) {
                            toast.success("Booking approved successfully", {
                              richColors: true,
                              position: "top-right",
                            });
                          } else if (res.error) {
                            toast.error("Failed to approve", {
                              richColors: true,
                              position: "top-right",
                            });
                          }
                        }}
                      >
                        Approve
                      </Button>
                      <Button
                        disabled={booking.isConfirmed === "rejected"}
                        variant="destructive"
                        size="sm"
                        onClick={async () => {
                          // console.log(booking._id, "id");
                          const res = await updateBooking({
                            id: booking._id,
                            data: { isConfirmed: "rejected" },
                          });
                          if (res.data) {
                            toast.success("Booking rejected successfully", {
                              richColors: true,
                              position: "top-right",
                            });
                          } else if (res.error) {
                            toast.error("Failed to reject", {
                              richColors: true,
                              position: "top-right",
                            });
                          }
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
    </div>
  );
}
