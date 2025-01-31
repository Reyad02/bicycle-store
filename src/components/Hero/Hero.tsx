// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

const Hero = () => {
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
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div>
            <img
              src="https://i.postimg.cc/sXcxvDB6/slide1.jpg"
              alt=""
              className="w-full"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img
              src="https://i.postimg.cc/3NqKvy3B/home-1-slider-2.jpg"
              alt=""
              className="w-full"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Hero;
