import Link from 'next/link';
import styles from '../styles/Footer.module.css';

const Footer = () => {
	return (
		<footer className='footer'>
			<div className={styles.container}>
				<div className={styles['cta-wrapper']}>
					<ul className={styles['cta-list']}>
						<li className={styles['cta-item']}>
							<Link href={'/'}>Our Pizzas</Link>
						</li>
						<li className={styles['cta-item']}>
							<Link href={'/'}>Locations</Link>
						</li>
						<li className={styles['cta-item']}>
							<Link href={'/'}>Contacts</Link>
						</li>
						<li className={styles['cta-item']}>
							<Link href={'/'}>About</Link>
						</li>
					</ul>
				</div>
				<div className={styles['socials-wrapper']}>
					<ul className={styles['socials-list']}>
						<li className={styles['social-item']}>
							<Link href={'/'}>Facebook</Link>
						</li>
						<li className={styles['social-item']}>
							<Link href={'/'}>Twitter</Link>
						</li>
						<li className={styles['social-item']}>
							<Link href={'/'}>Youtube</Link>
						</li>
						<li className={styles['social-item']}>
							<Link href={'/'}>Github</Link>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
