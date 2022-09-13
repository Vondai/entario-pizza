import axios from 'axios';

interface IAuthService {
	createUser: (email: string, password: string, repeatPassword: string) => any;
	signInUser: (email: string, password: string) => any;
	//signOutUser: () => void;
}

const authService: IAuthService = {
	createUser: async (
		email: string,
		password: string,
		repeatPassword: string
	) => {
		try {
			const user = {
				email,
				password,
				repeatPassword
			};
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/auth`,
				user
			);
			console.log('we are in try');

			console.log(res.data);

			return res;
		} catch (error: any) {
			return error.response.data;
		}
	},
	signInUser: async (email: string, password: string) => {
		try {
			const user = {
				email,
				password
			};
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/auth`,
				user
			);
			const { _id } = res.data.data;
			localStorage.setItem('user', JSON.stringify({ email, _id }));
			return res.data;
		} catch (error: any) {
			return error.response.data;
		}
	}
};

export default authService;
