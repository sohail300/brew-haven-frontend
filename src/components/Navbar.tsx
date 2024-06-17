import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="font-heading flex justify-between items-center px-20 py-4 shadow-md">
        <div className="font-black text-3xl  text-lagoonBlue">Brew Haven</div>

        <ul className="font-bold flex flex-row w-2/5 justify-between items-center text-lg text-lagoonBlue">
          <li>
            <Link to={""}>Home</Link>
          </li>
          <li>
            <Link to={"restaurants"}>Restaurants</Link>
          </li>
          <li>
            <Link to={"cart"}>Cart</Link>
          </li>
          <li>
            <Link to={"about"}>About</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
