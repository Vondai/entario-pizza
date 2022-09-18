export type TCartProduct = {
  _id: string;
  cartId: string;
  name: string;
  description: string;
  imgUrl: string;
  extras: string[];
  price: number;
  quantity: number;
  totalPrice: number;
};
