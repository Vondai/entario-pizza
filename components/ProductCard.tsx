import { NextPage } from "next";
import Image from "next/image";
import { TBaseProduct } from "../types/TBaseProduct";
import Link from "next/link";

const ProductCard: NextPage<{ product: TBaseProduct }> = ({ product }) => {
  return (
    <Link href={`/product/${product._id}`}>
      <div className="card bg-primary shadow-xl w-1/3 cursor-pointer  hover:scale-105 ">
        <div className="card-body flex flex-col text-center">
          <h2 className="card-title justify-center text-accent text-3xl">
            {product.name}
          </h2>
          <p className="text-base-200 text-xl">{product.description}</p>
          <span className="text-accent">
            Starting from{" "}
            <span className="text-base-200 font-bold">
              ${product.prices[0].toFixed(2)}
            </span>
          </span>
          <figure className="w-full">
            <Image
              src={product.imgUrl}
              alt={product.name}
              width="100%"
              height="100%"
            />
          </figure>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
