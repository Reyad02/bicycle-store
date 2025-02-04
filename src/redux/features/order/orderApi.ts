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
    }),
    // paymentSuccess: builder.mutation({
    //   query: (args) => {
    //     const params = new URLSearchParams();

    //     return {
    //       url: "/orders/success",
    //       method: "POST",
    //     //   body: args,
    //     };
    //   },
    // }),
  }),
});

export const { useMakeOrderMutation } = orderApi;
