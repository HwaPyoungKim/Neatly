import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://neatly-c2182-default-rtdb.firebaseio.com/`,
  }),
  endpoints: (builder) => ({
    putUserProfile: builder.mutation({
      query: () => ({
        url: ``,
        method: "",
        body: "",
      }),
    }),
    getUserProfile: builder.query({
      query: () => ``,
    }),
  }),
});

export const { usePutUserProfileMutation, useGetUserProfileQuery } = userApi;
