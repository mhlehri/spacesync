"use client";

import { AnimatedButton } from "@/components/AnimatedButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useLocation } from "react-router-dom";

// This would typically come from the previous page's form submission

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );

import * as React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_123");

const App = () => {
  const fetchClientSecret = React.useCallback(() => {
    // Create a Checkout Session
    return fetch("/create-checkout-session", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default function ConfirmationPage() {
  const location = useLocation();
  const bookingDetails = location.state.bookingData;
  console.log(bookingDetails, "bookingDetails");
  //   const router = useRouter();
  //   const [paymentMethod, setPaymentMethod] = useState("credit_card"); // Kept this line
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  //   const handlePaymentMethodChange = (value: string) => {
  //     setPaymentMethod(value);
  //   };

  const handleConfirmBooking = async () => {
    //   const stripe = await stripePromise;
    //   const response = await fetch("/api/create-checkout-session", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       price: bookingDetails.room.pricePerSlot,
    //       roomName: bookingDetails.room.name,
    //     }),
    //   });

    //   const { sessionId } = await response.json();
    //   const result = await stripe!.redirectToCheckout({ sessionId });

    //   if (result.error) {
    //     console.error(result.error.message);
    //   } else {
    setIsConfirmationModalOpen(true);
    //   }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Confirm Your Booking</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Booking Summary
          </h2>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Room</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {bookingDetails.room.name}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Date</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {bookingDetails.date.toLocaleDateString()}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Time</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {bookingDetails.timeSlot}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {bookingDetails.name}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {bookingDetails.email}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {bookingDetails.phone}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Total Cost</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                ${bookingDetails.room.pricePerSlot}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {/* <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
        <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="credit_card" id="credit_card" />
            <Label htmlFor="credit_card">Credit Card</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal">PayPal</Label>
          </div>
        </RadioGroup>
      </div> */}
      <App/>
      <AnimatedButton onClick={handleConfirmBooking} className="w-full">
        Confirm and Pay
      </AnimatedButton>
      <Dialog
        open={isConfirmationModalOpen}
        onOpenChange={setIsConfirmationModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Confirmed</DialogTitle>
            <DialogDescription>
              Thank you for your booking. We've sent a confirmation email to{" "}
              {/* {bookingDetails.userInfo.email}. */}
            </DialogDescription>
          </DialogHeader>
          <AnimatedButton
          //    onClick={() => router.push("/")}
          >
            Return to Home
          </AnimatedButton>
        </DialogContent>
      </Dialog>
    </div>
  );
}
