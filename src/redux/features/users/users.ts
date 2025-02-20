import { TResponseRedux } from "../../../types/global.type";
import { IUser } from "../../../types/User.type";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => {
        return {
          url: "/users",
          method: "GET",
        };
      },
      providesTags: ["users"],
      transformResponse: (response: TResponseRedux<IUser[]>) => {
        return {
          data: response.data,
          meta: response.metaData,
        };
      },
    }),
    updateUser: builder.mutation({
      query: ({ email, data }) => {
        return {
          url: `/users/${email}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["users"],
    }),
    createUser: builder.mutation({
      query: ({formData}) => {
        return {
          url: "/users",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["users"],
    }),
    getMyProfile: builder.query({
      query: () => {
        return {
          url: "/users/myProfile",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserMutation, useCreateUserMutation, useGetMyProfileQuery } = userApi;
