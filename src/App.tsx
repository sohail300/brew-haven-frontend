import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import RestaurantsListPage from "./pages/RestaurantsListPage";
import RestaurantsDetailsPage from "./pages/RestaurantsDetailsPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/restaurants" element={<RestaurantsListPage />} />
        <Route path="/restaurant/:id" element={<RestaurantsDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
