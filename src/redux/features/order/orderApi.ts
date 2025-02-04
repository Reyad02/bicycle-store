import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    makeOrder: builder.mutation({
      query: (args) => {
        return {
          url: "/orders",
          method: "POST",
          body: args,
        };
      },
      invalidatesTags: ["my_order"],
    }),
    myOrders: builder.query({
      query: () => {
        return {
          url: `/orders/myOrder`,
          method: "GET",
        };
      },
      providesTags: ["my_order"],
    }),
  }),
});

export const { useMakeOrderMutation, useMyOrdersQuery } = orderApi;
