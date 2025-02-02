import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useGetAllBicyclesQuery } from "../../redux/features/bicycles/bicycleApi";

const Products = () => {
  const { data: products } = useGetAllBicyclesQuery([
    // { name: "page", value: 2 },
    // {
    //   name: "searchTerm",
    //   value: "dur",
    // },
    { name: "limit", value: 12 },
  ]);
  return (
    <div className="bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto py-20">
        <div className="grid grid-cols-1 gap-16 md:gap-8 px-8  md:px-4 lg:px-0 md:grid-cols-2 lg:grid-cols-4 ">
          {products?.data!.map(({ _id, name, brand, type, price, image }) => (
            <div key={_id} className="card card-compact shadow-xl ">
              <figure className="">
                <img
                  src={
                    image ||
                    "https://i.postimg.cc/FHFYTMMS/surly-bridge-club-bike-275-black-BK01137-800x600.jpg"
                  }
                  alt="Shoes"
                  className="object-cover h-48 w-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-center text-xl">{name}</h2>
                <hr />
                <p className="text-[#555555] text-base">
                  Band:{" "}
                  <span className="text-black font-semibold">{brand}</span>
                </p>
                <p className="text-[#555555] text-base">
                  Type: <span className="text-black font-semibold">{type}</span>
                </p>
                <p className="text-[#555555] text-base">
                  Price:{" "}
                  <span className="text-black font-semibold">${price}</span>
                </p>
                <Link to={`/products/${_id}`} className="">
                  <Button className="bg-[#0BBA48] btn-sm w-full text-sm text-white md:py-6 md:px-8">
                    LEARN MORE
                  </Button>{" "}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
