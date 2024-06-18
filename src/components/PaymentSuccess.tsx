import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="flex items-center justify-center h-[90vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="w-24 h-24 mx-auto mb-6 text-red-500"
          fill="currentColor"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>

        <h2 className="text-2xl font-semibold mb-4">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your coffee order has been placed
          successfully.
        </p>
        <div>
          <Link to={"/restaurants"}>
            <button className="px-6 py-2 bg-lagoonBlue text-white rounded-lg hover:bg-green-700 transition duration-200 mb-4 block m-auto">
              Order More Coffee
            </button>
          </Link>
          <Link to={"/"}>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 block m-auto">
              Go to Homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
