import mongoose from 'mongoose';
import Status from '../utils/enums/status';

const OrderSchema = new mongoose.Schema(
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
export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
