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
  distance: number;
  rating: number;
  reviews: number;
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col mr-8 w-64 mb-8 cursor-pointer border-black"
      onClick={() => navigate(`/restaurant/${id}`)}
    >
      <div className="w-64 h-42">
        <img
          src={`${image}`}
          alt=""
          className="w-64 h-36 rounded-tr-lg rounded-tl-lg object-cover"
        />
      </div>
      <div className="p-4 bg-white shadow-md overflow-hidden rounded-br-lg rounded-bl-lg">
        <div className="font-bold text-xl text-gray-900 mb-2 truncate">
          {name}
        </div>
        <div className="flex items-center text-gray-700 opacity-90 mb-1">
          <span className="font-semibold text-lg">{rating}</span>
          <span className="mx-1">•</span>
          <span className="text-base">{reviews} reviews</span>
        </div>
        <div className="flex items-center text-gray-700 opacity-90 mb-1">
          <span className="text-base">{distance}</span>
        </div>
        <div className="text-base font-light text-gray-600 opacity-80 truncate">
          {address}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
