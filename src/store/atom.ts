import { atom } from "recoil";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Cart {
  restaurantName: string;
  restaurantAddress: string;
  restaurantImage: string;
  products: Product[];
}

export const cartState = atom<Cart>({
  key: "cartState",
  default: {
    restaurantName: "",
    restaurantAddress: "",
    restaurantImage: "",
    products: [],
  },
});
