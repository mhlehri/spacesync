"use client";

import { AnimatedButton } from "@/components/AnimatedButton";
// import { loadStripe } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// This would typically come from the previous page's form submission

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );

import { useToast } from "@/hooks/use-toast";
import { useAddBookingMutation } from "@/redux/features/bookings/bookings";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { format } from "date-fns";
import * as React from "react";
import { toast } from "sonner";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const Stripe_PK = import.meta.env.VITE_STRIPE_PK;

const stripePromise = loadStripe(Stripe_PK);

function Form() {
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const navigate = useNavigate();

  const elements = useElements();
  const stripe = useStripe();

  React.useEffect(() => {
    fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: 100 }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setClientSecret(data.clientSecret);
      });
  }, []);

  const location = useLocation();
  const bookingDetails = location.state.bookingData;
  //   console.log(bookingDetails, "bookingDetails");
  const bookingData = {
    room: bookingDetails.room._id,
    date: format(bookingDetails.date, "yyyy-MM-dd"),
    user: bookingDetails.user._id,
    slots: [bookingDetails.slot],
  };
  const { toast: t } = useToast();
  console.log(bookingData, "bookingData");

  const [addBooking, { isError }] = useAddBookingMutation();

  const handleConfirmBooking = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }
    //? confirm Payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: bookingDetails?.user?.email || "anonymous",
            name: bookingDetails?.user?.name || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error", confirmError);
      toast.error("Payment Failed", {
        description: confirmError.message,
        richColors: true,
      });
    } else {
      if (paymentIntent.status == "succeeded") {
        const res = await addBooking(bookingData);
        if (isError || res?.error) {
          toast.error("Booking Failed", {
            description: "Please try again later",
            richColors: true,
          });
        } else if (res.data || !isError) {
          t({
            title: "Booking Confirmed",

            description:
              "Thank you for your booking. We've sent a confirmation email to your email address.",
          });
          setTransactionId(paymentIntent.id);
          navigate("/my-bookings", { replace: true });
        }
      }
    }
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
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>

        <div className="border border-gray-200 rounded-lg p-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "20px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
      </div>

      <AnimatedButton onClick={handleConfirmBooking} className="w-full">
        Confirm and Pay
      </AnimatedButton>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Elements stripe={stripePromise}>
      <Form />
    </Elements>
  );
}
