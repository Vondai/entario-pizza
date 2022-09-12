import { model, models, Schema } from 'mongoose';
import Status from '../utils/enums/status';

export interface IOrder {
	_id: string;
	customer: string;
	address: string;
	total: number;
	status: number;
	paymentMethod: number;
	phone: number;
}

const OrderSchema = new Schema<IOrder>(
	{
		customer: {
			type: String,
			required: true,
			maxlength: 60
		},
		address: {
			type: String,
			required: true,
			maxlength: 100
		},
		total: {
			type: Number,
			required: true
		},
		status: {
			type: Number,
			default: Status.done
		},
		paymentMethod: {
			type: Number,
			required: true
		},
		phone: {
			type: Number,
			required: true
		}
	},
	{ timestamps: true }
);
export default models.Order || model('Order', OrderSchema);
