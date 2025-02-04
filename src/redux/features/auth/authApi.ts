import { baseApi } from "../../api/baseApi";

const bicycleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (args) => {
        return {
          url: "/auth",
          method: "POST",
          body: args,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = bicycleApi;
