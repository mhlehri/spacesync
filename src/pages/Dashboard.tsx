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

// This would typically come from an API or database
const initialRooms = [
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
  // ... more rooms
];

const initialSlots = [
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
  // ... more slots
];

const initialBookings = [
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
  // ... more bookings
];

export default function AdminDashboard() {
  const [rooms, setRooms] = useState(initialRooms);
  const [slots, setSlots] = useState(initialSlots);
  const [bookings, setBookings] = useState(initialBookings);
  const [newRoom, setNewRoom] = useState({
    name: "",
    roomNo: "",
    floorNo: "",
    capacity: "",
    pricePerSlot: "",
  });
  const [newSlot, setNewSlot] = useState({
    roomName: "",
    roomNo: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const handleAddRoom = () => {
    const roomToAdd = {
      id: rooms.length + 1,
      name: newRoom.name,
      roomNo: newRoom.roomNo,
      floorNo: parseInt(newRoom.floorNo),
      capacity: parseInt(newRoom.capacity),
      pricePerSlot: parseInt(newRoom.pricePerSlot),
    };
    setRooms([...rooms, roomToAdd]);
    setNewRoom({
      name: "",
      roomNo: "",
      floorNo: "",
      capacity: "",
      pricePerSlot: "",
    });
  };

  const handleAddSlot = () => {
    const slotToAdd = {
      id: slots.length + 1,
      ...newSlot,
    };
    setSlots([...slots, slotToAdd]);
    setNewSlot({
      roomName: "",
      roomNo: "",
      date: "",
      startTime: "",
      endTime: "",
    });
  };

  const handleUpdateBookingStatus = (bookingId: number, newStatus: string) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Room Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Room</Button>
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
                <Input
                  id="name"
                  value={newRoom.name}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="roomNo" className="text-right">
                  Room No.
                </Label>
                <Input
                  id="roomNo"
                  value={newRoom.roomNo}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, roomNo: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="floorNo" className="text-right">
                  Floor No.
                </Label>
                <Input
                  id="floorNo"
                  type="number"
                  value={newRoom.floorNo}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, floorNo: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="capacity" className="text-right">
                  Capacity
                </Label>
                <Input
                  id="capacity"
                  type="number"
                  value={newRoom.capacity}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, capacity: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pricePerSlot" className="text-right">
                  Price Per Slot
                </Label>
                <Input
                  id="pricePerSlot"
                  type="number"
                  value={newRoom.pricePerSlot}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, pricePerSlot: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleAddRoom}>Add Room</Button>
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
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Slots Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Slot</Button>
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
                <Input
                  id="roomName"
                  value={newSlot.roomName}
                  onChange={(e) =>
                    setNewSlot({ ...newSlot, roomName: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="roomNo" className="text-right">
                  Room No.
                </Label>
                <Input
                  id="roomNo"
                  value={newSlot.roomNo}
                  onChange={(e) =>
                    setNewSlot({ ...newSlot, roomNo: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={newSlot.date}
                  onChange={(e) =>
                    setNewSlot({ ...newSlot, date: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startTime" className="text-right">
                  Start Time
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  value={newSlot.startTime}
                  onChange={(e) =>
                    setNewSlot({ ...newSlot, startTime: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endTime" className="text-right">
                  End Time
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  value={newSlot.endTime}
                  onChange={(e) =>
                    setNewSlot({ ...newSlot, endTime: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleAddSlot}>Add Slot</Button>
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
      </section>

      <section>
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
                    onClick={() =>
                      handleUpdateBookingStatus(booking.id, "Confirmed")
                    }
                  >
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      handleUpdateBookingStatus(booking.id, "Rejected")
                    }
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
