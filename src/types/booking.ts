import { TRoom } from "./room";
import { TUser } from "./user";

export interface TBooking {
  _id: string;
  room: TRoom;
  slots: [{ startTime: string; endTime: string }];
  user: TUser;
  totalAmount: number;
  date: string;
  isDeleted: boolean;
  isConfirmed: "unconfirmed" | "confirmed";
}
