import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import store from '../redux/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Layout>
				<main>
					<Component {...pageProps} />
				</main>
			</Layout>
		</Provider>
	);
}

export default MyApp;
