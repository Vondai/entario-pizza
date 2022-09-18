import { Dispatch, FormEvent, SetStateAction } from "react";

const SigninForm: React.FC<{
  setShowSignupForm: Dispatch<SetStateAction<boolean>>;
  handleSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
}> = ({ setShowSignupForm, handleSubmitForm }) => {
  return (
    <div className="container">
      <h2 className="text-2xl font-bold text-center mb-4">Please Login</h2>
      <form
        id="signin"
        method="POST"
        className="form-control flex flex-col gap-10"
        onSubmit={(e) => handleSubmitForm(e)}
      >
        <label className="input-group cursor-pointer">
          <span className="w-1/4">Email</span>
          <input
            name="email"
            type="email"
            placeholder="info@site.com"
            className="input input-bordered w-1/2"
          />
        </label>
        <label className="input-group cursor-pointer">
          <span className="w-1/4">Password</span>
          <input
            name="password"
            type="password"
            placeholder="xxxxxxxxxx"
            className="input input-bordered w-1/2"
          />
        </label>
        <span>
          Don`t have account yet? Sign up{" "}
          <span
            className="cursor-pointer underline"
            onClick={() => setShowSignupForm(true)}
          >
            now!
          </span>
        </span>
        <div
          className="alert alert-warning shadow-lg w-2/3 h-6 absolute bottom-20"
          style={{ display: "none" }}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>Warning: Invalid email address!</span>
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default SigninForm;
