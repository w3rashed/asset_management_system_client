import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
const BannerSlider = () => {
  return (
    <Swiper
      pagination={true}
      modules={[Pagination]}
      className="mySwiper w-full"
    >
      <SwiperSlide>
        <img src="https://i.ibb.co/vd4rBnr/bg.jpg" alt="" className="w-full" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://i.ibb.co/vd4rBnr/bg.jpg" alt="" className="w-full" />
      </SwiperSlide>
    </Swiper>
  );
};

export default BannerSlider;
