import React from "react";
import { Link } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Restaurants = ({ trip }) => {
  const restaurants = trip?.tripData?.restaurants || [];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-12 mx-auto md:mx-16 lg:mx-32 p-6 rounded-lg shadow-lg bg-white/50 backdrop-blur-sm">
      <h2 className="text-4xl font-bold text-center mb-8">Food and Drinks</h2>
      
      {restaurants.length > 0 ? (
        <div className="slider-container px-4">
          <Slider {...settings}>
            {restaurants.map((restaurant, i) => (
              <div key={i} className="p-3 h-full">
                <RestaurantCardItem restaurant={restaurant} />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="text-center text-gray-500">No restaurant recommendations available.</div>
      )}
    </div>
  );
};

const RestaurantCardItem = ({ restaurant }) => {
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        restaurant?.name + "," + restaurant?.address
      )}`}
      target="_blank"
      className="block h-full"
    >
      <div className="flex flex-col items-center bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer p-4 h-full border border-gray-100 min-h-[350px]">
        <img
          src={restaurant?.imageUrl || "/placeholder.jpg"}
          alt={restaurant?.name}
          className="w-full h-48 object-cover rounded-md mb-3"
        />
        <div className="w-full">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg text-gray-800 line-clamp-1">
              {restaurant?.name}
            </h3>
            <div className="flex items-center text-sm font-semibold bg-yellow-100 px-2 py-1 rounded text-yellow-700 whitespace-nowrap ml-2">
              {restaurant?.rating} <CiStar className="ml-1" />
            </div>
          </div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1 mb-2">
            {restaurant?.category || "Restaurant"}
          </p>
          <p className="text-sm text-gray-600 line-clamp-3">
            {restaurant?.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Restaurants;