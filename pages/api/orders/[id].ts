import type { NextApiRequest, NextApiResponse } from 'next';
import Order from '../../../models/Order';
import dbConnect from '../../../utils/mongo';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	dbConnect();

	const {
		method,
		query: { id }
	} = req;
	if (method === 'GET') {
		try {
			const order = await Order.findById(id);
			res.status(200).json(order);
		} catch (error) {
			res.status(500).json(error);
		}
	}
	if (method === 'POST') {
		try {
			const product: typeof Order = await Order.create(req.body);
			res.status(201).json(product);
		} catch (error) {
			res.status(500).json(error);
		}
	}
}
