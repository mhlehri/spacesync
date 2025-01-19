import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAvailableSlotsQuery } from "@/redux/features/slots/slotsApi";
import { useEffect, useState } from "react";

const formSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
  timeSlot: z.string({
    required_error: "Please select a time slot.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
});

export function BookingForm({
  onSubmit,
  setSlot,
  roomId,
  user,
}: {
  setSlot: (slot: string) => void;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  user: { name: string; email: string; phone: string };
  roomId: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(Date.now() + 86400000),
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  const [date, setDate] = useState(form.getValues().date);
  const [timeSlots, setTimeSlot] = useState([]);
  // console.log(format(form.watch("date"), "yyyy-MM-dd"));
  const { data: availableSlots, isError } = useGetAvailableSlotsQuery({
    // date: format(form.getValues().date, "yyyy-MM-dd"),
    date: format(date, "yyyy-MM-dd"),
    roomId,
  });

  console.log(availableSlots);
  console.log(date);
  // console.log(availableSlots?.data);
  useEffect(() => {
    const timeSlot = isError
      ? []
      : availableSlots &&
        availableSlots?.data?.map(
          (slot: { startTime: string; endTime: string }) =>
            `${slot.startTime} - ${slot.endTime}`
        );
    setTimeSlot(timeSlot);
  }, [availableSlots, date, isError, form]);
  // console.log(timeSlots);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "yyyy-MM-dd")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(selectedDate) => {
                      if (
                        selectedDate &&
                        format(selectedDate, "yyyy-MM-dd") !==
                          format(date, "yyyy-MM-dd")
                      ) {
                        field.onChange(selectedDate);

                        setDate(selectedDate);
                      }
                    }}
                    disabled={(date) =>
                      date < new Date() ||
                      date >
                        new Date(new Date().setMonth(new Date().getMonth() + 2))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select your preferred booking date.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timeSlot"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Slot</FormLabel>
              <Select
                onValueChange={(value) => {
                  const selectedSlot = availableSlots?.data?.find(
                    (slot: { startTime: string; endTime: string }) =>
                      `${slot.startTime} - ${slot.endTime}` === value
                  );
                  field.onChange(value);
                  setSlot(selectedSlot?._id);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {timeSlots?.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription className={`${isError ? "text-red-500" : ""}`}>
                {isError
                  ? "No Slot Available for this date"
                  : "Choose your preferred time slot."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>Enter your full name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
              </FormControl>
              <FormDescription>Enter your email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="1234567890" {...field} />
              </FormControl>
              <FormDescription>Enter your phone number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={
            isError || form.formState.isLoading || !form.formState.isValid
          }
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600"
        >
          {form.formState.isLoading ? "Submitting.." : "Submit Booking"}
        </Button>
      </form>
    </Form>
  );
}
