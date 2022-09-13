import axios from 'axios';
import { useRouter } from 'next/router';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import authService from '../services/authService';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';

const AuthModal: React.FC<{
	isAuthModalVisible: boolean;
	setIsAuthModalVisible: Dispatch<SetStateAction<boolean>>;
}> = ({ isAuthModalVisible, setIsAuthModalVisible }) => {
	const [showSignupForm, setShowSignupForm] = useState(false);
	const router = useRouter();

	const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formId = e.currentTarget.id;
		const email: string = e.currentTarget['email'].value;
		const password: string = e.currentTarget['password'].value;
		const repeatPassword: string = e.currentTarget['repeat-password']?.value;
		if (!email || !password) {
			return;
		}
		if (formId === 'signup' && !repeatPassword) {
			return;
		}
		if (formId === 'signup') {
			const data = await authService.createUser(
				email,
				password,
				repeatPassword
			);
			if (data.errorMessage) {
				console.log(data.errorMessage);
				return;
			}
			setShowSignupForm(false);
		}
		if (formId === 'signin') {
			const data = await authService.signInUser(email, password);
			if (data.errorMessage) {
				console.log(data.errorMessage);
				return;
			}
			setIsAuthModalVisible(false);
			router.push('/orders');
		}
	};

	return (
		<>
			<input
				type='checkbox'
				className='modal-toggle'
				checked={isAuthModalVisible}
				readOnly={true}
			/>
			<div className='modal  text-accent-content'>
				<div className='modal-box relative bg-accent'>
					<label
						onClick={() => setIsAuthModalVisible(!isAuthModalVisible)}
						className='btn btn-sm btn-circle absolute right-2 top-2'
					>
						✕
					</label>
					{showSignupForm ? (
						<SignupForm
							setShowSignupForm={setShowSignupForm}
							handleSubmitForm={handleSubmitForm}
						/>
					) : (
						<SigninForm
							setShowSignupForm={setShowSignupForm}
							handleSubmitForm={handleSubmitForm}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default AuthModal;
