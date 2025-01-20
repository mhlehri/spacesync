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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { toast } from "sonner";

export default function SlotManagement() {
  //? Use the useGetAllSlotsQuery hook to fetch all slots
  const { data: slotsData, isLoading: areSlotsLoading } =
    useGetAllSlotsQuery("");

  const slots = slotsData?.data || [];

  //? Use the useDeleteSlotByIdMutation hook to delete a slot
  const [deleteSlot] = useDeleteSlotByIdMutation();
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Slots Management</h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Add New Slot</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Slot</DialogTitle>
          </DialogHeader>
          <form action="">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="roomName" className="text-right">
                  Room Name
                </Label>
                <Input required id="roomName" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="roomNo" className="text-right">
                  Room No.
                </Label>
                <Input required id="roomNo" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input required id="date" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startTime" className="text-right">
                  Start Time
                </Label>
                <Input
                  required
                  id="startTime"
                  type="time"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endTime" className="text-right">
                  End Time
                </Label>
                <Input
                  required
                  id="endTime"
                  type="time"
                  className="col-span-3"
                />
              </div>
            </div>
            <Button className="w-full">Add Slot</Button>
          </form>
        </DialogContent>
      </Dialog>
      <Table>
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
            ? slots.map((slot: TSlot) => (
                <TableRow key={slot._id}>
                  <TableCell>{slot.room.name}</TableCell>
                  <TableCell>{slot.room.roomNo}</TableCell>
                  <TableCell>{slot.date}</TableCell>
                  <TableCell>{slot.startTime}</TableCell>
                  <TableCell>{slot.endTime}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2">
                      Update
                    </Button>
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
  );
}
