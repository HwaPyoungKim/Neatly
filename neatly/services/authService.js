import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://identitytoolkit.googleapis.com/v1/",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (auth) => ({
        url: "accounts:signInWithPassword?key=AIzaSyCsGpeh8F0JXia0YdXOzN6GcQ96HKO2ltU",
        method: "POST",
        body: auth,
      }),
    }),
    register: builder.mutation({
      query: (auth) => ({
        url: "accounts:signUp?key=AIzaSyCsGpeh8F0JXia0YdXOzN6GcQ96HKO2ltU",
        method: "POST",
        body: auth,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
