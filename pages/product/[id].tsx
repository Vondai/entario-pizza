import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { TPizzaProduct } from '../../types/TPizzaProduct';
import { useDispatch } from 'react-redux/';
import { addProduct } from '../../redux/cartSlice';
import styles from '../../styles/Product.module.css';
import { TCartProduct } from '../../types/TCartProduct';

const Product: NextPage<{ product: TPizzaProduct }> = ({ product }) => {
	let [size, setSize] = useState<number>(0);
	let [extras, setExtras] = useState<string[]>([]);
	let [price, setPrice] = useState(product.prices[size]);
	let [totalPrice, setTotalPrice] = useState(product.prices[size]);
	let [quantity, setQuantity] = useState(1);
	const dispatch = useDispatch();

	useEffect(() => {
		setTotalPrice(price * quantity);
	}, [quantity, price]);

	function handleSizeChange(index: number) {
		setPrice(
			(prevPrice) => prevPrice + (product.prices[index] - product.prices[size])
		);
		setSize(index);
	}

	function handleOptionChange(e: React.ChangeEvent<HTMLInputElement>) {
		const checked = e.target.checked;
		const optionPrice = e.target.value;
		const optionName = e.target.name;
		if (checked) {
			setPrice(price + Number(optionPrice));
			setExtras((prevExtras) => [...prevExtras, optionName]);
		} else {
			setPrice(price - Number(optionPrice));
			setExtras(extras.filter((option) => option !== optionName));
		}
	}

	function handleAddToCart() {
		const productPayload = {
			_id: product._id,
			cartId: `${product._id}-${Math.floor(
				Math.random() * (Math.floor(1) - Math.ceil(10000) + 1) + Math.ceil(1000)
			)}`,
			name: product.name,
			description: product.description,
			imgUrl: product.imgUrl,
			extras: extras,
			quantity: quantity,
			totalPrice: totalPrice,
			price: price
		};
		const cartString = localStorage.getItem('cart');
		if (cartString === null) {
			localStorage.setItem('cart', JSON.stringify([productPayload]));
		} else {
			let cart: TCartProduct[] = JSON.parse(cartString);
			cart = [...cart, productPayload];
			localStorage.setItem('cart', JSON.stringify(cart));
		}
		dispatch(addProduct(productPayload));
	}

	return (
		<div className='flex p-10 content-center bg-accent'>
			<div className={styles.left}>
				<div className={styles['img-container']}>
					<Image
						src={product.imgUrl}
						alt={product.name}
						layout='fill'
						objectFit='contain'
					/>
				</div>
			</div>
			<div className={styles.right}>
				<h2 className='text-3xl font-bold'>{product.name}</h2>
				<span className='underline text-3xl text-primary mb-5'>
					${totalPrice.toFixed(2)}
				</span>
				<p className='italic text-xl mb-5'>{product.description}</p>
				<h3>Select size</h3>
				<div className={styles.sizes}>
					<div
						className={styles.size}
						onClick={() => handleSizeChange(0)}
					>
						<Image
							src={'/img/size.png'}
							alt='size'
							layout='fill'
						/>
						<span className={styles['size-number']}>Small</span>
					</div>
					<div
						className={styles.size}
						onClick={() => handleSizeChange(1)}
					>
						<Image
							src={'/img/size.png'}
							alt='size'
							layout='fill'
						/>
						<span className={styles['size-number']}>Medium</span>
					</div>
					<div
						className={styles.size}
						onClick={() => handleSizeChange(2)}
					>
						<Image
							src={'/img/size.png'}
							alt='size'
							layout='fill'
						/>
						<span className={styles['size-number']}>Large</span>
					</div>
				</div>
				<h3 className={styles.options}>Anything extra?</h3>
				<div className={styles.ingridients}>
					{product.extraOptions?.map((extaOption) => (
						<div
							className={styles.option}
							key={extaOption._id}
						>
							<input
								id={extaOption._id}
								className={styles.checkbox}
								type='checkbox'
								name={extaOption.text}
								value={extaOption.price}
								onChange={(e) => handleOptionChange(e)}
							/>
							<label htmlFor={extaOption._id}>
								{extaOption.text} ({extaOption.price})
							</label>
						</div>
					))}
				</div>
				<div className={styles.add}>
					<input
						type='number'
						defaultValue={1}
						min={1}
						max={5}
						className={styles.quantity}
						onChange={(e) => setQuantity(Number(e.target.value))}
					/>
					<button
						className='btn ml-5 bg-primary'
						onClick={handleAddToCart}
					>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default Product;
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const productId = params?.id;
	const res = await axios.get(
		`${process.env.NEXT_PUBLIC_BASE_URL}/product/${productId}`
	);
	return {
		props: {
			product: res.data
		}
	};
};
