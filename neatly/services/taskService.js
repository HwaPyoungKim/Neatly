import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `https://neatly-c2182-default-rtdb.firebaseio.com/`,
  }),

  tagTypes: ["Tasks"],

  endpoints: (builder) => ({
    getTasks: builder.query({
      query: ({ localId, idToken }) =>
        `users/${localId}/tasks.json?auth=${idToken}`,

      transformResponse: (data) => {
        if (!data) return [];
        return Object.entries(data).map(([id, item]) => ({
          id,
          ...item,
        }));
      },

      providesTags: ["Tasks"],
    }),

    addTask: builder.mutation({
      query: ({ localId, idToken, task }) => ({
        url: `users/${localId}/tasks.json?auth=${idToken}`,
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateTask: builder.mutation({
      query: ({ localId, idToken, taskId, updates }) => ({
        url: `users/${localId}/tasks/${taskId}.json?auth=${idToken}`,
        method: "PATCH",
        body: updates,
      }),
      invalidatesTags: ["Tasks"],
    }),

    deleteTask: builder.mutation({
      query: ({ localId, idToken, taskId }) => ({
        url: `users/${localId}/tasks/${taskId}.json?auth=${idToken}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
