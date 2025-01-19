import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookingForm } from "@/components/pages/Booking/booking-form";
import { TRoom } from "@/types/room";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/store";

export default function Booking() {
  const { roomId } = useParams<{ roomId: string }>();
  console.log(roomId);

  const navigate = useNavigate();
  const [room, setRoom] = useState<TRoom>();
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    // In a real application, you would fetch the room data from an API
    const selectedRoom = rooms.find((r) => r.id === roomId);
    setRoom(selectedRoom || null);
  }, [roomId]);

  const handleBookingSubmit = (data: any) => {
    // In a real application, you would send this data to your backend
    console.log("Booking submitted:", { roomId: roomId, ...data });
    // Navigate to the confirmation page
    navigate(`/booking/${roomId}/confirmation`, {
      state: { bookingData: data },
    });
  };
  console.log(room);

  if (!room) {
    return <div>Loading...</div>;
  }

  const userData = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
  };
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Book {room.name}</CardTitle>
          <CardDescription>
            Fill out the form below to book this room
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Room Details</h2>
            <p>Price per slot: ${room.pricePerSlot}</p>
          </div>
          <BookingForm user={userData} onSubmit={handleBookingSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}
