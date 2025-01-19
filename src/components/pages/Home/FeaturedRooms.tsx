import { Link } from "react-router-dom";
import { RoomCard } from "../Room/room-card";

// This would typically come from an API or database
const featuredRooms = [
  {
    id: "1",
    name: "Executive Suite",
    capacity: 12,
    pricePerSlot: 150,
    image:
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    name: "Brainstorm Hub",
    capacity: 8,
    pricePerSlot: 100,
    image:
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "3",
    name: "Tech Lab",
    capacity: 6,
    pricePerSlot: 120,
    image:
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "4",
    name: "Cozy Corner",
    capacity: 4,
    pricePerSlot: 80,
    image:
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function FeaturedRooms() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          Featured Meeting Rooms
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredRooms.map((room) => (
            // <div
            //   key={room.id}
            //   className="bg-white rounded-lg shadow-md overflow-hidden"
            // >
            //   <div className="relative h-48">
            //     <img
            //       src={room.image || "/placeholder.svg"}
            //       alt={room.name}
            //       className="object-fill w-full h-full"
            //     />
            //   </div>
            //   <div className="p-4">
            //     <h3 className="text-lg font-semibold text-gray-900 mb-2">
            //       {room.name}
            //     </h3>
            //     <p className="text-gray-600 mb-2">
            //       Capacity: {room.capacity} people
            //     </p>
            //     <p className="text-gray-600 mb-4">
            //       ${room.pricePerSlot} per slot
            //     </p>
            //     <Link
            //       to={`/meeting-rooms/${room.id}`}
            //       className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition duration-300 ease-in-out"
            //     >
            //       See Details
            //     </Link>
            //   </div>
            // </div>
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/meeting-rooms"
            className="inline-block bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium py-3 px-8 rounded transition duration-300 ease-in-out"
          >
            See More Rooms
          </Link>
        </div>
      </div>
    </section>
  );
}
