import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const financeApi = createApi({
  reducerPath: "financeApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `https://neatly-c2182-default-rtdb.firebaseio.com/`,
  }),

  tagTypes: ["Finance"],

  endpoints: (builder) => ({
    getFinance: builder.query({
      query: ({ localId, idToken }) =>
        `users/${localId}/finance.json?auth=${idToken}`,

      transformResponse: (data) => {
        if (!data) return [];
        return Object.entries(data).map(([id, item]) => ({
          id,
          ...item,
        }));
      },

      providesTags: ["Finance"],
    }),

    addFinance: builder.mutation({
      query: ({ localId, idToken, finance }) => ({
        url: `users/${localId}/finance.json?auth=${idToken}`,
        method: "POST",
        body: finance,
      }),
      invalidatesTags: ["Finance"],
    }),

    updateFinance: builder.mutation({
      query: ({ localId, idToken, financeId, updates }) => ({
        url: `users/${localId}/finance/${financeId}.json?auth=${idToken}`,
        method: "PATCH",
        body: updates,
      }),
      invalidatesTags: ["Finance"],
    }),

    deleteFinance: builder.mutation({
      query: ({ localId, idToken, financeId }) => ({
        url: `users/${localId}/finance/${financeId}.json?auth=${idToken}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Finance"],
    }),
  }),
});

export const {
  useGetFinanceQuery,
  useAddFinanceMutation,
  useUpdateFinanceMutation,
  useDeleteFinanceMutation,
} = financeApi;
