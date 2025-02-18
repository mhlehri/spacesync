import { RoomCard } from "@/components/pages/Room/room-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetAllRoomsQuery } from "@/redux/features/rooms/roomsApi";
import { TRoom } from "@/types/room";
import { useMemo, useState } from "react";

export default function MeetingRooms() {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const debounce = useDebounce(searchTerm, 500);
  const [capacityFilter, setCapacityFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 8;

  // Get filtered room data from API based on state variables
  const { data, isLoading, isError } = useGetAllRoomsQuery({
    searchTerm: debounce,
    capacityFilter,
    priceFilter,
    sortOrder,
    currentPage,
    roomsPerPage,
  });
  // console.log(data);
  const roomsData = useMemo(() => data?.data?.rooms || [], [data]);
  const totalRooms = useMemo(() => data?.data?.total || 0, [data]);

  const clearFilters = () => {
    setSearchTerm("");
    setCapacityFilter("");
    setPriceFilter("");
    setSortOrder("");
  };

  // Pagination
  const totalPages = Math.ceil(totalRooms / roomsPerPage);

  // if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-0 py-8">
      <h1 className="text-3xl font-semibold text-indigo-600 mb-8 underline underline-offset-8">
        Meeting Rooms
      </h1>

      <div className="flex justify-between flex-wrap gap-4 items-center mb-6">
        <Input
          type="text"
          placeholder="Search rooms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />

        <div className="flex flex-wrap gap-4">
          <Select value={capacityFilter} onValueChange={setCapacityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by capacity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any capacity</SelectItem>
              <SelectItem value="5">5+ people</SelectItem>
              <SelectItem value="10">10+ people</SelectItem>
              <SelectItem value="20">20+ people</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any price</SelectItem>
              <SelectItem value="50">Up to $50</SelectItem>
              <SelectItem value="200">Up to $200</SelectItem>
              <SelectItem value="500">Up to $500</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">No sorting</SelectItem>
              <SelectItem value="asc">Price: Low to High</SelectItem>
              <SelectItem value="desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={clearFilters} variant="outline">
            Clear Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {isError ? (
          <p>No Rooms Found</p>
        ) : isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-white shadow rounded-lg p-4">
                <div className="h-48 bg-gray-300 rounded-md mb-4"></div>
                <div className="h-6 bg-gray-300 rounded-md mb-2"></div>
                <div className="h-6 bg-gray-300 rounded-md"></div>
              </div>
            </div>
          ))
        ) : !isLoading && roomsData?.length > 0 ? (
          roomsData?.map((room: TRoom) => (
            <RoomCard key={room._id} room={room} />
          ))
        ) : (
          roomsData(<p className="text-center text-gray-500">No rooms found</p>)
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="py-2 px-4 bg-gray-100 rounded">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
