import { Swiper, SwiperSlide } from "swiper/react";
import "./Hero.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

interface ISwiperSlide {
  img: string;
  title: string;
  description: string;
}

const SwiperSlideContent = ({
  title,
  description,
}: Omit<ISwiperSlide, "img">) => {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-2 md:gap-6 lg:gap-8 left-[3%] md:left-[7%] max-w-xl">
      <h1 className="text-xl md:text-4xl font-semibold lg:text-6xl">{title}</h1>
      <p className="text-sm text-[#555555] md:text-lg">{description}</p>
      <Button className="bg-[#0BBA48] btn-sm text-sm text-white md:py-6 w-fit md:px-8">
        LEARN MORE
      </Button>
    </div>
  );
};

const Hero = () => {
  const [isNotMobile, setIsNotMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsNotMobile(window.innerWidth > 768); 
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sliderContent: ISwiperSlide[] = [
    {
      img: "https://i.postimg.cc/sXcxvDB6/slide1.jpg",
      title: "On Road Off Road Any Road",
      description:
        "It's the most advanced, best performing alloy race bike ever made. Fitting, since aluminum is the 13th element.",
    },
    {
      img: "https://i.postimg.cc/3NqKvy3B/home-1-slider-2.jpg",
      title: "On Road Off Road Any Road",
      description:
        "It's the most advanced, best performing alloy race bike ever made. Fitting, since aluminum is the 13th element.",
    },
  ];
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={isNotMobile}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {sliderContent.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div>
              <img src={slide.img} alt="" className="w-full" />
              <SwiperSlideContent
                key={idx}
                title={slide.title}
                description={slide.description}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
