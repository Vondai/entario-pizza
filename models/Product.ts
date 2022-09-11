import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 60
		},
		description: {
			type: String,
			required: true,
			maxlength: 100
		},
		imgUrl: {
			type: String,
			required: false,
			default: '/img/pizza.png'
		},
		prices: {
			type: [Number],
			required: true
		},
		extraOptions: {
			type: [
				{
					text: { type: String, required: true },
					price: { type: Number, required: true }
				}
			]
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Product ||
	mongoose.model('Product', ProductSchema);
