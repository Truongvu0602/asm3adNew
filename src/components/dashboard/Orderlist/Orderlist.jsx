import axios from "axios";
import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Orderlist = () => {
  const [orderData, setOrderData] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${SERVER_HOST}/admin/orderlist?page=${page}`,
          { withCredentials: true }
        );

        if (response.status === 200) {
          const data = await response.data;
          setOrderData(data);
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page]);

  if (!orderData || loading) {
    return (
      <div className="mt-5">
        <h1 className="text-slate-500 m-2 font-bold">History</h1>
        <table className="table-fixed w-full text-center text-sm">
          <thead>
            <tr className=" bg-slate-200">
              <th className="!py-5">User ID</th>
              <th>Username</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Total</th>
              <th>Delivery</th>
              <th>Status</th>
              <th>Detail</th>
            </tr>
          </thead>
          <div className="!min-w-full my-3">
            <Spinner /> Loading ...
          </div>
        </table>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <h1 className="text-slate-500 m-2 font-bold">History</h1>
      <table className="table-auto w-full text-center text-sm">
        <thead>
          <tr className=" bg-slate-200">
            <th className="!py-5">User ID</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Total</th>
            <th>Delivery</th>
            <th>Status</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody className="text-slate-500">
          {orderData && orderData.orders.length > 0 ? (
            orderData.orders.map((order) => (
              <tr className="hover:bg-slate-100 border-b" key={order._id}>
                <td>{order.user}</td>
                <td>{order.name}</td>
                <td>{order.phone}</td>
                <td>{order.address}</td>
                <td>
                  {new Intl.NumberFormat().format(order.totalPrice, {
                    style: "currency",
                    currency: "VND",
                  })}{" "}
                  VND
                </td>
                <td>{order.paymentStatus}</td>
                <td>{order.status}</td>
                <td className="flex items-center justify-center py-5">
                  <Link to={`/order/${order._id}`}>
                    <Button
                      color="success"
                      className="btn btn-sm btn-primary w-12 h-10"
                    >
                      Detail
                    </Button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pages flex items-center justify-center rounded">
        {[...Array(Math.ceil(orderData.total / 5))].map((_, index) => (
          <button
            className={`${
              page === index + 1 && "font-bold !text-black"
            } !text-slate-500 mt-2 px-2 bg-slate-200`}
            key={index}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Orderlist;
