import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authApiSlice = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://codepen-api.vercel.app/api/v1/users",
  }),
  endpoints: (builder) => {
    return {
      getUsers: builder.query({
        query: () => "/",
      }),
      createUsers: builder.mutation<void, Partial<RegisterForm>>({
        query: (data) => ({
          url: "/",
          method: "POST",
          body: data,
        }),
      }),
      login: builder.mutation<AuthSlice, LoginForm>({
        query: (data) => ({
          url: "/login",
          method: "POST",
          body: data,
        }),
      }),
      getCurrentUser: builder.query<User, CurrentUserRequest>({
        query: ({ accessToken }) => ({
          url: "/getCurrentUser",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
      logout: builder.mutation<void, CurrentUserRequest>({
        query: ({ accessToken }) => ({
          url: "/logout",
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
    };
  },
});
export const {
  useCreateUsersMutation,
  useGetUsersQuery,
  useLoginMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
} = authApiSlice;
