import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className=" h-[75vh] flex justify-center items-center flex-col">
      <img src="./HomeDesignMobile.jpg" alt="" className=" sm:hidden" />
      <img src="./HomeDesign.jpg" alt="" className=" hidden sm:block" />
      <div className="flex justify-center mt-4 sm:mt-0">
        <Link to={"restaurants"}>
          <button className="bg-lagoonBlue text-white py-2 px-6 rounded-lg shadow-lg hover:bg-white hover:border hover:border-lagoonBlue  hover:text-lagoonBlue transition-colors duration-300">
            Explore
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
