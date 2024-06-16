// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const BannerSlider = () => {
  return (
    <Swiper
      pagination={true}
      modules={[Pagination, Autoplay]}
      className="mySwiper w-full lg:h-[80vh] z-0"
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
    >
      <SwiperSlide>
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: "url(https://i.ibb.co/LtXVQXj/image.png)",
          }}
        >
          <div className="hero-overlay bg-opacity-50"></div>
          <div className="w-full hero-content text-left text-white">
            <div className="md:w-1/2 ">
              <h1 className="mb-5 text-5xl font-bold">
                Introducing Our <span>Asset Nex</span> Management System
              </h1>
              <Link to="/join_hr_manager">
                <Button className="btn btn-primary">Join as HR Manager </Button>
              </Link>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: "url(https://i.ibb.co/vxpzJh1/image.png)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="w-full hero-content  text-white">
            <div className="md:w-1/2">
              <h1 className="mb-5 text-5xl font-bold">
                Introducing Our <span>Asset Nex</span> Management System
              </h1>
              <Link to="/join_employee">
                <Button className="btn btn-primary">
                  Join as an Employee{" "}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default BannerSlider;
