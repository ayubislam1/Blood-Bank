import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const FeaturedSection = () => {
  const testimonials = [
    {
      name: "John Doe",
      role: "Blood Donor",
      image: "https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg",
      rating: 4,
      message:
        "It was a simple decision, but it saved lives. I feel proud to donate blood and help others.",
    },
    {
      name: "Jane Smith",
      role: "Blood Recipient",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeRzppZdUGys7tYOW7RkSqvVeQlloZg-dii-wJHJrtL3CmNoLf8cwj0hNHY9TjIkoh5SY&usqp=CAU",
      rating: 5,
      message:
        "I will forever be grateful for the people who donated blood. Thanks to their generosity, I received the treatment I desperately needed.",
    },
    {
      name: "Mark Johnson",
      role: "Frequent Donor",
      image: "https://thumbs.dreamstime.com/b/fin-souriante-urbaine-de-jeune-homme-avec-l-espace-de-copie-93583763.jpg",
      rating: 5,
      message:
        "Donating blood is my way of giving back to the community. It’s quick, simple, and makes a huge difference.",
    },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-red-500 mb-8">
          The Lifesaving Impact of Blood Donation
        </h2>
      

        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={50}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2.3 },
          }}
          centeredSlides={true}
          loop={true}
          className="testimonial-slider"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide
              key={index}
              className="transition-transform duration-300 ease-in-out"
            >
              <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl h-64 mx-auto shadow-lg scale-105 transition-transform duration-300">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.name} profile`}
                    className="w-20 h-20 rounded-full border-4 border-red-500 shadow-sm"
                  />
                  <div className="ml-4 text-left">
                    <p className="font-bold text-lg text-gray-800">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <div className="flex space-x-1 text-yellow-400 mt-1">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <span key={i}>
                            {i < testimonial.rating ? "★" : "☆"}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.message}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedSection;
