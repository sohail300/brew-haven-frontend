import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RestaurantsDetailsPage = () => {
  const { id } = useParams();
  const [shopDetails, setShopDetails] = useState();

  async function getRestaurantData() {
    const response = await axios.get(
      `http://localhost:3000/api/restaurant/${id}`
    );

    console.log(response.data.shopDetails);
    setShopDetails(response.data.shopDetails);
  }

  useEffect(() => {
    getRestaurantData();
  }, []);
  return (
    <>
      <div className="mx-20 lg:mx-80 mt-12">
        <div className="details-page-container">
          <div className="flex flex-row justify-between border-dashed border-lagoonBlue border-b-2 p-4 details-page">
            <div className="flex flex-col">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {shopDetails?.name}
              </div>
              <div className="flex items-center py-2">
                <span className="font-semibold text-lg text-green-600">
                  {shopDetails?.rating}
                </span>
                <span className="mx-1 text-gray-500">•</span>
                <span className="text-base text-gray-700">
                  {shopDetails?.reviews} reviews
                </span>
              </div>
              <div className="text-gray-700 opacity-75 mb-1">
                {shopDetails?.distance} away
              </div>
              <div className="text-gray-700 opacity-75 mb-1">
                {shopDetails?.address}
              </div>
              <div className="text-gray-700 opacity-75">
                {shopDetails?.description}
              </div>
            </div>
            <div className="flex-shrink-0 ml-4">
              <img
                className="w-48 h-48 object-cover rounded-lg shadow-lg"
                src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Shop"
              />
            </div>
          </div>
        </div>

        <h2 className="mb-4 text-3xl font-bold text-lagoonBlue mt-8">
          Recommended
        </h2>
        {shopDetails?.products.map((item) => {
          return (
            <div className="flex flex-col md:flex-row justify-between border-dashed border-lagoonBlue border-b-2 p-6 my-6 bg-white rounded-lg shadow-lg details-page">
              <div className="flex flex-col flex-1">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {item?.name}
                </div>
                <div className="flex items-center py-2">
                  <span className="text-base text-yellow-500 flex items-center">
                    {Array.from(
                      { length: Math.floor(item?.rating) },
                      (_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 inline-block fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.568L24 9.812l-6 5.854 1.414 8.293L12 18.645l-7.414 4.314L6 15.666 0 9.812l8.332-1.657z" />
                        </svg>
                      )
                    )}
                    <span className="ml-2 text-gray-700">{item?.rating}</span>
                  </span>
                  <span className="mx-1 text-gray-500">•</span>
                  <span className="text-base text-gray-700">
                    {item?.reviews} reviews
                  </span>
                </div>
                <div className="font-semibold text-lg text-green-600 mb-2">
                  ₹{item?.price}
                </div>
                <div className="text-gray-700 mb-4">{item?.description}</div>
                <div>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    #{item?.category}
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0 ml-0 md:ml-4 mt-4 md:mt-0">
                <img
                  className="w-full md:w-48 h-48 object-cover rounded-lg shadow-lg"
                  src={item?.image}
                  alt={item?.name}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RestaurantsDetailsPage;
