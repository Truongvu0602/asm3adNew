import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetail = () => {
  const [order, setOrder] = useState(null);

  const params = useParams();
  const orderId = params.id;

  const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `${SERVER_HOST}admin/orders/${orderId}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          const data = await response.data;
          setOrder(data.order);
        }
      } catch (error) {
        console.log(error);
        if(error.response && error.response.status === 401) {
          window.location.reload();
        }
      }
    };
    fetchOrder();
  }, [orderId]);

  return (
    <div className="w-full p-2">
      {order ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">Order ID #{order._id}</h1>
          <hr className="my-5" />
          <div className="">
            <div>
              <span>Customer Name: </span>
              <span className="font-bold">{order.name}</span>
            </div>
            <div>
              <span>Customer Email: </span>
              <span className="font-bold">{order.email}</span>
            </div>
            <div></div>
            <span>Customer Phone: </span>
            <span className="font-bold">{order.phone}</span>
          </div>
          <div>
            <span>Customer Address: </span>
            <span className="font-bold">{order.address}</span>
          </div>
          <hr className="my-5" />
          <div>
            <div>
              <span>Total Price: </span>
              <span className="font-bold">{new Intl.NumberFormat().format(order.totalPrice)} VND</span>
            </div>
            <div>
              <span>Status: </span>
              <span className="font-bold uppercase text-yellow-400">{order.status}</span>
            </div>
            <div>
              <span>Payment Method: </span>
              <span className="font-bold uppercase text-yellow-400">{order.paymentStatus}</span>
            </div>
          </div>
          <hr className="my-5" />
          <table className="w-full table-auto text-center">
            <thead className="bg-slate-300">
              <tr>
                <th className="py-5 ">Product ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {order.cart.map((item) => (
                <tr key={item.product._id}>
                  <td className="py-3">{item.product._id}</td>
                  <td>{item.product.name}</td>
                  <td>{item.quantity}</td>
                  <td>{new Intl.NumberFormat().format(item.product.price)} VND</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default OrderDetail;
