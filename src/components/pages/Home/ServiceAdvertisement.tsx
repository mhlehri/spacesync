import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, CheckCircle, Clock, HeadphonesIcon } from "lucide-react";

const services = [
  {
    title: "Real-Time Availability",
    description: "Check room availability instantly, anytime, anywhere.",
    icon: Clock,
  },
  {
    title: "Instant Booking Confirmation",
    description: "Secure your meeting space with immediate confirmation.",
    icon: CheckCircle,
  },
  {
    title: "Flexible Scheduling",
    description: "Easily adjust bookings to fit your changing needs.",
    icon: Calendar,
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock assistance for all your booking queries.",
    icon: HeadphonesIcon,
  },
];

export default function ServiceAdvertisement() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-8 underline underline-offset-8 text-center">
          Our Services
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 justify-between">
          {services.map((service) => (
            <Card
              key={service.title}
              className="bg-white rounded-lg shadow-md  transition duration-300 ease-in-out transform hover:scale-105"
            >
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4">
                  <service.icon
                    className="h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  {service.title}
                </h3>
              </CardHeader>
              <CardContent className="text-base text-gray-500">
                {service.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
