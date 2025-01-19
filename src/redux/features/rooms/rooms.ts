// Need to use the React-specific entry point to import createApi
import { baseApi } from "@/redux/api/baseApi";

// Define a service using a base URL and expected endpoints
export const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: () => `rooms`,
    }),
    getRoomById: builder.query({
      query: (id: string) => `rooms/${id}`,
    }),
    getFeaturedRooms: builder.query({
      query: () => `rooms/featured`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllRoomsQuery,
  useGetRoomByIdQuery,
  useGetFeaturedRoomsQuery,
} = roomApi;
