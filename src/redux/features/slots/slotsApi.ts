import { baseApi } from "@/redux/api/baseApi";

const slotsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableSlots: builder.query({
      query: ({ date, roomId }) =>
        `slots/availability?date=${date}&roomId=${roomId}`,
    }),
    getAllSlots: builder.query({
      query: () => `slots`,
      providesTags: ["Slot"],
    }),
    deleteSlotById: builder.mutation({
      query: (id) => ({
        url: `slots/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Slot"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAvailableSlotsQuery,
  useGetAllSlotsQuery,
  useDeleteSlotByIdMutation,
} = slotsApi;
