import axios from "axios";
import { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DownloadApp from "../components/DownloadApp";
import { dishesTypesImageIds } from "@/utils/dishesTypes.ts";
import Loader from "@/components/Loader";

const RestaurantsListPage = () => {
  const [shops, setShops] = useState<Shop[] | null>();
  const [loading, setLoading] = useState(false);

  interface Shop {
    address: string;
    description: string;
    distance: string;
    latitude: string;
    longitude: string;
    name: string;
    rating: number;
    reviews: number;
    _id: string;
  }

  async function getRestaurantData() {
    setLoading(true);
    const response = await axios.get(
      "https://brew-haven-backend.onrender.com/api/restaurants"
    );
    console.log(response.data);
    setShops(response.data.shops);
    setLoading(false);
  }

  useEffect(() => {
    getRestaurantData();
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
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="flex flex-col mt-8 mb-8 w-4/5 mx-auto">
            <div className="flex flex-row justify-between">
              <h2 className="mb-4 text-2xl sm:text-3xl font-bold text-lagoonBlue">
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
                autoPlaySpeed={3000}
                keyBoardControl={true}
                transitionDuration={500}
                removeArrowOnDeviceType={["mobile"]}
              >
                {dishesTypesImageIds.map((item) => {
                  return (
                    <div>
                      <img
                        src={
                          "https://media-assets.swiggy.com/swiggy/image/upload/" +
                          item
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
              <h2 className="mb-4 text-2xl sm:text-3xl font-bold text-lagoonBlue">
                Restaurants with online food delivery
              </h2>
            </div>
            <div className="w-full flex flex-wrap">
              {shops?.map((item) => {
                return (
                  <div
                    className=" w-full mb-8 sm:w-1/2 sm:px-4 lg:w-1/3"
                    key={item._id}
                  >
                    <RestaurantCard
                      id={item._id}
                      name={item.name}
                      image="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      address={item.address}
                      distance={item.distance}
                      rating={item.rating}
                      reviews={item.reviews}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <DownloadApp />
        </div>
      )}
    </>
  );
};

export default RestaurantsListPage;
