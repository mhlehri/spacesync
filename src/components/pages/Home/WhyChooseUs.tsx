import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarCheck, ShieldCheck } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Why Choose Us?
        </h2>
        <div className="flex flex-col md:flex-row justify-around items-center gap-3">
          {/* Seamless Booking Experience */}
          <Card className="flex flex-col items-center text-center p-4 max-w-sm">
            <CardHeader>
              <CalendarCheck className="w-16 h-16 text-indigo-600 mb-4" />
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Seamless Booking Experience
              </h3>
              <p className="text-gray-600">
                Our intuitive interface allows you to effortlessly view and book
                available meeting rooms in real-time, reducing the time spent on
                scheduling.
              </p>
            </CardContent>
          </Card>
          {/* Secure Transactions */}
          <Card className="flex flex-col items-center text-center p-4 max-w-sm">
            <CardHeader>
              <ShieldCheck className="w-16 h-16 text-indigo-600 mb-4" />
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Secure Transactions
              </h3>
              <p className="text-gray-600">
                We prioritize the security of your personal and financial
                information, implementing robust measures to safeguard against
                data breaches and unauthorized access.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
