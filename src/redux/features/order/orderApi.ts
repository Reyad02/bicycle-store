import { IOrder } from "../../../pages/MyOrders/MyOrders";
import { TResponseRedux } from "../../../types/global.type";
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
    getAllOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((element: { name: string; value: string }) => {
            params.append(element.name, element.value);
          });
        }
        return {
          url: `/orders`,
          method: "GET",
          params,
        };
      },
      providesTags: ["orders"],
      transformResponse: (response: TResponseRedux<IOrder[]>) => {
        return {
          data: response.data,
          meta: response.metaData,
        };
      },
    }),
    updateBicycleStatus: builder.mutation({
      query: ({ orderId, data }) => {
        console.log(orderId, data);
        return {
          url: `/orders/${orderId}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["orders"],
    }),
    getTotalIncome: builder.query({
      query: () => {
        return {
          url: `/orders/getTotalIncome`,
          method: "GET",
        };
      },
    }),
    getTotalDelivered: builder.query({
      query: () => {
        return {
          url: `/orders/totalDeliveredProducts`,
          method: "GET",
        };
      },
      providesTags: ["orders"],
    }),
    getTotalPending: builder.query({
      query: () => {
        return {
          url: `/orders/totalPendingProducts`,
          method: "GET",
        };
      },
      providesTags: ["orders"],
    }),
    getTopSellingProducts: builder.query({
      query: () => {
        return {
          url: `/orders/topProducts`,
          method: "GET",
        };
      },
    }),
    getLast30Products: builder.query({
      query: () => {
        return {
          url: `/orders/last7DaysIncome`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useMakeOrderMutation,
  useMyOrdersQuery,
  useGetAllOrdersQuery,
  useUpdateBicycleStatusMutation,
  useGetTotalIncomeQuery,
  useGetTotalDeliveredQuery,
  useGetTotalPendingQuery,
  useGetTopSellingProductsQuery,
  useGetLast30ProductsQuery,
} = orderApi;
