import React from "react";

import { DButton } from "@/components/AnimatedButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetRoomByIdQuery,
  useUpdateRoomMutation,
} from "@/redux/features/rooms/roomsApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z
    .string({
      message: "Name is required",
    })
    .min(3, "Name must be at least 3 characters long"),
  roomNo: z
    .number({
      message: "Room number is required",
    })
    .min(1, "Room number is required"),
  floorNo: z
    .number({
      message: "Floor number is required",
    })
    .min(1, "Floor number is required"),
  capacity: z
    .number({
      message: "Capacity is required",
    })
    .min(1, "Capacity is required"),
  pricePerSlot: z
    .number({
      message: "Price per slot is required",
    })
    .min(1, "Price per slot  is required")
    .nonnegative("Price per slot must be a non-negative number"),
  amenities: z.string({
    message: "Amenities are required",
  }),
  images: z.array(
    z
      .string({
        message: "At least one image URL is required",
      })
      .optional()
  ),
});

type FormData = z.infer<typeof formSchema>;

export default function RoomUpdateForm() {
  const [amenities, setAmenities] = useState<string[]>([]);
  const [updateRoom] = useUpdateRoomMutation();
  const { id } = useParams();
  const { data: roomData } = useGetRoomByIdQuery(id as string);
  const room = roomData?.data;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const navigate = useNavigate();
  React.useEffect(() => {
    if (room) {
      reset({
        name: room.name || "",
        roomNo: room.roomNo || 0,
        floorNo: room.floorNo || 0,
        capacity: room.capacity || 0,
        pricePerSlot: room.pricePerSlot || 0,
        amenities: room.amenities.join(", ") || "",
        images: room.images || [""],
      });
    }
  }, [room, reset]);
  console.log(room);
  const onSubmit = async (data: FormData) => {
    const a = amenities || room?.amenities;
    const d = { ...data, amenities: a };
    console.log(d, "submitted");
    const res = await updateRoom({ data: d, _id: room?._id });
    if (res.error) {
      toast.error("Failed to update room. Please try again", {
        richColors: true,
      });
    } else if (res?.data?.success) {
      toast.success("Room added successfully", {
        richColors: true,
      });
      navigate(-1);
      console.log(res.data);
    }
  };

  const handleAmenitiesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const amenitiesList = e.target.value.split(",").map((item) => item.trim());
    setAmenities(amenitiesList);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl text-center text-indigo-500 font-bold uppercase underline">
          Update Room
        </h2>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="roomNo">Room Number</Label>
          <Input
            id="roomNo"
            type="number"
            {...register("roomNo", { valueAsNumber: true })}
          />
          {errors.roomNo && (
            <p className="text-red-500">{errors.roomNo.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="floorNo">Floor Number</Label>
          <Input
            id="floorNo"
            type="number"
            {...register("floorNo", { valueAsNumber: true })}
          />
          {errors.floorNo && (
            <p className="text-red-500">{errors.floorNo.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            {...register("capacity", { valueAsNumber: true })}
          />
          {errors.capacity && (
            <p className="text-red-500">{errors.capacity.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="pricePerSlot">Price Per Slot</Label>
          <Input
            id="pricePerSlot"
            type="number"
            step="0.01"
            {...register("pricePerSlot", { valueAsNumber: true })}
          />
          {errors.pricePerSlot && (
            <p className="text-red-500">{errors.pricePerSlot.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="amenities">Amenities (comma-separated)</Label>
          <Textarea
            id="amenities"
            {...register("amenities")}
            onChange={handleAmenitiesChange}
          />
          {errors.amenities && (
            <p className="text-red-500">{errors.amenities.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="image1">Image URL 1 (Required)</Label>
          <Input required id="image1" {...register("images.0")} />
          {errors.images?.[0]?.message && (
            <p className="text-red-500">{errors.images[0]?.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="image2">Image URL 2 (Optional)</Label>
          <Input id="image2" {...register("images.1")} />
        </div>
        <div>
          <Label htmlFor="image3">Image URL 3 (Optional)</Label>
          <Input id="image3" {...register("images.2")} />
        </div>
        <DButton disabled={isSubmitting} type="submit" className="w-full">
          {isSubmitting ? "submitting.." : "update"}
        </DButton>
      </form>
    </div>
  );
}
