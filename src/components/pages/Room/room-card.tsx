import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TRoom } from "@/types/room";
import { Link } from "react-router-dom";

interface RoomCardProps {
  room: TRoom;
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-48 w-full">
          <img
            src={
              room?.images[0] ||
              "https://images.unsplash.com/photo-1503418895522-46f9804cda40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={room.name}
            className="object-cover h-full w-full"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{room.name}</h3>
          <p className="text-sm text-gray-500">Capacity: {room.capacity}</p>
          <p className="text-sm font-medium">${room.pricePerSlot} per slot</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-indigo-500 hover:bg-indigo-600 rounded"
          asChild
        >
          <Link to={`/meeting-rooms/${room._id}`}>See Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
