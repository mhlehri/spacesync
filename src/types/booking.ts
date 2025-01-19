import { TRoom } from "./room";
import { TSlot } from "./slot";
import { TUser } from "./user";

export interface TBooking {
  _id: string;
  room: TRoom;
  slots: TSlot;
  user: TUser;
  totalAmount: number;
  date: string;
  isDeleted: boolean;
  isConfirmed: "Unconfirmed" | "Confirmed";
}
