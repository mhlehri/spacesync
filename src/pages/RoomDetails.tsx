import { Button } from "@/components/ui/button";
import { useGetRoomByIdQuery } from "@/redux/features/rooms/roomsApi";
import { useNavigate, useParams } from "react-router-dom";

// This would typically come from an API or database

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  const { data, isError, isLoading } = useGetRoomByIdQuery(id as string);
  console.log(data);
  const room = data?.data || [];
  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    return <div>Room not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">{room.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="relative h-96 mb-4">
            <img
              src={"/placeholder.svg"}
              alt={room.name}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {/* {room.images.slice(1).map((image, index) => (
              <div key={index} className="relative h-24">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${room.name} - Image ${index + 2}`}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
            ))} */}
          </div>
        </div>
        <div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Room Details
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Room No.
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {room.roomNo}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Floor No.
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {room.floorNo}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Capacity
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {room.capacity} people
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Price Per Slot
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    ${room.pricePerSlot}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Amenities
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                      {room?.amenities?.length > 0 &&
                        room?.amenities?.map(
                          (amenity: string, index: number) => (
                            <li
                              key={index}
                              className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                            >
                              {amenity}
                            </li>
                          )
                        )}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="mt-8">
            <Button
              onClick={() => {
                navigate(`/booking/${room._id}`, {
                  state: { room: room },
                });
              }}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
