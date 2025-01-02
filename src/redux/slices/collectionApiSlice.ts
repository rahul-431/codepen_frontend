import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const collectionApiSlice = createApi({
  reducerPath: "collectionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/collections",
  }),
  endpoints: (builder) => {
    return {
      getCollections: builder.query<Collection[], CurrentUserRequest>({
        query: ({ accessToken }) => ({
          url: "/",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
      getCurrentCollection: builder.query<Collection, CurrentPenRequest>({
        query: ({ id, accessToken }) => ({
          url: `/current/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
      createNewCollection: builder.mutation<Collection, CollectionRequest>({
        query: ({ accessToken, ...collection }) => ({
          url: "/",
          method: "POST",
          body: collection,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
      getCurrentCollections: builder.query<Collection[], CurrentUserRequest>({
        query: ({ accessToken }) => ({
          url: "/get",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
      changeCollectionType: builder.mutation<Collection, ChangeTypeRequest>({
        query: ({ accessToken, value, id }) => ({
          url: `/${id}`,
          method: "POST",
          body: { value: value },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
      permanentDeleteCollection: builder.mutation<void, CurrentPenRequest>({
        query: ({ id, accessToken }) => ({
          url: `/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
      tempDeleteCollection: builder.mutation<Collection, CurrentPenRequest>({
        query: ({ id, accessToken }) => ({
          url: `/tempDel/${id}`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
      restoreCollection: builder.mutation<Collection, CurrentPenRequest>({
        query: ({ id, accessToken }) => ({
          url: `/restore/${id}`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
      getTempDelCollections: builder.query<Collection[], CurrentUserRequest>({
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
  useChangeCollectionTypeMutation,
  useCreateNewCollectionMutation,
  useGetCollectionsQuery,
  useGetCurrentCollectionQuery,
  useGetCurrentCollectionsQuery,
  useGetTempDelCollectionsQuery,
  usePermanentDeleteCollectionMutation,
  useTempDeleteCollectionMutation,
  useRestoreCollectionMutation,
} = collectionApiSlice;
