import Section_Heading from "../../../components/Section_Heading/Section_Heading";
import { FaBicycle } from "react-icons/fa6";
import { IoBicycle } from "react-icons/io5";
import { IoRocketOutline } from "react-icons/io5";
import { MdMiscellaneousServices } from "react-icons/md";

interface IAboutCardProps {
  title: string;
  description: string;
  Icon?: React.ElementType;
  imgUrl?: string;
}

export const About_Card = ({
  title,
  description,
  Icon,
  imgUrl,
}: IAboutCardProps) => {
  return (
    <>
      {Icon && (
        <div className="text-6xl text-[#0BBA48]">
          <Icon />
        </div>
      )}
      {imgUrl && (
        <div className="text-6xl text-[#0BBA48]">
          <img src={imgUrl} alt="" className="w-20 h-20 object-cover rounded-full" />
        </div>
      )}

      <h1 className="text-xl font-semibold font-orbitron">{title}</h1>
      <p className="text-[#555555] font-inter">{description}</p>
    </>
  );
};

const About_Section = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="flex flex-col gap-4 max-w-xl items-center text-center md:text-left md:items-start md:w-[48%] m-4">
        <Section_Heading
          section="About us"
          title=" Trust Over 20 Years Of Experience And Passion!"
          description="This is just like riding a bicycle, only even better with an electric
          bike you have a battery-powered motor to assist you along the way."
        />
        <div className="w-32">
          <img
            src="https://i.postimg.cc/sg2j3Qh1/png-transparent-signature-handwriting-wikimedia-commons-signature-miscellaneous-blue-text-removebg-p.png"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-2xl  font-orbitron">Tagioa Sique</p>
          <p className="text-[#555555]">CEO of BICYCLE </p>
        </div>
      </div>

      <div className="flex gap-8 flex-col m-4 md:w-[48%]">
        <div className="flex gap-8">
          <div className="flex flex-col gap-2">
            <About_Card
              title="Moutain & Road Bike"
              description="Whether you want to commute through the city, enjoy your new
              favorite byways or tackle the great outdoors. It’s so easy and
              powerful."
              Icon={FaBicycle}
            />
          </div>
          <div className="flex flex-col gap-2">
            <About_Card
              title="Professional Assembly"
              description="Just how far and how fast you can go depends on many factors, such
              as how much you're pedalling in the highest power mode."
              Icon={IoBicycle}
            />
          </div>{" "}
        </div>
        <div className="flex gap-8 ">
          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              <About_Card
                title="30 Day No Hassle Return"
                description="Jump on board, it’s easy. Just press play, that’s easy too.
                Select the power mode, pedal away, and our motors will help
                propel you along."
                Icon={IoRocketOutline}
              />
            </div>
            <div className="flex flex-col gap-2">
              <About_Card
                title="Local Service & Support"
                description="All the ride information you’ll need is displayed right there on
                the control panel in front. You’ll wonder why you haven’t done
                this before."
                Icon={MdMiscellaneousServices}
              />
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About_Section;
