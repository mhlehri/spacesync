import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, CheckCircle, DoorOpen } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-semibold text-gray-900 mb-8 underline underline-offset-8 text-center">
        How It Works?
      </h2>
      <div className="flex flex-col md:flex-row justify-around items-center gap-3">
        {/* Step 1: Select a Room */}
        <Card className="flex flex-col items-center text-center p-4 flex-1">
          <CardHeader>
            <DoorOpen className="w-16 h-16 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Select a Room
            </h3>
            <p className="text-gray-600">
              Browse through our available meeting rooms and choose the one that
              suits your needs.
            </p>
          </CardContent>
        </Card>
        {/* Step 2: Choose Date & Time */}
        <Card className="flex flex-col items-center text-center p-4 flex-1">
          <CardHeader>
            <Calendar className="w-16 h-16 text-indigo-600 mb-4" />
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Choose Date & Time
            </h3>
            <p className="text-gray-600">
              Select your preferred date and time slot to check the room's
              availability.
            </p>
          </CardContent>
        </Card>
        {/* Step 3: Confirm Booking */}
        <Card className="flex flex-col items-center text-center p-4 flex-1">
          <CardHeader>
            <CheckCircle className="w-16 h-16 text-indigo-600 mb-4" />
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Confirm Booking
            </h3>
            <p className="text-gray-600">
              Review your selection and confirm your booking with a single
              click.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
