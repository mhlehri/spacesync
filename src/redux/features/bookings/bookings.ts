import { baseApi } from "@/redux/api/baseApi";

const bookingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMyBookings: builder.query({
      query: () => `my-bookings`,
    }),
    addBooking: builder.mutation({
      query: (data) => ({
        url: "bookings",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllMyBookingsQuery, useAddBookingMutation } = bookingsApi;
