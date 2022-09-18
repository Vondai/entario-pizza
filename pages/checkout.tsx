import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../styles/Checkout.module.css";
import { TCheckoutProduct } from "../types/TCheckoutProduct";
import type { TOrder } from "../types/TOrder";
import PaymentMethod from "../utils/enums/paymentMethod";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { reset } from "../redux/cartSlice";
import loadUserData from "../services/loadUserData";

const Checkout = () => {
  const [cart, setCart] = useState<TCheckoutProduct[]>([]);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const cartAsString = localStorage.getItem("cart");
    const cart: TCheckoutProduct[] = JSON.parse(cartAsString || "[]");
    setCart(cart);
  }, []);
  const cartTotal = cart.reduce((acc, curr) => (acc += curr.totalPrice), 0);

  async function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const firstName = e.currentTarget["firstName"].value;
    const lastName = e.currentTarget["lastName"].value;
    const paymentMethod = e.currentTarget["paymentOption"].value;
    const user = loadUserData();
    if (!user) {
      router.push("/");
      return;
    }
    const order: TOrder = {
      user: user._id,
      customer: `${firstName} ${lastName}`,
      total: cartTotal,
      address: e.currentTarget["address"].value,
      phone: e.currentTarget["phone"].value,
      paymentMethod:
        paymentMethod == "cash" ? PaymentMethod.cash : PaymentMethod.card,
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/orders`,
        order
      );
      if (res.status === 201) {
        localStorage.removeItem("cart");
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-screen flex flex-col bg-accent items-center gap-8">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <div className="text-2xl">
        <h2 className={styles["cart-title"]}>Cart items</h2>
        <table className={styles.table}>
          <thead className={styles["table-head"]}>
            <tr className={styles.tr}>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className={styles["table-body"]}>
            {cart.map((product) => (
              <tr key={product.cartId} className={styles["cart-product-link"]}>
                <td>
                  <span className={styles.name}>{product.name}</span>
                </td>
                <td>
                  <span className={styles.price}>
                    ${product.price.toFixed(2)}
                  </span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    ${product.totalPrice.toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className={styles.cartTotal}>
          Cart Total: ${cartTotal.toFixed(2)}
        </h3>
      </div>
      <form
        method="post"
        className={styles.form}
        onSubmit={(e) => handleSubmitForm(e)}
      >
        <label htmlFor="first-name">First Name</label>
        <input type="text" id="first-name" name="firstName" />
        <label htmlFor="last-name">Last Name</label>
        <input type="text" id="last-name" name="lastName" />
        <label htmlFor="address">Address</label>
        <input type="text" id="address" name="address" />
        <label htmlFor="phone">Phone Number</label>
        <input type="text" id="phone" name="phone" />
        <label htmlFor="phone">Payment Options</label>
        <select name="paymentOption" id="payment-option">
          <option value="" defaultChecked>
            Choose
          </option>
          <option value="cash">Cash on delivery</option>
        </select>
        <button type="submit" className="btn mt-5">
          Checkout
        </button>
      </form>
    </div>
  );
};

export default Checkout;
