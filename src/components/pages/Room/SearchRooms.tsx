import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useState, useEffect } from "react";

// Mock data for rooms (same as in MeetingRooms.tsx)
const allRooms = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Meeting Room ${i + 1}`,
  capacity: Math.floor(Math.random() * 20) + 5,
  pricePerSlot: Math.floor(Math.random() * 100) + 50,
  image: `/rooms/room-${(i % 4) + 1}.jpg`,
}));

interface SearchRoomsProps {
  onSearchResults: (results: typeof allRooms) => void;
}

export function SearchRooms({ onSearchResults }: SearchRoomsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const results = allRooms.filter((room) =>
        room.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      onSearchResults(results);
    } else {
      onSearchResults([]);
    }
  }, [debouncedSearchTerm, onSearchResults]);

  return (
    <div className="mb-8">
      <Input
        type="text"
        placeholder="Search rooms..."
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
        className="max-w-md"
      />
    </div>
  );
}
