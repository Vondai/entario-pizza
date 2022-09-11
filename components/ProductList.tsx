import ProductCard from './ProductCard';
import styles from '../styles/ProductList.module.css';
import { TBaseProduct } from '../types/TBaseProduct';
import { NextPage } from 'next';
const ProductList: NextPage<{ productList: TBaseProduct[] }> = ({
	productList
}) => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Freshly baked pizza every 5 minutes.</h1>
			<p className={styles.description}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt error,
				excepturi natus placeat sed maxime quibusdam nam enim! Reiciendis,
				labore?
			</p>
			<div className={styles['product-wrapper']}>
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
