import React, {
	Dispatch,
	FormEvent,
	SetStateAction,
	useRef,
	useState
} from 'react';

const SignupForm: React.FC<{
	setShowSignupForm: Dispatch<SetStateAction<boolean>>;
	handleSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
}> = ({ setShowSignupForm, handleSubmitForm }) => {
	const passwordRef = useRef<HTMLInputElement>(null);
	const [error, setError] = useState('');
	const [showError, setShowError] = useState('none');
	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		switch (e.target.name) {
			case 'email':
				if (!e.target.value.includes('@')) {
					setError('Invalid email address');
					setShowError('flex');
					return;
				}
				setError('');
				setShowError('none');
				break;
			case 'password':
				if (e.target.value.length < 6) {
					setError('Password must be atleast 6 characters.');
					setShowError('flex');
					return;
				}
				setError('');
				setShowError('none');
				break;
			case 'repeat-password':
				if (!e.target.value || e.target.value !== passwordRef.current!.value) {
					setError('Passwords do not match.');
					setShowError('flex');
					return;
				}
				setError('');
				setShowError('none');
				break;
		}
	};
	return (
		<div className='container'>
			<h2 className='text-2xl font-bold text-center mb-4'>Please Sign up</h2>
			<form
				id='signup'
				method='POST'
				className='form-control flex flex-col gap-10'
				onSubmit={(e) => handleSubmitForm(e)}
			>
				<label className='input-group cursor-pointer relative'>
					<span className='w-1/4'>Email</span>
					<input
						onBlur={(e) => handleBlur(e)}
						name='email'
						type='email'
						placeholder='info@site.com'
						className='input input-bordered w-1/2'
					/>
				</label>
				<label className='input-group cursor-pointer'>
					<span className='w-1/4'>Password</span>
					<input
						onBlur={(e) => handleBlur(e)}
						ref={passwordRef}
						name='password'
						type='password'
						placeholder='xxxxxxxxxx'
						className='input input-bordered w-1/2'
					/>
				</label>
				<label className='input-group cursor-pointer'>
					<span className='w-1/4 leading-5'>Repeat password</span>
					<input
						onBlur={(e) => handleBlur(e)}
						name='repeat-password'
						type='password'
						placeholder='xxxxxxxxxx'
						className='input input-bordered w-1/2'
					/>
				</label>
				<span>
					Have an account? Sign in{' '}
					<span
						className='cursor-pointer underline'
						onClick={() => setShowSignupForm(false)}
					>
						now!
					</span>
				</span>
				<div
					className='alert alert-warning shadow-lg w-max h-6 absolute bottom-20'
					style={{ display: showError }}
				>
					<div>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='stroke-current flex-shrink-0 h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
							/>
						</svg>
						<span>{error}</span>
					</div>
				</div>
				<button
					className='btn btn-primary'
					type='submit'
				>
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default SignupForm;
