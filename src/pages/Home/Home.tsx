import About_Section, { About_Card } from "./About_Section/About_Section";
import Hero from "./Hero/Hero";
import Section_Heading from "../../components/Section_Heading/Section_Heading";
import Shining_images_part from "../../components/Shining_images_part/Shining_images_part";
import { Button } from "../../components/ui/button";
import { useGetAllBicyclesQuery } from "../../redux/features/bicycles/bicycleApi";
import Marquee from "react-fast-marquee";
import ScrollToTop from "react-scroll-to-top";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Home = () => {
  const { data: products } = useGetAllBicyclesQuery([
    { name: "limit", value: 6 },
  ]);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div>
        <Hero />
      </div>
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

      <div className="max-w-7xl mx-auto py-20">
        <About_Section></About_Section>
      </div>

      <div className="bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto py-20 flex flex-col gap-20 ">
          <div className="flex justify-between flex-col md:flex-row px-4 md:px-2 lg:px-0 gap-6 md:gap-0">
            <div className="w-full  md:w-[48%] relative "  data-aos="fade-right">
              <Shining_images_part img="https://i.postimg.cc/d3VFJ3HJ/7e01a499-25f8-4f4d-a8c0-dfef0ab44f51-1.jpg" />
            </div>
            <div className="w-full md:w-[48%] flex flex-col gap-4"  data-aos="fade-left">
              <Section_Heading
                section="Our Services"
                title="Bicycles Are Our Works, But Also Our Passion"
                description="Each of us has our own challenges, goals and reasons to ride. At Probike, our purpose is to help you unleash your full potential no matter the chosen path. We do this with our products, our people and the stories we share. Come feel what it’s like to be limitless. Come ride with us. We will bring you the greatest feeling.
              
              Probike is the world’s leading brand of high-quality bicycles and cycling gear. Part of the Probike Group, which was founded in 1972, the brand combines craftsmanship, technology and innovative design."
              />
              <Button className="bg-[#0BBA48] btn-sm text-sm text-white md:py-6 w-fit md:px-8">
                MORE ABOUT US
              </Button>
            </div>
          </div>

          <div className="flex justify-between flex-col md:flex-row-reverse items-center px-4 md:px-2 lg:px-0 gap-6 md:gap-0">
            <div className="w-full md:w-[48%] relative"  data-aos="fade-left">
              <Shining_images_part img="https://i.postimg.cc/prcHrv4z/234.jpg" />
            </div>
            <div className="w-full md:w-[48%] flex flex-col gap-4"  data-aos="fade-right">
              <Section_Heading
                section="WHY CHOOSE US"
                title="Ride With Style, Convenient, Safe And Relaxed"
                description="Probike has long been one of cycling’s main catalysts for change. We introduced lighter, stronger aluminum frames at a time when the industry standard was steel. We were first to make carbon fiber bikes widely available to the world. We defined the look and feel of modern road racing bikes with our Compact Road technology."
              />
              <Button className="bg-[#0BBA48] btn-sm text-sm text-white md:py-6 w-fit md:px-8">
                LEARN MORE
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 ">
        <div className="bg-[#F5F5F5]">
          <Marquee speed={100}>
            <img
              src="https://i.postimg.cc/FRpqVJ33/Duranta400x400-removebg-preview.png"
              alt=""
              className=" h-60"
            />
            <img
              src="https://i.postimg.cc/yd1pxYtd/SCOTT-LOGO-BLACK-sm-removebg-preview.png"
              alt=""
              className="h-24 ml-20"
            />
            <img
              src="https://i.postimg.cc/pV1cVvZW/bmc-switzerland-ag-logo-vector-removebg-preview.png"
              alt=""
              className=" h-24 ml-28"
            />
            <img
              src="https://i.postimg.cc/CL3vD4X9/trek-bicycle-logo-removebg-preview.png"
              alt=""
              className=" h-24 ml-28"
            />
            <img
              src="https://i.postimg.cc/JhmPYz1q/Pinarello-Logo-old-removebg-preview.png"
              alt=""
              className=" h-24 ml-28"
            />
          </Marquee>
        </div>
      </div>

      <div className="bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto py-20 ">
          <div className="max-w-xl mx-auto flex flex-col justify-center items-center gap-2 mb-16">
            <p className="text-lg font-thin">
              -------------
              <span className="text-[#0BBA48] font-orbitron">Our Products</span>
              -----------
            </p>
            <h1 className="text-4xl font-semibold font-orbitron">
              Featured Products
            </h1>
            <p className="text-[#555555] text-center font-inter">
              You can ride to improve your fitness, you can ride further and
              carry more gear, you can leave the car at home and help save the
              environment.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-16 md:gap-8 px-8  md:px-4 lg:px-0 md:grid-cols-2 lg:grid-cols-3 ">
            {products?.data!.map(
              ({
                _id,
                name,
                brand,
                // type,
                price,
                image,
                chain,
                color,
                frameSize,
                material,
                torque,
                seatpost,
                weight,
              }) => (
                <div key={_id} className="card card-compact shadow-xl "  data-aos="fade-right">
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
                  <div className="card-body font-inter ">
                    <p className=" text-[#555555]">
                      Price:{" "}
                      <span className="text-black text-base font-semibold font-inter">
                        ${Number(price).toFixed(2)}
                      </span>
                    </p>
                    <h2 className="card-title text-center text-xl  font-orbitron">
                      {name}
                    </h2>
                    <hr />
                    <div className="flex flex-col justify-between gap-2 text-sm">
                      <div className="flex justify-between ">
                        <div className="flex-1">
                          <div className="text-[#555555]  flex-1 ">
                            Color:{" "}
                            <p className="text-black font-semibold">{color}</p>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="text-[#555555] flex-1 ">
                            Material:{" "}
                            <p className="text-black font-semibold">
                              {material}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between ">
                        <div className="flex-1">
                          <div className="text-[#555555] ">
                            Seatpost:{" "}
                            <p className="text-black font-semibold">
                              {seatpost}
                            </p>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="text-[#555555] ">
                            Weight:{" "}
                            <p className="text-black font-semibold">
                              {weight} kg
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <div className="text-[#555555] ">
                            Torque:{" "}
                            <p className="text-black font-semibold">
                              {torque} Nm
                            </p>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="text-[#555555] ">
                            Frame Size:{" "}
                            <p className="text-black font-semibold">
                              {frameSize} cm
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <div className="text-[#555555] ">
                            Chain:{" "}
                            <p className="text-black font-semibold">{chain}</p>
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="text-[#555555] ">
                            Brand:{" "}
                            <p className="text-black font-semibold">{brand}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link to={`/products/${_id}`} className="">
                      <Button className="bg-[#0BBA48] btn-sm w-full text-sm mt-2 text-white md:py-6 md:px-8">
                        LEARN MORE
                      </Button>{" "}
                    </Link>
                  </div>
                </div>
              )
            )}
          </div>
          {/* <div className="flex justify-center pt-8">
            <Link to={`/products`} className="">
              <Button className=" btn-sm w-full text-sm mt-2 bg-white text-[#0BBA48] md:py-6 md:px-8">
                LEARN MORE
              </Button>{" "}
            </Link>
          </div> */}
        </div>
      </div>

      <div className="py-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col gap-4 max-w-xl items-center text-center md:text-left md:items-start md:w-[48%] m-4">
            <Section_Heading
              section="TESTIMONIALS"
              title=" See What They Said About Us"
              description="The BICYCLE strives to give the best customer service possible. We believe every customer should feel welcome and comfortable in our shops. Below are a few emails we have received from happy customers."
            />
            <div className="flex w-full justify-end">
              <img
                src="https://i.postimg.cc/SR0r8StC/kisspng-quotation-mark-symbol-pull-quote-sign-marks-vector-5ad89cafbbdd55-removebg-preview.png"
                alt=""
                className="h-20 lg:h-40"
              />
            </div>
          </div>

          <div className="flex gap-8 flex-col m-4 md:w-[48%]">
            <div className="flex gap-8">
              <div className="flex flex-col gap-2">
                <About_Card
                  title="Elizabeth Bailey - Customer"
                  description="“I had a fantastic experience today buying my first road bike. I'm pretty intimidated by the sport, but Wayne never treated me like I was stupid.”"
                  imgUrl="https://i.postimg.cc/HLV4hcqb/premium-photo-1671656349322-41de944d259b.jpg"
                />
              </div>
              <div className="flex flex-col gap-2">
                <About_Card
                  title="Shannon - Customer"
                  description="I brought my Trek bike in to get the brakes adjusted. Not only did Daniel see me right away, but also he went above-and-beyond in checking out the bike."
                  imgUrl="https://i.postimg.cc/Rhz7hPNT/shutterstock-105623048-0.jpg"
                />
              </div>{" "}
            </div>
            <div className="flex gap-8 ">
              <div className="flex gap-8">
                <div className="flex flex-col gap-2">
                  <About_Card
                    title="Majida - Customer"
                    description="I just purchased a 2013 Domane from the Springfield store. I want to pass along to you that I had an excellent experience working with them."
                    imgUrl="https://i.postimg.cc/Pfmb9kRV/shutterstock-533152165.jpg"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <About_Card
                    title="Phillip Author - Customer"
                    description="I had a great experience with the salesmen who helped me. I wanted to let you know your staff have earned a loyal customer."
                    imgUrl="https://i.postimg.cc/ZnZN4CM7/69707516.webp"
                  />
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
