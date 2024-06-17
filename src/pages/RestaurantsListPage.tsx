import axios from "axios";
import { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DownloadApp from "../components/DownloadApp";

const RestaurantsListPage = () => {
  const [shops, setShops] = useState([]);
  const [dishes, setDishes] = useState([]);

  async function getRestaurantData() {
    const response = await axios.get("http://localhost:3000/api/restaurants");
    console.log(response.data);
    setShops(response.data.shops);
  }

  const lat = 12.9351929;
  const lng = 77.62448069999999;

  async function getDishesTypesData() {
    const response = await axios.get(
      `https://food-delivery-service-7vpo.onrender.com/api/restaurants?lat=${lat}&lng=${lng}`
    );
    console.log("inside");
    console.log(
      response?.data?.data?.cards[0]?.card?.card?.imageGridCards?.info
    );
    setDishes(response?.data?.data?.cards[0]?.card?.card?.imageGridCards?.info);
  }

  useEffect(() => {
    getRestaurantData();
    getDishesTypesData();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <div>
      <div className="flex flex-col mt-8 mb-8 w-4/5 mx-auto">
        <div className="flex flex-row justify-between">
          <h2 className="mb-4 text-3xl font-bold text-lagoonBlue">
            What's on your mind?
          </h2>
        </div>
        <div className="">
          <Carousel
            responsive={responsive}
            className="pb-8"
            swipeable={true}
            draggable={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            keyBoardControl={true}
            transitionDuration={500}
            removeArrowOnDeviceType={["tablet", "mobile"]}
          >
            {dishes.map((item) => {
              return (
                <div>
                  <img
                    src={
                      "https://media-assets.swiggy.com/swiggy/image/upload/" +
                      item.imageId
                    }
                    alt="dish"
                    className="w-80 h-auto ml-4 mr-4 cursor-pointer"
                  />
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>

      <div className="flex flex-col mt-8 mb-8 w-4/5 mx-auto">
        <div className="flex flex-row justify-between">
          <h2 className="mb-4 text-3xl font-bold text-lagoonBlue">
            Restaurants with online food delivery
          </h2>
        </div>
        <div className="grid grid-cols-4">
          {shops.map((item) => {
            return (
              <RestaurantCard
                key={item._id}
                id={item._id}
                name={item.name}
                image="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                address={item.address}
                distance={item.distance}
                rating={item.rating}
                reviews={item.reviews}
              />
            );
          })}
        </div>
      </div>

      <DownloadApp />
    </div>
  );
};

export default RestaurantsListPage;
