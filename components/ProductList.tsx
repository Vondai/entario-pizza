import ProductCard from './ProductCard';
import styles from '../styles/ProductList.module.css';
import { TBaseProduct } from '../types/TBaseProduct';
import { NextPage } from 'next';
const ProductList: NextPage<{ productList: TBaseProduct[] }> = ({
	productList
}) => {
	return (
		<div className='bg-accent flex flex-col justify-center items-center gap-4 py-4'>
			<h1 className='text-3xl font-bold text-primary'>
				Freshly baked pizza every 5 minutes.
			</h1>
			<h3 className=' text-2xl text-center max-w-screen-md'>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt error,
				excepturi natus placeat sed maxime quibusdam nam enim! Reiciendis,
				labore?
			</h3>
			<div className='container'>
				{productList.map((product) => (
					<ProductCard
						key={product._id}
						product={product}
					/>
				))}
			</div>
		</div>
	);
};

export default ProductList;
