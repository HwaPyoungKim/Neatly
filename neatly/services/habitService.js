import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const habitApi = createApi({
  reducerPath: "habitApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `https://neatly-c2182-default-rtdb.firebaseio.com/`,
  }),

  tagTypes: ["Habits"],

  endpoints: (builder) => ({
    getHabits: builder.query({
      query: ({ localId, idToken }) =>
        `users/${localId}/habits.json?auth=${idToken}`,

      transformResponse: (data) => {
        if (!data) return [];
        return Object.entries(data).map(([id, item]) => ({
          id,
          ...item,
        }));
      },

      providesTags: ["Habits"],
    }),

    addHabit: builder.mutation({
      query: ({ localId, idToken, habit }) => ({
        url: `users/${localId}/habits.json?auth=${idToken}`,
        method: "POST",
        body: habit,
      }),
      invalidatesTags: ["Habits"],
    }),

    updateHabit: builder.mutation({
      query: ({ localId, idToken, habitId, updates }) => ({
        url: `users/${localId}/habits/${habitId}.json?auth=${idToken}`,
        method: "PATCH",
        body: updates,
      }),
      invalidatesTags: ["Habits"],
    }),

    deleteHabit: builder.mutation({
      query: ({ localId, idToken, habitId }) => ({
        url: `users/${localId}/habits/${habitId}.json?auth=${idToken}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Habits"],
    }),
  }),
});

export const {
  useGetHabitsQuery,
  useAddHabitMutation,
  useUpdateHabitMutation,
  useDeleteHabitMutation,
} = habitApi;
