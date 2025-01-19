import { useLocation, useNavigate, useParams } from "react-router-dom";

import { BookingForm } from "@/components/pages/Booking/booking-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/store";

export default function Booking() {
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const location = useLocation();
  const { room } = location.state;

  const handleBookingSubmit = (data: any) => {
    // In a real application, you would send this data to your backend
    console.log("Booking submitted:", { roomId: room._id, ...data });
    // Navigate to the confirmation page
    const bookingData = { room, ...data };
    navigate(`/booking/${room._id}/confirmation`, {
      state: { bookingData },
    });
  };
  console.log(room);

  if (!room) {
    return <div>Loading...</div>;
  }

  const userData = {
    name: user!.name,
    email: user!.email,
    phone: user!.phone,
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
          <BookingForm
            roomId={room._id}
            user={userData}
            onSubmit={handleBookingSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
}
