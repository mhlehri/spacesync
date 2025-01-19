"use client";

import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TRoom } from "@/types/room";
import { RoomCard } from "@/components/pages/Room/room-card";
import { useGetAllRoomsQuery } from "@/redux/features/rooms/rooms";

export default function MeetingRooms() {
  const { data, isError, isLoading } = useGetAllRoomsQuery("");
  const roomsData = useMemo(() => data?.data || [], [data]);
  const [rooms, setRooms] = useState<TRoom[]>(roomsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [capacityFilter, setCapacityFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 6;

  useEffect(() => {
    let filteredRooms = roomsData;

    // Apply search filter
    if (searchTerm) {
      filteredRooms = filteredRooms.filter((room: TRoom) =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply capacity filter
    if (capacityFilter) {
      filteredRooms = filteredRooms.filter(
        (room: TRoom) => room.capacity >= parseInt(capacityFilter)
      );
    }

    // Apply price filter
    if (priceFilter) {
      if (priceFilter !== "0") {
        filteredRooms = filteredRooms.filter(
          (room: TRoom) => room.pricePerSlot <= parseInt(priceFilter)
        );
      } else {
        return filteredRooms;
      }
    }
    // Apply sorting
    // if (sortOrder === "asc") {
    //   filteredRooms.sort((a, b) => a.pricePerSlot - b.pricePerSlot);
    // } else if (sortOrder === "desc") {
    //   filteredRooms.sort((a, b) => b.pricePerSlot - a.pricePerSlot);
    // }

    setRooms(filteredRooms);
    setCurrentPage(1);
  }, [searchTerm, capacityFilter, priceFilter, sortOrder, roomsData]);

  const clearFilters = () => {
    setSearchTerm("");
    setCapacityFilter("");
    setPriceFilter("");
    setSortOrder("");
  };

  // Pagination
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);
  const totalPages = Math.ceil(rooms?.length / roomsPerPage);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Meeting Rooms</h1>

      <div className="mb-6 space-y-4">
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
              <SelectItem value="100">Up to $100</SelectItem>
              <SelectItem value="150">Up to $150</SelectItem>
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
        {currentRooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="py-2 px-4 bg-gray-100 rounded">
            Page {currentPage} of {totalPages}
          </span>
          <Button
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
