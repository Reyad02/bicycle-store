import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  useGetAllBicyclesQuery,
  useGetBicycleBrandsQuery,
} from "../../redux/features/bicycles/bicycleApi";
import { Checkbox } from "../../components/ui/checkbox";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import ScrollToTop from "react-scroll-to-top";

const Products = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: products } = useGetAllBicyclesQuery([
    { name: "searchTerm", value: searchTerm },
    { name: "sort", value: sort },
    { name: "page", value: currentPage },
    ...selectedBrands.map((b) => ({ name: "brand", value: b })),
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrands, searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { data: brands } = useGetBicycleBrandsQuery(undefined);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prevBrand) =>
      prevBrand.includes(brand)
        ? prevBrand.filter((b) => b !== brand)
        : [...prevBrand, brand]
    );
    setCurrentPage(1);
  };

  return (
    <div className="bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto pb-20 pt-6">
        <div className="mb-6 px-2 lg:px-0">
          {/* search bar  */}
          <label className="input input-bordered flex items-center gap-2 bg-transparent border border-stone-600">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              onChange={(event) => {
                setSearchTerm(event.target.value.trim());
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>

        <div className=" flex flex-col md:flex-row gap-4 ">
          <ScrollToTop
            smooth={true}
            color="#0BBA48"
            style={{
              borderRadius: "9999px",
              width: "60px",
              height: "60px",
              justifyItems: "center",
            }}
          />
          {/* sidebar section  */}
          <div className="drawer lg:drawer-open w-[20%] lg:border auto-cols-auto">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-start lg:hidden col-span-1 p-2">
              {/* Page content here */}
              <label
                htmlFor="my-drawer-2"
                className="btn bg-[#0BBA48] text-white border-none outline-none drawer-button lg:hidden "
              >
                <GiHamburgerMenu />
              </label>
            </div>
            <div className="drawer-side z-50">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>

              <div className="bg-slate-100 lg:bg-transparent h-full lg:w-full">
                {/* brand  */}
                <ul className="menu items-start min-w-full text-black p-4 ">
                  <div className="">
                    <h1 className="font-semibold text-xl mb-4 ">Brands</h1>
                    <div className="flex flex-col gap-2 ">
                      {brands?.data?.map((brand: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-4 ">
                          <Checkbox
                            id={brand}
                            onCheckedChange={() => handleBrandChange(brand)}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor={brand}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {brand}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ul>

                {/* dropdown  */}
                <div className="p-4">
                  <h1 className="font-semibold text-xl mb-2">Sort by Price</h1>

                  <select
                    className="bg-transparent border w-full border-slate-500"
                    onChange={(event) => setSort(event.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Price
                    </option>
                    <option value="-price">High</option>
                    <option value="price">Low</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* card section */}
          <div className="grid grid-cols-1 gap-16 md:gap-8 px-2 lg:px-0 md:px-4 lg:px-0 md:grid-cols-2 lg:grid-cols-3 lg:w-[78%] h-fit">
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
                    Type:{" "}
                    <span className="text-black font-semibold">{type}</span>
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

        {/* pagination  */}
        <div className="flex justify-center mt-8">
          <div className="join grid grid-cols-2 w-fit ">
            <button
              className="join-item btn btn-outline hover:border-[#0BBA48] hover:bg-white text-black"
              disabled={currentPage == 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous page
            </button>
            <button
              className="join-item btn btn-outline  hover:border-[#0BBA48] hover:bg-white text-black"
              disabled={currentPage == products?.meta?.totalPage}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
