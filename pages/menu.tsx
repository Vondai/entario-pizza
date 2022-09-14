import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import ProductCard from '../components/ProductCard';
import { TBaseProduct } from '../types/TBaseProduct';

const Menu: NextPage<{ productList: TBaseProduct[] }> = ({ productList }) => {
	return (
		<div className='h-screen bg-accent flex flex-col text-center p-10'>
			<div className=''>
				<h1 className='text-3xl underline'>Menu</h1>
			</div>
			<div className='flex gap-5 mt-10'>
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

export default Menu;
export const getServerSideProps: GetServerSideProps = async () => {
	const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/products`);
	return {
		props: {
			productList: res.data
		}
	};
};
