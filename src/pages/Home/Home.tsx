import About_Section from "../../components/About_Section/About_Section";
import Hero from "../../components/Hero/Hero";
import Section_Heading from "../../components/Section_Heading/Section_Heading";
import Shining_images_part from "../../components/Shining_images_part/Shining_images_part";
import { Button } from "../../components/ui/button";

const Home = () => {
  return (
    <>
      <div>
        <Hero />
      </div>

      <div className="max-w-7xl mx-auto py-20">
        <About_Section></About_Section>
      </div>

      <div className="bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto py-20 flex flex-col gap-20 ">
          <div className="flex justify-between ">
            <div className="w-full md:w-[48%] relative">
              <Shining_images_part img="https://i.postimg.cc/d3VFJ3HJ/7e01a499-25f8-4f4d-a8c0-dfef0ab44f51-1.jpg" />
            </div>
            <div className="w-full md:w-[48%] flex flex-col gap-4">
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

          <div className="flex justify-between flex-row-reverse items-center">
            <div className="w-full md:w-[48%] relative">
              <Shining_images_part img="https://i.postimg.cc/prcHrv4z/234.jpg" />
            </div>
            <div className="w-full md:w-[48%] flex flex-col gap-4">
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

      <div className="max-w-7xl mx-auto  py-20"></div>
    </>
  );
};

export default Home;
