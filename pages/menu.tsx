import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import ProductCard from '../components/ProductCard';
import styles from '../styles/Menu.module.css';
import { TBaseProduct } from '../types/TBaseProduct';

const Menu: NextPage<{ productList: TBaseProduct[] }> = ({ productList }) => {
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<h1>Menu</h1>
			</div>
			{productList.map((product) => (
				<ProductCard
					key={product._id}
					product={product}
				/>
			))}
		</div>
	);
};

export default Menu;
export const getServerSideProps: GetServerSideProps = async () => {
	const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/products`);
	return {
		props: {
			productList: res.data
		}
	};
};
