import type { NextApiRequest, NextApiResponse } from "next";
import Order, { IOrder } from "../../../models/Order";
import dbConnect from "../../../utils/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { method, query } = req;

  if (method === "GET") {
    try {
      const orders = await Order.find<IOrder>({ user: query.userId });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "POST") {
    try {
      const order: IOrder = await Order.create<IOrder>(req.body);

      res.status(201).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
