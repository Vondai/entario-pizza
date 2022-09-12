import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/Navbar.module.css';
import { TCartProduct } from '../types/TCartProduct';
const Navbar = () => {
	const quantity: number = useSelector((state: any) => state.cart.itemQuantity);

	const [cartQuantity, setCartQuantity] = useState(quantity);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const cartAsString = localStorage.getItem('cart');

		if (cartAsString) {
			const cart: TCartProduct[] = JSON.parse(cartAsString);
			setLoading(false);
			setCartQuantity(cart.length);
		} else {
			setCartQuantity(quantity);
		}
	}, [quantity]);

	return (
		<header className={styles.header}>
			<nav>
				<div className={styles['nav-container']}>
					<div className={styles.title}>
						<Link
							href={'/'}
							passHref
						>
							<a>
								<Image
									className={styles.logo}
									src={'/img/logo.png'}
									alt='logo'
									height='130px'
									width='130px'
									objectFit='contain'
								/>
							</a>
						</Link>
					</div>
					<ul className={styles['nav-items-list']}>
						<li className={styles['nav-item-order']}>
							<Link
								href={'tel:123-456-7890'}
								passHref
							>
								123-456-7890
							</Link>
							<a>
								<Image
									src={'/img/telephone-icon.png'}
									alt={'contact-icon'}
									width={'16px'}
									height={'16px'}
								/>
							</a>
						</li>
						<li className={styles.menu}>
							<Link href={'/menu'}>Our Pizzas</Link>
						</li>
						<li className={styles.menu}>
							<Link href={'/about'}>About us</Link>
						</li>
						<li className={styles['nav-item-cart']}>
							<Link
								href={'/cart'}
								passHref
							>
								<a>
									<Image
										src={'/img/cart.png'}
										alt='cart'
										width={'30px'}
										height={'30px'}
									></Image>
								</a>
							</Link>
							{loading || cartQuantity === 0 ? (
								''
							) : (
								<span className={styles['cart-counter']}>{cartQuantity}</span>
							)}
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
