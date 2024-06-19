import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useRecoilState } from "recoil";
import { cartState } from "@/store/atom";
import EmptyCart from "@/components/EmptyCart";
import axios from "axios";

const CartPage = () => {
  const [cart] = useRecoilState(cartState);
  const [charges, setCharges] = useState<ChargesState | undefined>();
  const [email, setEmail] = useState("");

  interface ChargesState {
    itemTotal: number;
    deliveryCharge: number;
    gst: number;
    total: number;
  }

  async function calculateTotalPrice() {
    const obj = {
      itemTotal: 0,
      deliveryCharge: 0,
      gst: 0,
      total: 0,
    };

    let tempSum = 0;
    cart.products.forEach((temp) => (tempSum = temp.price + tempSum));
    obj.itemTotal = tempSum;

    if (tempSum < 500) {
      obj.deliveryCharge = 50;
    }

    obj.gst = parseFloat((0.09 * obj.itemTotal).toFixed(2));
    obj.total = obj.itemTotal + obj.deliveryCharge + obj.gst;

    setCharges(obj);
  }

  useEffect(() => {
    calculateTotalPrice();
  }, []);

  async function checkout() {
    const response = await axios.post(
      "https://brew-haven-backend.onrender.com/api/placeOrder",
      { email }
    );
    console.log("inside checkout");
    console.log(response.data);
    window.location.href = response.data.url;
  }

  return (
    <>
      {cart.products.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="bg-zinc-200 p-8 border-red-500 border-5">
          <div className=" flex flex-wrap sm:w-full lg:w-4/5 lg:mx-auto sm:flex-row sm:flex-nowrap">
            <div className=" order-2 sm:order-1 flex flex-col sm:w-3/6 w-full mx-auto">
              <div className="bg-white shadow-lg rounded-lg mb-8 p-8 w-full border-2">
                <div className="text-lg font-bold text-gray-900 mb-6">
                  Delivery Address
                </div>
                <div className="border border-green-300 p-4 mb-6 cursor-pointer rounded-lg hover:bg-green-50 transition">
                  <div className="text-lg font-bold text-gray-900 mb-2">
                    Flat No. 22, Mount Mary Road
                  </div>
                  <div className="text-sm text-gray-600">
                    Bandra, Mumbai, Maharashtra, India
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-8 w-full sm:mb-8">
                <div className="text-md font-semibold text-gray-900 mb-6">
                  Enter your email here to receive comfirmation mail
                </div>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full mb-4 focus:outline-none"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                  }}
                />
                <div
                  className="bg-green-500 py-3 px-6 text-white font-medium text-center cursor-pointer rounded-lg hover:bg-green-600 transition"
                  onClick={() => checkout()}
                >
                  PROCEED TO PAY
                </div>
              </div>
            </div>

            <div className=" order-1 sm:order-2 flex flex-col w-full bg-white sm:w-3/6 sm:ml-6 px-1 py-2 shadow-lg rounded-lg mx-auto mb-8">
              <div className="mx-8 my-4 flex flex-row items-center">
                <img
                  src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="photo"
                  className="h-16 w-16 object-cover rounded-sm shadow-lg mr-4"
                />
                <div>
                  <div className="text-lg font-bold text-gray-900 mb-1">
                    {cart.restaurantName}
                  </div>
                  <div className="text-sm text-gray-600">
                    {cart.restaurantAddress}
                  </div>
                </div>
              </div>

              {cart.products.map((item) => (
                <div
                  key={item.id}
                  className="mx-8 my-2 flex flex-row justify-between items-center bg-green-50 border-green-200 border px-4 py-3 rounded-lg transition"
                >
                  <span className="text-gray-900">{item.name}</span>
                  <div className="w-2/4 flex flex-row justify-between items-center">
                    <span className="flex items-center border border-gray-300 px-2 rounded-lg">
                      <span className="px-4 text-green-500 font-bold">
                        {item.quantity}
                      </span>
                    </span>
                    <span className="ml-4 text-gray-900">₹{item.price}</span>
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
                    Unwell, or avoiding contact? Please select no-contact
                    delivery. Partner will safely place the order outside your
                    door (not for COD)
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
                  <span>₹{charges?.deliveryCharge}</span>
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
      )}
    </>
  );
};

export default CartPage;
