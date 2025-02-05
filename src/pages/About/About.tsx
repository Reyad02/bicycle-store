import Section_Heading from "../../components/Section_Heading/Section_Heading";
import Shining_images_part from "../../components/Shining_images_part/Shining_images_part";
import Team_Member_Image from "../../components/Team_Member_Image/Team_Member_Image";
import { Button } from "../../components/ui/button";

const About = () => {
  return (
    <div>
      <div className="bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto py-20 flex flex-col gap-20 ">
          <div className="flex justify-between flex-col md:flex-row px-4 md:px-2 lg:px-0 gap-6 md:gap-0">
            <div className="w-full  md:w-[48%] relative ">
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

          <div className="flex justify-between flex-col md:flex-row-reverse items-center px-4 md:px-2 lg:px-0 gap-6 md:gap-0">
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

      <div className="max-w-7xl mx-auto py-20">
        <div className="max-w-xl mx-auto flex flex-col justify-center items-center gap-2 mb-8">
          <p className="text-lg font-thin">
            -------------<span className="text-[#0BBA48]">THE TEAM</span>
            -----------
          </p>
          <h1 className="text-4xl font-semibold">Meet Our Team</h1>
          <p className="text-[#555555] text-center">
            You can ride to improve your fitness, you can ride further and carry
            more gear, you can leave the car at home and help save the
            environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-2 lg:px-0">
          <Team_Member_Image
            image="https://i.postimg.cc/J0y6D1xk/photo-1560250097-0b93528c311a.jpg"
            name="Phillip Wood"
            position="Founder"
          ></Team_Member_Image>
          <Team_Member_Image
            image="https://i.postimg.cc/kXHCp4zk/brunette-business-woman-with-wavy-long-hair-blue-eyes-stands-holding-notebook-hands-197531-343.avif"
            name="Mark Wood"
            position="Sale Manager"
          ></Team_Member_Image>
          <Team_Member_Image
            image="https://i.postimg.cc/J4kYRzGw/istockphoto-1342247162-612x612.jpg"
            name="Alex Jhon"
            position="Sale Manager"
          ></Team_Member_Image>
          <Team_Member_Image
            image="https://i.postimg.cc/FKmBWXrM/businesswoman-posing-23-2148142829.avif"
            name="John Lashly"
            position="Marketing Manager"
          ></Team_Member_Image>
          <Team_Member_Image
            image="https://i.postimg.cc/8C1ZddwD/depositphotos-643230786-stock-photo-shot-young-businessman-corporate-office.webp"
            name="Adam Malbro"
            position="Accountant"
          ></Team_Member_Image>
          <Team_Member_Image
            image="https://i.postimg.cc/QtdnDgWS/portrait-successful-business-woman-background-office-160672-12260.avif"
            name="Mark Wood"
            position="Sale Manager"
          ></Team_Member_Image>
        </div>
      </div>
    </div>
  );
};

export default About;
