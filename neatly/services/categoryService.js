import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `https://neatly-c2182-default-rtdb.firebaseio.com/`, // Firebase Realtime Database
  }),

  tagTypes: ["Categories"],

  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({ localId, idToken }) =>
        `users/${localId}/categories.json?auth=${idToken}`,

      transformResponse: (data) => {
        if (!data) return [];

        return Object.entries(data).map(([id, item]) => ({
          id,
          ...item,
        }));
      },

      providesTags: ["Categories"],
    }),

    addCategory: builder.mutation({
      query: ({ localId, idToken, category }) => ({
        url: `users/${localId}/categories.json?auth=${idToken}`,
        method: "POST",
        body: category,
      }),

      invalidatesTags: ["Categories"],
    }),

    updateCategory: builder.mutation({
      query: ({ localId, idToken, categoryId, updates }) => ({
        url: `users/${localId}/categories/${categoryId}.json?auth=${idToken}`,
        method: "PATCH",
        body: updates,
      }),

      invalidatesTags: ["Categories"],
    }),

    deleteCategory: builder.mutation({
      query: ({ localId, idToken, categoryId }) => ({
        url: `users/${localId}/categories/${categoryId}.json?auth=${idToken}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
