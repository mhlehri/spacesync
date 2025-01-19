import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SideNavbar } from "@/components/layout/SideNavbar";

// Mock data (replace with actual data fetching in a real application)
const rooms = [
  {
    id: 1,
    name: "Executive Suite",
    roomNo: "A101",
    floorNo: 1,
    capacity: 12,
    pricePerSlot: 150,
  },
  {
    id: 2,
    name: "Brainstorm Hub",
    roomNo: "B201",
    floorNo: 2,
    capacity: 8,
    pricePerSlot: 100,
  },
];

const slots = [
  {
    id: 1,
    roomName: "Executive Suite",
    roomNo: "A101",
    date: "2023-07-15",
    startTime: "09:00",
    endTime: "10:00",
  },
  {
    id: 2,
    roomName: "Brainstorm Hub",
    roomNo: "B201",
    date: "2023-07-15",
    startTime: "14:00",
    endTime: "15:00",
  },
];

const bookings = [
  {
    id: 1,
    roomName: "Executive Suite",
    userName: "John Doe",
    date: "2023-07-15",
    time: "09:00-10:00",
    status: "Confirmed",
  },
  {
    id: 2,
    roomName: "Brainstorm Hub",
    userName: "Jane Smith",
    date: "2023-07-15",
    time: "14:00-15:00",
    status: "Unconfirmed",
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("rooms");

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
                {rooms.map((room) => (
                  <TableRow key={room.id}>
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
                ))}
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
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="roomName" className="text-right">
                      Room Name
                    </Label>
                    <Input id="roomName" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="roomNo" className="text-right">
                      Room No.
                    </Label>
                    <Input id="roomNo" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Input id="date" type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="startTime" className="text-right">
                      Start Time
                    </Label>
                    <Input id="startTime" type="time" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="endTime" className="text-right">
                      End Time
                    </Label>
                    <Input id="endTime" type="time" className="col-span-3" />
                  </div>
                </div>
                <Button>Add Slot</Button>
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
                {slots.map((slot) => (
                  <TableRow key={slot.id}>
                    <TableCell>{slot.roomName}</TableCell>
                    <TableCell>{slot.roomNo}</TableCell>
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
                ))}
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
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.roomName}</TableCell>
                    <TableCell>{booking.userName}</TableCell>
                    <TableCell>{booking.date}</TableCell>
                    <TableCell>{booking.time}</TableCell>
                    <TableCell>{booking.status}</TableCell>
                    <TableCell>
                      <Button
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
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          // Handle reject action
                        }}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden md:flex w-64 flex-col">
        <div className="flex-1 flex flex-col min-h-0 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              <SideNavbar onTabChange={setActiveTab} />
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="md:hidden mb-4">
                <SideNavbar onTabChange={setActiveTab} />
              </div>
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
