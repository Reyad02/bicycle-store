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
      providesTags: ["bicycles"],
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
      providesTags: ["bicycles"],
      transformResponse: (response: TResponseRedux<IBicycle>) => {
        return {
          data: response.data,
          meta: response?.metaData,
        };
      },
    }),
    getBicycleBrands: builder.query({
      query: () => {
        return {
          url: "/products/getBrands",
          method: "GET",
        };
      },
      providesTags: ["bicycles"],
      transformResponse: (response: TResponseRedux<string[]>) => {
        return {
          data: response.data,
        };
      },
    }),
    updateBicycle: builder.mutation({
      query: ({ productId, formData }) => {
        return {
          url: `/products/${productId}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["bicycles"],
    }),
    deleteBicycle: builder.mutation({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["bicycles"],
    }),
  }),
});

export const {
  useGetAllBicyclesQuery,
  useGetSingleBicycleQuery,
  useGetBicycleBrandsQuery,
  useDeleteBicycleMutation,
  useUpdateBicycleMutation,
} = bicycleApi;
