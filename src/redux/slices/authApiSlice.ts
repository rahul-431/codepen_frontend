import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authApiSlice = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/users",
  }),
  endpoints: (builder) => {
    return {
      getUsers: builder.query({
        query: () => "/",
      }),
    };
  },
});
