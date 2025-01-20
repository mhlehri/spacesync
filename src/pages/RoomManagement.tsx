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
  useDeleteRoomByIdMutation,
  useGetAllRoomsQuery,
} from "@/redux/features/rooms/roomsApi";
import { TRoom } from "@/types/room";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function RoomManagement() {
  //? Use the useGetAllRoomsQuery hook to fetch all rooms
  const { data: roomsData, isLoading } = useGetAllRoomsQuery("");

  const rooms = roomsData?.data || [];

  //? Use the useDeleteRoomByIdMutation hook to delete a room
  const [deleteRoom] = useDeleteRoomByIdMutation();

  console.log(rooms);

  return (
    <div className="py-12">
      <h2 className="text-2xl font-semibold mb-4">Room Management</h2>

      <DButton className="mb-4" asChild>
        <Link to={`add-room`}>Add New Room</Link>
      </DButton>

      <div className="h-96 overflow-y-scroll">
        <Table className="overflow-x-auto">
          <TableCaption>A list of all rooms</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Room No.</TableHead>
              <TableHead>Floor No.</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Price Per Slot</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? "loading..."
              : rooms
              ? rooms?.map((room: TRoom) => (
                  <TableRow key={room._id}>
                    <TableCell>{room.name}</TableCell>
                    <TableCell>{room.roomNo}</TableCell>
                    <TableCell>{room.floorNo}</TableCell>
                    <TableCell>{room.capacity}</TableCell>
                    <TableCell>${room.pricePerSlot}</TableCell>
                    <TableCell className="flex gap-2 flex-wrap">
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
                              Are you sure to delete the room?
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
                                  const res = await deleteRoom(room._id);

                                  if (res.data) {
                                    toast.success("Room deleted successfully", {
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
              : "No rooms found"}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
