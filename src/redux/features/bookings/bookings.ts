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
      invalidatesTags: ["Booking"],
    }),
    getAllBookings: builder.query({
      query: () => `bookings`,
      providesTags: ["Booking"],
    }),
    deleteBookingById: builder.mutation({
      query: (id) => ({
        url: `bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllMyBookingsQuery,
  useAddBookingMutation,
  useGetAllBookingsQuery,
  useDeleteBookingByIdMutation,
} = bookingsApi;
