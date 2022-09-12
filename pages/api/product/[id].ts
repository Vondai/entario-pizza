import type { NextApiRequest, NextApiResponse } from 'next';
import Product, { IProduct } from '../../../models/Product';
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
			const product = await Product.findById<IProduct>(id).select({
				_id: 1,
				name: 1,
				description: 1,
				prices: 1,
				imgUrl: 1,
				extraOptions: 1
			});
			res.status(200).json(product);
		} catch (error) {
			res.status(500).json(error);
		}
	}
	if (method === 'POST') {
		try {
			const product: typeof Product = await Product.create(req.body);
			res.status(201).json(product);
		} catch (error) {
			res.status(500).json(error);
		}
	}
}
