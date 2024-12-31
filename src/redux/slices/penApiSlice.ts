import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const penApiSlice = createApi({
  reducerPath: "pensApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/pens",
  }),
  endpoints: (builder) => {
    return {
      getPens: builder.query<PenResponse[], CurrentUserRequest>({
        query: ({ accessToken }) => ({
          url: "/",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
      getCurrentPen: builder.query<PenResponse, CurrentPenRequest>({
        query: ({ id, accessToken }) => ({
          url: `/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
      createNewPen: builder.mutation<Pen, Partial<Pen>>({
        query: ({ accessToken, ...pen }) => ({
          url: "/",
          method: "POST",
          body: pen,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
      updatePen: builder.mutation<Pen, Partial<Pen>>({
        query: ({ _id: id, accessToken, ...pen }) => ({
          url: `/${id}`,
          method: "PUT",
          body: pen,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
      getCurrentPens: builder.query<PenResponse[], CurrentUserRequest>({
        query: ({ accessToken }) => ({
          url: "/get",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
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
  useGetCurrentPensQuery,
} = penApiSlice;
