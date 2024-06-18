import { cartState } from "@/store/atom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star } from "lucide-react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import googleMapsSVG from "../../public/google-maps.svg";

const RestaurantsDetailsPage = () => {
  const { id } = useParams();
  const [shopDetails, setShopDetails] = useState<ShopDetails | null>();
  const [cart, setCart] = useRecoilState(cartState);
  const [filterShops, setFilterShops] = useState<FilterShops[] | null>();
  const [categoryList, setCategoryList] = useState<FilterShops[] | null>();
  const [search, setSearch] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [position, setPosition] = useState<LatLngLiteral | undefined>();

  interface ShopDetails {
    address: string;
    description: string;
    distance: string;
    latitude: string;
    longitude: string;
    products: {
      category: string;
      description: string;
      image: string;
      name: string;
      price: number;
      rating: number;
      reviews: number;
      _id: string;
    }[];
    name: string;
    rating: number;
    reviews: number;
    _id: string;
  }

  interface FilterShops {
    category: string;
    description: string;
    image: string;
    name: string;
    price: number;
    rating: number;
    reviews: number;
    _id: string;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
  });

  async function getRestaurantData() {
    const response = await api.get(`/api/restaurant/${id}`);

    console.log(response.data.shopDetails);
    setPosition({
      lat: response.data.shopDetails.latitude,
      lng: response.data.shopDetails.longitude,
    } as LatLngLiteral);
    setShopDetails(response.data.shopDetails);
    setFilterShops(response.data.shopDetails.products);
    setCategoryList(response.data.shopDetails.products);
  }

  useEffect(() => {
    getRestaurantData();
  }, []);

  async function addToCart(
    id: string,
    name: string,
    price: number,
    image: string
  ) {
    console.log(cart);
    const restName = cart.restaurantName;

    if (restName !== shopDetails?.name) {
      setCart({
        restaurantName: shopDetails?.name || "",
        restaurantAddress: shopDetails?.address || "",
        restaurantImage: image,
        products: [
          {
            id,
            name,
            price,
            image,
            quantity: 1,
          },
        ],
      });
    } else {
      setCart((prevCart) => {
        const existingProductIndex = prevCart.products.findIndex(
          (product) => product.id === id
        );

        if (existingProductIndex > -1) {
          // Product exists, increase quantity
          const updatedProducts = prevCart.products.map((product, index) => {
            if (index === existingProductIndex) {
              return {
                ...product,
                quantity: product.quantity + 1,
              };
            }
            return product;
          });

          return {
            ...prevCart,
            products: updatedProducts,
          };
        } else {
          // Product does not exist, add to cart
          const newProduct = {
            id,
            name,
            price,
            image,
            quantity: 1,
          };

          return {
            ...prevCart,
            products: [...prevCart.products, newProduct],
          };
        }
      });
    }
  }

  async function handleFilterShops(value: string) {
    console.log(value);

    if (value === "all") {
      setFilterShops(shopDetails?.products);
      setCategoryList(shopDetails?.products);
    } else {
      // setCategory(value);
      const tempArray = shopDetails?.products.filter((item) => {
        return item.category.toLowerCase() === value;
      });
      setFilterShops(tempArray);
      setCategoryList(tempArray);
    }
  }

  async function searchList(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(filterShops);
    setSearch(e.target.value);

    const tempArray = categoryList?.filter((item) => {
      console.log(item);
      return item.name.toLowerCase().startsWith(e.target.value);
    });

    console.log(tempArray);
    setFilterShops(tempArray);
  }

  return (
    <>
      <div className="mx-4 sm:mx-20 lg:mx-40 mt-12">
        <div className="details-page-container">
          <div className="flex flex-col justify-between sm:flex-row border-dashed border-lagoonBlue border-b-2 p-4 details-page">
            <div className="flex flex-col">
              <div className="text-2xl font-bold text-lagoonBlue mb-2">
                {shopDetails?.name}
              </div>
              <div className="flex items-center py-2">
                <span className="font-semibold text-lg flex items-center text-green-600">
                  <Star color="#FFDF00" fill="#FFDF00" className="mr-2" />
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
            <div className="flex-shrink-0 sm:ml-4 mt-4 sm:mt-0 sm:m-auto">
              <img
                className="w-full sm:w-48 h-48 object-cover rounded-lg shadow-lg"
                src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Shop"
              />
            </div>
          </div>
        </div>

        <div
          className={` p-4 cursor-pointer border border-gray-500 rounded-full fixed bottom-5 right-5 z-20 ${
            showMap === true ? "bg-green-200" : "bg-blue-200"
          }`}
          onClick={() => {
            setShowMap(!showMap);
            console.log(position);
          }}
        >
          <img src={googleMapsSVG} alt="" />
        </div>

        <div
          className={` fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/50 p-4 z-10 ${
            showMap === true ? "flex" : "hidden"
          }`}
        >
          <APIProvider
            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            onLoad={() => console.log("Maps API has loaded.")}
          >
            <Map
              style={{ width: "50vw", height: "50vh" }}
              defaultCenter={position}
              defaultZoom={13}
              gestureHandling={"greedy"}
              disableDefaultUI={true}
            ></Map>
            {/* <AdvancedMarker position={position}></AdvancedMarker> */}
          </APIProvider>
        </div>

        <div className=" flex flex-col sm:flex-row justify-between items-center mb-4 mt-8">
          <h2 className="text-3xl font-bold text-lagoonBlue mb-4 sm:mb-0">
            Recommended
          </h2>

          <div className=" flex flex-row justify-between items-center sm:w-2/4">
            <Select onValueChange={(value) => handleFilterShops(value)}>
              <SelectTrigger className="w-2/5 ">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="drinks">Drinks</SelectItem>
                <SelectItem value="coffee">Coffee</SelectItem>
              </SelectContent>
            </Select>

            <input
              type="text"
              className="p-1 px-2 w-2/5 border border-gray-300 rounded-md text-lg focus:outline-none focus:border-lagoonBlue placeholder-gray-500"
              placeholder="Search"
              value={search}
              onChange={(e) => searchList(e)}
            />
          </div>
        </div>

        {filterShops?.map((item) => {
          return (
            <div
              className="flex flex-col sm:flex-row justify-between border-lagoonBlue border-b-2 px-6 py-4 my-6 bg-white rounded-lg shadow-lg details-page"
              key={item._id}
            >
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
              <div className="flex-shrink-0 ml-0 sm:ml-4 mt-4 sm:mt-0 relative">
                <img
                  className="w-full sm:w-48 h-48 object-cover rounded-lg shadow-lg"
                  src={item?.image}
                  alt={item?.name}
                />

                <div className="text-align w-full flex items-center justify-center absolute -bottom-4 sm:bottom-0">
                  <button
                    className=" bg-white shadow-lg h-full cursor-pointer py-2 px-12 border border-green-500 hover:bg-green-100 rounded-md transition-colors duration-200"
                    onClick={() =>
                      addToCart(item._id, item.name, item.price, item.image)
                    }
                  >
                    <div className=" uppercase text-green-500 font-bold">
                      ADD
                    </div>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RestaurantsDetailsPage;
