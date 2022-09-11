import { createSlice } from '@reduxjs/toolkit';
import { TCart } from '../types/TCart';
import { TCartProduct } from '../types/TCartProduct';

const initialState: TCart = {
	products: new Array<TCartProduct>(),
	itemQuantity: 0,
	totalPrice: 0
};
const cartSlice = createSlice({
	name: 'cart',
	initialState: initialState,
	reducers: {
		addProduct: (state, action) => {
			state.itemQuantity += 1;
			state.products.push(action.payload);
			state.totalPrice += action.payload.totalPrice;
		},
		reset: (state = initialState) => {
			state.itemQuantity = 0;
			state.products = [];
			state.totalPrice = 0;
		}
	}
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
