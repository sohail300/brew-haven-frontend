import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative w-screen font-heading flex justify-between items-center px-5 py-4 shadow-md sm:px-4">
      <div className="font-black text-2xl text-lagoonBlue">Brew Haven</div>

      <div className={`${isMenuOpen ? "hidden" : "flex"} sm:hidden`}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-black z-20"
        >
          Menu
        </button>
      </div>

      <ul
        className={` absolute right-0 top-0 bg-white w-fit px-5 py-4 shadow-md flex flex-col items-left justify-between  text-lg text-lagoonBlue sm:flex sm:flex-row sm:w-3/5 sm:items-center sm:shadow-none sm:py-0 sm:static lg:sm:w-2/5 ${
          isMenuOpen ? "flex" : "hidden"
        }`}
      >
        <li className=" absolute top-0 right-4 mt-0 mb-4 sm:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-black z-20"
          >
            X
          </button>
        </li>

        <li className="mt-2 sm:mt-0">
          <Link to={""}>Home</Link>
        </li>
        <li className="mt-2 sm:mt-0">
          <Link to={"restaurants"}>Restaurants</Link>
        </li>
        <li className="mt-2 sm:mt-0">
          <Link to={"cart"}>Cart</Link>
        </li>
        <li className="mt-2 sm:mt-0">
          <Link to={"about"}>About</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
