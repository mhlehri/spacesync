import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllBookingsQuery } from "@/redux/features/bookings/bookings";
import { useGetAllRoomsQuery } from "@/redux/features/rooms/rooms";
import { useGetAllSlotsQuery } from "@/redux/features/slots/slotsApi";
import { TBooking } from "@/types/booking";
import { TRoom } from "@/types/room";
import { TSlot } from "@/types/slot";
import { useState } from "react";

// const slots = [
//   {
//     id: 1,
//     roomName: "Executive Suite",
//     roomNo: "A101",
//     date: "2023-07-15",
//     startTime: "09:00",
//     endTime: "10:00",
//   },
//   {
//     id: 2,
//     roomName: "Brainstorm Hub",
//     roomNo: "B201",
//     date: "2023-07-15",
//     startTime: "14:00",
//     endTime: "15:00",
//   },
// ];

// const bookings = [
//   {
//     id: 1,
//     roomName: "Executive Suite",
//     userName: "John Doe",
//     date: "2023-07-15",
//     time: "09:00-10:00",
//     status: "Confirmed",
//   },
//   {
//     id: 2,
//     roomName: "Brainstorm Hub",
//     userName: "Jane Smith",
//     date: "2023-07-15",
//     time: "14:00-15:00",
//     status: "Unconfirmed",
//   },
// ];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("rooms");
  const { data: roomsData, isLoading } = useGetAllRoomsQuery("");
  const { data: slotsData, isLoading: slotsIsloading } =
    useGetAllSlotsQuery("");
  const { data: bookingsData, isLoading: bookingsIsloading } =
    useGetAllBookingsQuery("");
  const rooms = roomsData?.data || [];
  const slots = slotsData?.data || [];
  const bookings = bookingsData?.data || [];
  console.log(bookings);
  const renderContent = () => {
    switch (activeTab) {
      case "rooms":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Room Management</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mb-4">Add New Room</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Room</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="roomNo" className="text-right">
                      Room No.
                    </Label>
                    <Input id="roomNo" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="floorNo" className="text-right">
                      Floor No.
                    </Label>
                    <Input id="floorNo" type="number" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="capacity" className="text-right">
                      Capacity
                    </Label>
                    <Input id="capacity" type="number" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="pricePerSlot" className="text-right">
                      Price Per Slot
                    </Label>
                    <Input
                      id="pricePerSlot"
                      type="number"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <Button>Add Room</Button>
              </DialogContent>
            </Dialog>
            <Table>
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
                        <TableCell>
                          <Button variant="outline" size="sm" className="mr-2">
                            Update
                          </Button>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  : "No rooms found"}
              </TableBody>
            </Table>
          </div>
        );
      case "slots":
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
                      <Input
                        required
                        id="date"
                        type="date"
                        className="col-span-3"
                      />
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
                {slotsIsloading
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
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  : "No slots found"}
              </TableBody>
            </Table>
          </div>
        );
      case "bookings":
        return (
          <div>
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
                {bookingsIsloading
                  ? "loading..."
                  : bookings
                  ? bookings.map((booking: TBooking) => (
                      <TableRow key={booking._id}>
                        <TableCell>{booking.room.name}</TableCell>
                        <TableCell>{booking.user.name}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>{booking.slots[0].startTime}</TableCell>
                        <TableCell>{booking.isConfirmed}</TableCell>
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
                          <Button
                            variant="destructive"
                            size="sm"
                            className="ml-2"
                            onClick={() => {
                              // Handle reject action
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  : "No bookings found"}
              </TableBody>
            </Table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex  bg-gray-100">
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="mb-4">
                <div className="py-2">
                  <h2 className="mb-2  text-2xl font-semibold tracking-tight">
                    Dashboard
                  </h2>
                  <Tabs
                    defaultValue="rooms"
                    className="w-fit"
                    onValueChange={(value) => {
                      setActiveTab(value);
                    }}
                  >
                    <TabsList className="flex items-stretch h-full bg-gray-300">
                      <TabsTrigger value="rooms" className="">
                        Rooms
                      </TabsTrigger>
                      <TabsTrigger value="slots" className="">
                        Slots
                      </TabsTrigger>
                      <TabsTrigger value="bookings" className="">
                        Bookings
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
