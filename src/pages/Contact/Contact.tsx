import { Map, Marker } from "pigeon-maps";
import Section_Heading from "../../components/Section_Heading/Section_Heading";
import PayFrom from "../../components/CustomForm/CustomFrom";
import { FieldValues } from "react-hook-form";
import PayInput from "../../components/CustomInput/CustomInput";
import { Button } from "../../components/ui/button";
import CustomTextArea from "../../components/CustomTextArea/CustomTextArea";
import { ToastContainer, toast } from "react-toastify";

const Contact = () => {
  const handleContactForm = (data: FieldValues) => {
    if (data) {
      toast.success("Your message send successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div className="bg-[#f5f5f5]">
      <ToastContainer />
      <div className="max-w-7xl mx-auto pb-20 pt-6 px-2 lg:px-0">
        <div className="">
          <Map height={300} defaultCenter={[50.879, 4.6997]} defaultZoom={11}>
            <Marker width={50} anchor={[50.879, 4.6997]} />
          </Map>
        </div>

        <div className="flex justify-between  flex-col md:flex-row mt-8 gap-8 md:gap-0">
          <div className="w-full lg:w-[25%]">
            <div className="flex flex-col items-center md:items-start">
              <Section_Heading
                title="Get in touch"
                description=""
                section="Visit our Offices"
              ></Section_Heading>
              <div className="flex flex-col gap-2 mt-8 items-center md:items-start">
                <p className="font-semibold text-xl lg:text-2xl">
                  UNITED STATES
                </p>
                <p>1095 Howard Street, San Francisco</p>
                <p>(+88) 1900 888 666</p>
                <p>info@amanus.com</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[70%]">
            <PayFrom onSubmit={handleContactForm}>
              {" "}
              <div className="flex  md:gap-4 w-full flex-col md:flex-row">
                <div className="w-full">
                  <p className="mb-1 pl-2 text-[#555555]">Your Name</p>
                  <PayInput
                    name="name"
                    type="text"
                    disabled={false}
                    placeholder="Your Name"
                  ></PayInput>
                </div>
                <div className="w-full">
                  <p className="mb-1 pl-2 text-[#555555]">Your Email</p>
                  <PayInput
                    name="email"
                    type="email"
                    disabled={false}
                    placeholder="Your Email"
                  ></PayInput>
                </div>
              </div>
              <div className=" w-full">
                <p className="mb-1 pl-2 text-[#555555]">Your Message Subject</p>
                <PayInput
                  name="subject"
                  type="text"
                  disabled={false}
                  placeholder="Subject"
                ></PayInput>
              </div>
              <div className=" w-full ">
                <p className="mb-1 pl-2 text-[#555555]">Your Message</p>
                <CustomTextArea
                  name="message"
                  disabled={false}
                  placeholder="Your Message"
                ></CustomTextArea>
              </div>
              <Button
                className="bg-[#0BBA48] text-white w-full mt-2"
                type="submit"
              >
                {" "}
                Send Message
              </Button>
            </PayFrom>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
