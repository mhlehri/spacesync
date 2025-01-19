export interface TimeSlot {
  start: string;
  end: string;
  isBooked: boolean;
}

export interface Booking {
  id: string;
  roomId: string;
  userId: string;
  date: string;
  timeSlot: TimeSlot;
  status: "Unconfirmed" | "Confirmed";
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}
