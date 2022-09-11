import { NextPage } from 'next';
import Image from 'next/image';
import { TProduct } from '../types/TBaseProduct';
import styles from '../styles/ProductCard.module.css';
import Link from 'next/link';

const ProductCard: NextPage<{ product: TProduct }> = ({ product }) => {
	return (
		<Link href={`/product/${product._id}`}>
			<div className={styles.container}>
				<div className={styles['img-container']}>
					<Image
						src={product.imgUrl}
						alt={product.name}
						layout='fill'
						objectFit='contain'
					/>
				</div>
				<h2 className={styles.title}>{product.name}</h2>
				<span className={styles.price}>${product.prices[0].toFixed(2)}</span>
				<p className={styles.description}>{product.description}</p>
			</div>
		</Link>
	);
};

export default ProductCard;
