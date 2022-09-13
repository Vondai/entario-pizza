import { model, models, Schema } from 'mongoose';
import { IOrder } from './Order';

export interface IUser {
	_id: string;
	email: string;
	password: string;
	orders: IOrder[];
}

const UserSchema = new Schema<IUser>({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	orders: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Order'
		}
	]
});

export default models.User || model('User', UserSchema);
