import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import RestaurantsListPage from "./pages/RestaurantsListPage";
import RestaurantsDetailsPage from "./pages/RestaurantsDetailsPage";
import Navbar from "./components/Navbar";
import AboutPage from "./pages/AboutPage";
import { RecoilRoot } from "recoil";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentCanceled from "./components/paymentCanceled";

function App() {
  return (
    <>
      <RecoilRoot>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/restaurants" element={<RestaurantsListPage />} />
          <Route path="/restaurant/:id" element={<RestaurantsDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/canceled" element={<PaymentCanceled />} />
        </Routes>
      </RecoilRoot>
    </>
  );
}

export default App;
