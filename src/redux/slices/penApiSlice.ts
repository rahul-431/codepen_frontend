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
          url: `/current/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
      createNewPen: builder.mutation<PenResponse, Partial<Pen>>({
        query: ({ accessToken, ...pen }) => ({
          url: "/",
          method: "POST",
          body: pen,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
      updatePen: builder.mutation<PenResponse, Partial<Pen>>({
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
      changeType: builder.mutation<PenResponse, ChangeTypeRequest>({
        query: ({ accessToken, value, id }) => ({
          url: `/${id}`,
          method: "POST",
          body: { value: value },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
      permanentDeletePen: builder.mutation<void, CurrentPenRequest>({
        query: ({ id, accessToken }) => ({
          url: `/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
      tempDeletePen: builder.mutation<PenResponse, CurrentPenRequest>({
        query: ({ id, accessToken }) => ({
          url: `/tempDel/${id}`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
      restorePen: builder.mutation<PenResponse, CurrentPenRequest>({
        query: ({ id, accessToken }) => ({
          url: `/restore/${id}`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
      getTempDelPens: builder.query<PenResponse[], CurrentUserRequest>({
        query: ({ accessToken }) => ({
          url: "/tempDel",
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
  useChangeTypeMutation,
  usePermanentDeletePenMutation,
  useTempDeletePenMutation,
  useGetTempDelPensQuery,
  useRestorePenMutation,
} = penApiSlice;
