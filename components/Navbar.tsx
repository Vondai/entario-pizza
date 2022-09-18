import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addUser, resetUser } from "../redux/authSlice";
import { RootState } from "../redux/store";
import loadUserData from "../services/loadUserData";
import styles from "../styles/Navbar.module.css";
import { TCartProduct } from "../types/TCartProduct";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const userState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const quantity: number = useSelector((state: any) => state.cart.itemQuantity);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(quantity);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleSignout = () => {
    localStorage.removeItem("user");
    dispatch(resetUser());
    router.push("/");
  };

  const handleSignin = () => {
    setIsAuthModalVisible(true);
  };

  useEffect(() => {
    const userData = loadUserData();
    if (userData) {
      dispatch(addUser(userData));
    }
    const cartAsString = localStorage.getItem("cart");
    if (cartAsString) {
      const cart: TCartProduct[] = JSON.parse(cartAsString);
      setLoading(false);
      setCartQuantity(cart.length);
      setCartTotalPrice(
        cart.reduce((acc, curr) => (acc += curr.totalPrice), 0)
      );
    } else {
      setCartQuantity(quantity);
    }
  }, [dispatch, quantity]);

  return (
    <div className="navbar justify-between sticky top-0 z-10 bg-primary px-10 max-h-20 text-white text-lg">
      <div className="hover:scale-105 transition-all">
        <Link href={"/"} passHref>
          <a>
            <Image
              className={styles.logo}
              src={"/img/logo.png"}
              alt="logo"
              height="130px"
              width="130px"
              objectFit="contain"
            />
          </a>
        </Link>
      </div>
      <div className="bg-secondary p-2 rounded text-lg flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z" />
        </svg>
        <Link href={"tel:123-456-7890"} passHref>
          123-456-7890
        </Link>
      </div>
      <ul tabIndex={0} className="menu flex-row gap-10">
        <li>
          <Link href={"/menu"}>Our Pizzas</Link>
        </li>
        <li>
          <Link href={"/about"}>About us</Link>
        </li>
        <li>
          {userState.isAuthenticated ? (
            <Link href={"/orders"}>Orders</Link>
          ) : (
            <button onClick={handleSignin}>Track your order</button>
          )}
        </li>
        <li>
          {userState.isAuthenticated ? (
            <button onClick={() => handleSignout()}>Sign out</button>
          ) : (
            ""
          )}
        </li>
      </ul>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {loading || cartQuantity === 0 ? (
                ""
              ) : (
                <span className="badge badge-sm indicator-item">
                  {cartQuantity}
                </span>
              )}
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg text-primary">
                {cartQuantity === 0
                  ? "No items in cart"
                  : `${cartQuantity} items`}
              </span>
              {cartQuantity !== 0 ? (
                <span className="text-accent text-base">
                  Subtotal: ${cartTotalPrice.toFixed(2)}
                </span>
              ) : (
                ""
              )}
              <div className="card-actions">
                <Link href="/cart">
                  <button className="btn btn-primary btn-block text-white">
                    View cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AuthModal
        isAuthModalVisible={isAuthModalVisible}
        setIsAuthModalVisible={setIsAuthModalVisible}
      />
    </div>
  );
};

export default Navbar;
