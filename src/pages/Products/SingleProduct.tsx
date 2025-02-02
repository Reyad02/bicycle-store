import { useParams } from "react-router-dom";
import { useGetSingleBicycleQuery } from "../../redux/features/bicycles/bicycleApi";

const SingleProduct = () => {
  const { id } = useParams();
  const { data: product } = useGetSingleBicycleQuery(id);

  return (
    <div className="bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto py-20">
        <div className="flex justify-between flex-col md:flex-row">
            
          <div className="w-[58%] flex flex-col gap-8">
            <div>
              <img
                src={
                  product?.data?.image ||
                  "https://i.postimg.cc/FHFYTMMS/surly-bridge-club-bike-275-black-BK01137-800x600.jpg"
                }
                alt=""
                className="w-full object-cover"
              />
            </div>
            <p className="text-lg ">{product?.data?.description}</p>
          </div>

          <div className="w-[38%] flex flex-col gap-8">
            <div className="bg-[#0BBA48] w-full p-8">
              <p className="text-white font-semibold text-3xl">
                MRP: ${product?.data?.price}
              </p>
            </div>
            <div className="border border-[#555555] p-8 ">
              <p className="text-xl font-semibold pb-2">SPECIFICATION</p>
              <div className="flex flex-col gap-2 text-[#555555]">
                <p>Name: {product?.data?.name}</p>
                <p>Brand: {product?.data?.brand}</p>
                <p>Type: {product?.data?.type}</p>
                {
                    product?.data?.quantity<=0 && <div className="badge badge-error text-black">Out Of Stock</div>
                }
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
