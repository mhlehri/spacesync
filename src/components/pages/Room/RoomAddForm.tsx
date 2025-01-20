import React from "react";

import { DButton } from "@/components/AnimatedButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
  images: z
    .array(
      z
        .string({
          message: "At least one image URL is required",
        })
        .min(1, "At least one image URL is required")
        .url({
          message: "Invalid URL",
        })
    )
    .min(1, "At least one image URL is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function RoomAddForm() {
  const [amenities, setAmenities] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    const d = { ...data, amenities };
    console.log(d);
    toast.success("Form submitted", {
      description: "Check the console for the form data",
    });
  };

  const handleAmenitiesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const amenitiesList = e.target.value.split(",").map((item) => item.trim());
    setAmenities(amenitiesList);
  };

  return (
    <div className="max-w-lg mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 border p-6 rounded bg-slate-100 shadow"
      >
        <h2 className="text-2xl text-center text-indigo-500 font-bold uppercase underline">
          Add New Room
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
          <Input id="image1" {...register("images.0")} />
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
          {isSubmitting ? "submitting.." : "Add"}
        </DButton>
      </form>
    </div>
  );
}
