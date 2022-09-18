import axios from "axios";
import { GetServerSideProps } from "next";
import Image from "next/image";
import styles from "../../styles/Order.module.css";

type TProps = {
  order: {
    _id: "631c82c59eac920f5ba5d38f";
    customer: string;
    address: string;
    phone: number;
    total: number;
  };
};
const Order = ({ order }: TProps) => {
  const status = 0;

  const statusClass = (index: number) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles["in-progress"];
    if (index - status > 1) return styles["not-ready"];
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.order}>
          <div className={styles.row}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tr}>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Address</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className={styles["table-body"]}>
                <tr>
                  <td>
                    <span className={styles.id}>{order._id}</span>
                  </td>
                  <td>
                    <span className={styles.customer}>{order.customer}</span>
                  </td>
                  <td>
                    <span className={styles.address}>{order.address}</span>
                  </td>
                  <td>
                    <span className={styles.total}>
                      ${order.total.toFixed(2)}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.row}>
            <div className={statusClass(0)}>
              <div className={styles["status-img-container"]}>
                <Image
                  src={"/img/paid.png"}
                  alt="paid"
                  width="100%"
                  height="100%"
                  objectFit="contain"
                />
              </div>
              <span>Payment</span>
              <div className={styles["checked-icon"]}>
                <div className={styles["checked-img-container"]}>
                  <Image
                    src={"/img/checked.png"}
                    alt="checked"
                    width="100%"
                    height="100%"
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
            <div className={statusClass(1)}>
              <div className={styles["status-img-container"]}>
                <Image
                  src={"/img/bake.png"}
                  alt="paid"
                  width="100%"
                  height="100%"
                  objectFit="contain"
                />
              </div>
              <span>Preparing</span>
              <div className={styles["checked-icon"]}>
                <div className={styles["checked-img-container"]}>
                  <Image
                    src={"/img/checked.png"}
                    alt="checked"
                    width="100%"
                    height="100%"
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
            <div className={statusClass(2)}>
              <div className={styles["status-img-container"]}>
                <Image
                  src={"/img/bike.png"}
                  alt="paid"
                  width="100%"
                  height="100%"
                  objectFit="contain"
                />
              </div>
              <span>On the way</span>
              <div className={styles["checked-icon"]}>
                <div className={styles["checked-img-container"]}>
                  <Image
                    src={"/img/checked.png"}
                    alt="checked"
                    width="100%"
                    height="100%"
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
            <div className={statusClass(3)}>
              <div className={styles["status-img-container"]}>
                <Image
                  src={"/img/delivered.png"}
                  alt="paid"
                  width="100%"
                  height="100%"
                  objectFit="contain"
                />
              </div>
              <span>Delivered</span>
              <div className={styles["checked-icon"]}>
                <div className={styles["checked-img-container"]}>
                  <Image
                    src={"/img/checked.png"}
                    alt="checked"
                    width="100%"
                    height="100%"
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles["cart-total"]}>CART TOTAL:</h2>
          <div className={styles.subTotalText}>
            <span className={styles.subTotalText}>
              Subtotal: <span>${order.total.toFixed(2)}</span>
            </span>
          </div>
          <div className={styles.discountText}>
            <span className={styles.discountText}>
              Discount: <span>$0.00</span>
            </span>
          </div>
          <div className={styles.totalText}>
            <span className={styles.totalTextTitle}>
              Total: <span>${order.total.toFixed(2)}</span>
            </span>
          </div>
          <button disabled className={styles.cta}>
            PAID
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
// 631c82c59eac920f5ba5d38f
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const orderId = params?.id;
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/orders/${orderId}`
  );
  return {
    props: {
      order: res.data,
    },
  };
};
