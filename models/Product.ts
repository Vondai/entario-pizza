import { model, models, Schema } from "mongoose";

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  imgUrl?: string;
  prices: [number];
  extraOptions: [
    {
      text: string;
      price: string;
    }
  ];
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      maxlength: 60,
    },
    description: {
      type: String,
      required: true,
      maxlength: 100,
    },
    imgUrl: {
      type: String,
      required: false,
      default: "/img/pizza.png",
    },
    prices: {
      type: [Number],
      required: true,
    },
    extraOptions: {
      type: [
        {
          text: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
  },
  { timestamps: true }
);

export default models.Product || model<IProduct>("Product", ProductSchema);
