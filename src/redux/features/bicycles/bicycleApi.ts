import { IBicycle } from "../../../types/Bicycle.type";
import { TResponseRedux } from "../../../types/global.type";
import { baseApi } from "../../api/baseApi";

const bicycleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBicycles: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((element: { name: string; value: string }) => {
            params.append(element.name, element.value);
          });
        }
        return {
          url: "/products",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<IBicycle[]>) => {
        return {
          data: response.data,
          meta: response.metaData,
        };
      },
    }),
    getSingleBicycle: builder.query({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<IBicycle>) => {
        return {
          data: response.data,
          meta: response?.metaData,
        };
      },
    }),
  }),
});

export const { useGetAllBicyclesQuery, useGetSingleBicycleQuery } = bicycleApi;
