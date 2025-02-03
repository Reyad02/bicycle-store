// import { IBicycle } from "../../../types/Bicycle.type";
// import { TResponseRedux } from "../../../types/global.type";
import { baseApi } from "../../api/baseApi";

const bicycleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (args) => {
        // const params = new URLSearchParams();
        // if (args) {
        //   args.forEach((element: { name: string; value: string }) => {
        //     params.append(element.name, element.value);
        //   });
        // }
        // console.log(args);
        return {
          url: "/auth",
          method: "POST",
          body: args,
        };
      },
    //   transformResponse: (response: TResponseRedux<IBicycle[]>) => {
    //     return {
    //       data: response.data,
    //       meta: response.metaData,
    //     };
    //   },
    }),
    
  }),
});

export const { useLoginMutation } = bicycleApi;
