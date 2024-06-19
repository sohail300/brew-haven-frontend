import { Link } from "react-router-dom";

const PaymentCanceled = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <svg
          className="w-24 h-24 mx-auto mb-6 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <h2 className="text-2xl font-semibold mb-4">Payment Canceled</h2>
        <p className="text-gray-600 mb-6">
          Your payment was canceled. If this was a mistake, please try again.
        </p>
        <div>
          <Link to={"/restaurants"}>
            <button className="px-6 py-2 bg-lagoonBlue text-white rounded-lg hover:bg-green-700 transition duration-200 mb-4 block m-auto">
              Try Again
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

export default PaymentCanceled;
