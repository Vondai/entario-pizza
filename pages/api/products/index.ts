import type { NextApiRequest, NextApiResponse } from 'next';
import Product from '../../../models/Product';
import dbConnect from '../../../utils/mongo';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	dbConnect();

	const { method } = req;
	if (method === 'GET') {
		try {
			const products = await Product.find();
			res.status(200).json(products);
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
