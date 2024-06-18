import { Bike, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RestaurantCard = ({
  id,
  name,
  image,
  address,
  distance,
  rating,
  reviews,
}: {
  id: string;
  name: string;
  image: string;
  address: string;
  distance: string;
  rating: number;
  reviews: number;
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col w-full cursor-pointer border-black hover:shadow-lg rounded-lg transition-shadow duration-300"
      onClick={() => navigate(`/restaurant/${id}`)}
    >
      <div className="w-full h-56 overflow-hidden rounded-t-lg">
        <img
          src={`${image}`}
          alt="Restaurant"
          className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 bg-white shadow-md rounded-b-lg">
        <div className="font-bold text-xl text-gray-900 mb-2 truncate">
          {name}
        </div>
        <div className="flex items-center text-gray-700 mb-1 ">
          <span className="font-semibold text-lg flex items-center">
            <Star color="#FFDF00" fill="#FFDF00" className="mr-2" />
            {rating} •
          </span>
          <span className="text-base flex items-center ml-1">
            {reviews} reviews
          </span>
        </div>
        <div className="flex items-center text-gray-700 mb-1">
          <Bike color="#000" className="mr-2" />
          <span className="text-base">{distance}</span>
        </div>
        <div className="text-base font-light text-gray-600 truncate flex items-center">
          <MapPin color="#000" className="mr-2" />
          {address}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
