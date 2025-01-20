"use client";

import { DButton } from "@/components/AnimatedButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllRoomsQuery } from "@/redux/features/rooms/roomsApi";
import { useCreateSlotMutation } from "@/redux/features/slots/slotsApi";
import { TRoom } from "@/types/room";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Define the form schema
const formSchema = z
  .object({
    room: z.string().nonempty("Room is required"),
    date: z.string().nonempty("Date is required"),
    startTime: z.string().nonempty("Start time is required"),
    endTime: z.string().nonempty("End time is required"),
  })
  .refine(
    (data) => {
      const start = parseInt(data.startTime.replace(":", ""), 10);
      const end = parseInt(data.endTime.replace(":", ""), 10);
      return end > start;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );

type FormValues = z.infer<typeof formSchema>;

export default function CreateSlotForm() {
  const { data, isError, isLoading } = useGetAllRoomsQuery("");
  const roomsData = useMemo(() => data?.data || [], [data]);
  const [createSlot] = useCreateSlotMutation();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      room: "",
      date: format(new Date(), "yyyy-MM-dd"),
      startTime: "",
      endTime: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      // Here you would typically send the data to your API
      console.log(values);
      const res = await createSlot(values);
      if (res.error) {
        // @ts-expect-error - The error object is not typed
        throw new Error(res.error.data.message);
      } else if (res.data.success) {
        toast.success("Slot created successfully", {
          richColors: true,
        });
        console.log(res.data);
        form.reset();
      }
    } catch (error) {
      console.error(error);
      toast.error((error as Error)?.message || "Error creating slot", {
        richColors: true,
      });
    }
  };

  if (isLoading) return <div>Loading rooms...</div>;
  if (isError) return <div>Error loading rooms</div>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h2 className="text-2xl text-center text-indigo-500 font-bold uppercase underline">
          Create New Slot
        </h2>
        <FormField
          control={form.control}
          name="room"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={field.value ? "" : "Select a room"}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roomsData.map((room: TRoom) => (
                    <SelectItem key={room._id} value={room._id}>
                      {room.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => {
                    const time = `${i.toString().padStart(2, "0")}:00`;
                    return (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select end time" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => {
                    const time = `${i.toString().padStart(2, "0")}:00`;
                    return (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <DButton
          disabled={form.formState.isSubmitting || !form.formState.isValid}
          type="submit"
        >
          {form.formState.isSubmitting ? "Submitting.." : "Submit"}
        </DButton>
      </form>
    </Form>
  );
}
