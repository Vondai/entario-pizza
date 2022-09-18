import ProductCard from "./ProductCard";
import styles from "../styles/ProductList.module.css";
import { TBaseProduct } from "../types/TBaseProduct";
import { NextPage } from "next";
const ProductList: NextPage<{ productList: TBaseProduct[] }> = ({
  productList,
}) => {
  return (
    <div className="bg-accent flex flex-col justify-center items-center gap-4 py-4">
      <h1 className="text-3xl font-bold text-primary">
        Freshly baked pizza every 5 minutes.
      </h1>
      <h3 className=" text-2xl text-center max-w-screen-md">
        Welcome to Entario`s online pizza shop. Here you will find the best
        pizza in town, freshly wood oven baked. Check out our menu below and let
        the journey begin.
      </h3>
      <div className="container flex gap-5">
        {productList.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
