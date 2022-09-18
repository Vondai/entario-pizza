import { TBaseProduct } from "./TBaseProduct";

export interface TPizzaProduct extends TBaseProduct {
  extraOptions?: [
    {
      text: string;
      price: string;
      _id: string;
    }
  ];
}
