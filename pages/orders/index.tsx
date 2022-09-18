import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type TOrder = {
  _id: string;
  user: string;
  customer: string;
  address: string;
  total: number;
  status?: number;
  paymentMethod: number;
  phone: number;
};
const Orders = () => {
  const userState = useSelector((state: RootState) => state.auth);
  const [orders, setOrders] = useState<TOrder[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!userState.isAuthenticated) {
      router.push("/");
      return;
    }
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/orders?userId=${userState._id}`
      );
      setOrders(res.data);
    };
    fetchData();
  }, [router, userState]);

  const noOrders = orders.length === 0;

  if (noOrders) {
    return (
      <div className="h-screen flex">
        <h2 className="text-3xl m-auto">
          No orders yet. Check out our{" "}
          <Link href={"/menu"}>
            <span className="cursor-pointer underline">menu.</span>
          </Link>
        </h2>
      </div>
    );
  }
  return (
    <div className="bg-accent h-screen p-5">
      <h2 className="text-center text-2xl font-bold">Your orders</h2>
      <div className="overflow-x-auto pt-7">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <Link key={order._id} href={`/orders/${order._id}`} passHref>
                <tr className="hover cursor-pointer bg-secondary">
                  <td>{order._id}</td>
                  <td>{order.customer}</td>
                  <td>{order.phone}</td>
                  <td>{order.total}</td>
                  <td>{order.paymentMethod ? "Card" : "Cash"}</td>
                  <td>{order.status}</td>
                </tr>
              </Link>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
