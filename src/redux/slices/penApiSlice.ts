import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const penApiSlice = createApi({
  reducerPath: "pens",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/pens",
  }),
  endpoints: (builder) => {
    return {
      getPens: builder.query({
        query: () => "/",
      }),
      getCurrentPen: builder.query<Pen, CurrentPenRequest>({
        query: ({ id }) => `/${id}`,
      }),
      createNewPen: builder.mutation<Pen, Partial<Pen>>({
        query: (pen) => ({
          url: "/",
          method: "POST",
          body: pen,
        }),
      }),
      updatePen: builder.mutation<Pen, Partial<Pen>>({
        query: ({ _id: id, ...pen }) => ({
          url: `/${id}`,
          method: "PUT",
          body: pen,
        }),
      }),
    };
  },
});

export const {
  useGetPensQuery,
  useCreateNewPenMutation,
  useUpdatePenMutation,
  useGetCurrentPenQuery,
} = penApiSlice;
