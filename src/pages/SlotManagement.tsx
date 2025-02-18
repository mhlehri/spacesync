import { DButton } from "@/components/AnimatedButton";
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
  useDeleteSlotByIdMutation,
  useGetAllSlotsQuery,
} from "@/redux/features/slots/slotsApi";

import { TSlot } from "@/types/slot";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function SlotManagement() {
  //? Use the useGetAllSlotsQuery hook to fetch all slots
  const { data: slotsData, isLoading: areSlotsLoading } =
    useGetAllSlotsQuery("");

  const slots = slotsData?.data || [];

  //? Use the useDeleteSlotByIdMutation hook to delete a slot
  const [deleteSlot] = useDeleteSlotByIdMutation();
  return (
    <div className="py-12">
      <h2 className="text-2xl font-semibold mb-4">Slots Management</h2>
      <DButton className="mb-4" asChild>
        <Link to={`create-slot`}>Create New Slot</Link>
      </DButton>
      <div className="h-96 overflow-y-scroll ">
        <Table className="overflow-x-scroll">
          <TableCaption>A list of all slots</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Room Name</TableHead>
              <TableHead>Room No.</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {areSlotsLoading
              ? "loading..."
              : slots
              ? slots.map((slot: TSlot, index: number) => (
                  <TableRow key={slot._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{slot.room.name}</TableCell>
                    <TableCell>{slot.room.roomNo}</TableCell>
                    <TableCell>{slot.date}</TableCell>
                    <TableCell>{slot.startTime}</TableCell>
                    <TableCell>{slot.endTime}</TableCell>
                    <TableCell className="flex gap-2 flex-wrap">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Are you sure to delete the slot?
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
                                  const res = await deleteSlot(slot._id);

                                  if (res.data) {
                                    toast.success("Slot deleted successfully", {
                                      richColors: true,
                                      position: "top-right",
                                    });
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
              : "No slots found"}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
