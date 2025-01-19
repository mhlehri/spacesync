import { Link } from "react-router-dom";
import { RoomCard } from "../Room/room-card";
import { useGetFeaturedRoomsQuery } from "@/redux/features/rooms/rooms";
import { TRoom } from "@/types/room";

export default function FeaturedRooms() {
  const { data, isLoading } = useGetFeaturedRoomsQuery("");
  const featuredRooms = data?.data;

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          Featured Meeting Rooms
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white shadow rounded-lg p-4">
                  <div className="h-48 bg-gray-300 rounded-md mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded-md mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded-md"></div>
                </div>
              </div>
            ))
          ) : !isLoading && featuredRooms?.length > 0 ? (
            featuredRooms?.map((room: TRoom) => (
              <RoomCard key={room._id} room={room} />
            ))
          ) : (
            <p className="text-center text-gray-500">No rooms found</p>
          )}
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
