import Image from 'next/image';
import styles from '../styles/Cart.module.css';
import { TCartProduct } from '../types/TCartProduct';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Cart = () => {
	const [cart, setCart] = useState<TCartProduct[]>([]);
	const cartTotalPrice = cart.reduce(
		(acc, curr) => (acc += curr.totalPrice),
		0
	);

	const router = useRouter();

	function handleCheckoutClick() {
		router.push('/checkout');
	}

	useEffect(() => {
		const products: TCartProduct[] = JSON.parse(
			localStorage.getItem('cart') || '[]'
		);
		setCart(products);
	}, []);

	return (
		<div className='flex h-screen p-16 bg-accent text-xl text-white'>
			<div className={styles.left}>
				<table className={styles.table}>
					<thead>
						<tr className={styles.tr}>
							<th>Product</th>
							<th>Name</th>
							<th>Extras</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody className={styles['table-body']}>
						{cart.map((product) => (
							<Link
								href={`/product/${product._id}`}
								passHref
								key={product.cartId}
							>
								<tr className={styles['cart-product-link']}>
									<td>
										<div className={styles['img-container']}>
											<Image
												src={product.imgUrl}
												alt={product.name}
												layout='fill'
												objectFit='cover'
											/>
										</div>
									</td>
									<td>
										<span className='text-primary font-bold'>
											{product.name}
										</span>
									</td>
									<td>
										<span className={styles.extras}>
											{product.extras.join(', ')}
										</span>
									</td>
									<td>
										<span className={styles.price}>
											${product.price.toFixed(2)}
										</span>
									</td>
									<td>
										<span className={styles.quantity}>{product.quantity}</span>
									</td>
									<td>
										<span className={styles.total}>
											${product.totalPrice.toFixed(2)}
										</span>
									</td>
								</tr>
							</Link>
						))}
					</tbody>
				</table>
			</div>
			<div className={styles.right}>
				<div className={styles.wrapper}>
					<h2 className={styles['cart-total']}>CART TOTAL:</h2>
					<div className={styles.subTotalText}>
						<span className={styles.subTotalText}>
							Subtotal: <span>${cartTotalPrice.toFixed(2)}</span>
						</span>
					</div>
					<div className={styles.discountText}>
						<span className={styles.discountText}>
							Discount: <span>$0.00</span>
						</span>
					</div>
					<div className={styles.totalText}>
						<span className={styles.totalTextTitle}>
							Total: <span>${cartTotalPrice.toFixed(2)}</span>
						</span>
					</div>
					<button
						className='btn'
						onClick={handleCheckoutClick}
					>
						CHECKOUT NOW
					</button>
				</div>
			</div>
		</div>
	);
};

export default Cart;
