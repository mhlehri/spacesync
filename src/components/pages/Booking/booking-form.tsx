"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TimeSlot, User } from "@/types/booking";

// Mock available time slots
const mockTimeSlots: TimeSlot[] = [
  { start: "09:00", end: "10:00", isBooked: false },
  { start: "10:00", end: "11:00", isBooked: false },
  { start: "11:00", end: "12:00", isBooked: true },
  { start: "13:00", end: "14:00", isBooked: false },
  { start: "14:00", end: "15:00", isBooked: false },
  { start: "15:00", end: "16:00", isBooked: false },
];

// Mock user data (in a real app, this would come from your auth system)
const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  phone: "123-456-7890",
};

interface BookingFormProps {
  roomId: string;
  onBookingSubmit: (booking: any) => void;
}

export function BookingForm({ roomId, onBookingSubmit }: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  );
  const [user, setUser] = useState<User>(mockUser);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedTimeSlot) {
      onBookingSubmit({
        roomId,
        userId: user.id,
        date: format(selectedDate, "yyyy-MM-dd"),
        timeSlot: selectedTimeSlot,
        user,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label>Select Date</Label>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="rounded-md border"
        />
      </div>

      {selectedDate && (
        <div>
          <Label>Available Time Slots</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {mockTimeSlots.map((slot, index) => (
              <Button
                key={index}
                type="button"
                variant={selectedTimeSlot === slot ? "default" : "outline"}
                onClick={() => handleTimeSlotSelect(slot)}
                disabled={slot.isBooked}
              >
                {slot.start} - {slot.end}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            required
          />
        </div>
      </div>

      <Button type="submit" disabled={!selectedDate || !selectedTimeSlot}>
        Proceed to Checkout
      </Button>
    </form>
  );
}
