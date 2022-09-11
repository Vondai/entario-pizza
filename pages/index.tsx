import type { GetServerSideProps, NextPage } from 'next';
import axios from 'axios';
import Head from 'next/head';
import Featured from '../components/Featured';
import ProductList from '../components/ProductList';
import { TBaseProduct } from '../types/TBaseProduct';

const Home: NextPage<{ productList: TBaseProduct[] }> = ({ productList }) => {
	return (
		<>
			<Head>
				<title>Entario Pizza Home</title>
				<meta
					name='description'
					content='Always freshly baked pizza.'
				/>
				<link
					rel='icon'
					href='/favicon.ico'
				/>
			</Head>
			<Featured />
			<ProductList productList={productList} />
		</>
	);
};
export default Home;
export const getServerSideProps: GetServerSideProps = async () => {
	const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/products`);
	return {
		props: {
			productList: res.data
		}
	};
};
