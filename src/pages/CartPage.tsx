import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const CartPage = () => {
  // const setCartRestaurant = useSetRecoilState(cartRestaurantState);
  // const setCartDishes = useSetRecoilState(cartDishesState);
  const [cartRestaurant, setCardRestaurant] = useState({
    name: "ABC",
    address: "abc",
    deliveryCharge: 40,
  });
  const [cartDishes, setCartDishes] = useState([
    { id: "111819613", name: "Margherita", quantity: 1, price: 169 },
    { id: "47542941", name: "Veggie Feast", quantity: 1, price: 259 },
  ]);
  const [charges, setCharges] = useState();

  async function calculateTotalPrice() {
    let obj = {
      itemTotal: 0,
      deliveryCharge: 20,
      gst: 0,
      total: 0,
    };

    let tempSum = 0;
    cartDishes.forEach((temp) => (tempSum = temp.price + tempSum));
    obj.itemTotal = tempSum;

    obj.gst = parseFloat((0.09 * obj.itemTotal).toFixed(2));
    obj.total = obj.itemTotal + obj.deliveryCharge + obj.gst;

    setCharges(obj);
  }

  useEffect(() => {
    calculateTotalPrice();
  }, []);

  return (
    <div className="bg-zinc-200 p-8">
      <div className="w-4/5 mx-auto flex flex-row">
        <div className="flex flex-col w-3/5 mx-auto">
          <div className="bg-white shadow-lg rounded-lg mb-8 p-8">
            <div className="text-lg font-bold text-gray-900 mb-6">
              Delivery Address
            </div>
            <div className="border border-green-300 p-4 mb-6 cursor-pointer rounded-lg hover:bg-green-50 transition">
              <div className="text-lg font-bold text-gray-900 mb-2">
                New Hostel
              </div>
              <div className="text-sm text-gray-600">
                IIIT New Boys Hostel, Bhagalpur, Bihar, India
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="text-lg font-bold text-gray-900 mb-6">
              Choose Payment Method
            </div>
            <div className="bg-green-500 py-3 px-6 text-white font-medium text-center cursor-pointer rounded-lg hover:bg-green-600 transition">
              PROCEED TO PAY
            </div>
          </div>
        </div>

        <div className="flex flex-col w-2/5 bg-white ml-6 p-2 shadow-lg rounded-lg">
          <div className="mx-8 my-4 flex flex-row items-center">
            <img
              src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt={cartRestaurant.name}
              className="h-16 w-16 object-cover rounded-full shadow-lg mr-4"
            />
            <div>
              <div className="text-lg font-bold text-gray-900 mb-1">
                {cartRestaurant.name}
              </div>
              <div className="text-sm text-gray-600">
                {cartRestaurant.address}
              </div>
            </div>
          </div>

          {cartDishes.map((item) => (
            <div
              key={item.id}
              className="mx-8 my-2 flex flex-row justify-between items-center bg-green-50 border-green-200 border px-4 py-3 rounded-lg transition"
            >
              <span className="text-gray-900">{item.name}</span>
              <div className="w-2/4 flex flex-row justify-between items-center">
                <span className="flex items-center border border-gray-300 px-2 rounded-lg">
                  <button className="text-gray-700 font-bold">-</button>
                  <span className="px-4 text-green-500 font-bold">
                    {item.quantity}
                  </span>
                  <button className="text-green-500 font-bold">+</button>
                </span>
                <span className="ml-4 text-gray-900">₹{item.price / 100}</span>
              </div>
            </div>
          ))}

          <div className="mx-8 my-4 p-4 flex flex-col border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex flex-row mb-1">
              <Checkbox className="mr-4 mt-1" />
              <div className="text-sm font-bold text-gray-900 ">
                Opt in for No-contact Delivery
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">
                Unwell, or avoiding contact? Please select no-contact delivery.
                Partner will safely place the order outside your door (not for
                COD)
              </div>
            </div>
          </div>

          <div className="mx-8 my-4">
            <div className="font-medium text-sm text-gray-700 mb-2">
              Bill Details
            </div>
            <div className="flex flex-row justify-between text-sm text-gray-600 mb-2 py-2 border-b border-gray-200">
              <span>Item Total</span>
              <span>₹{charges?.itemTotal}</span>
            </div>
            <div className="flex flex-row justify-between text-sm text-gray-600 mb-2 py-2 border-b border-gray-200">
              <span>Delivery Partner Fee</span>
              <span>₹{cartRestaurant?.deliveryCharge}</span>
            </div>
            <div className="flex flex-row justify-between text-sm text-gray-600 mb-2 py-2">
              <span>Platform fee</span>
              <span>
                <span className="line-through mr-2 text-red-500">₹5</span>₹3
              </span>
            </div>
            <div className="flex flex-row justify-between text-sm text-gray-600 mb-2 py-2">
              <span>GST and Restaurant Charges</span>
              <span>₹{charges?.gst}</span>
            </div>
            <div className="flex flex-row justify-between text-sm text-gray-900 font-bold mt-4 pt-4 border-t border-gray-900">
              <span>TO PAY</span>
              <span>₹{charges?.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
