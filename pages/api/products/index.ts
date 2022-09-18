import type { NextApiRequest, NextApiResponse } from "next";
import Product, { IProduct } from "../../../models/Product";
import dbConnect from "../../../utils/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { method } = req;
  if (method === "GET") {
    try {
      const products = await Product.find<IProduct>()
        .sort({ name: 1 })
        .select({ name: 1, description: 1, prices: 1, imgUrl: 1 });

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "POST") {
    try {
      const product = await Product.create<IProduct>(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
