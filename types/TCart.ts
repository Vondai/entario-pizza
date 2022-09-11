import { TCartProduct } from './TCartProduct';

export type TCart = {
	products: TCartProduct[];
	itemQuantity: number;
	totalPrice: number;
};
