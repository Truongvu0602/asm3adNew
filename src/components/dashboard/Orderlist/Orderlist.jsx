import axios from "axios";
import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Orderlist = () => {
  const [orderData, setOrderData] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
  const SERVER_HOST = import.meta.env.VITE_SERVER_HOST?.replace(/\/+$/, "");

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
      <div style={{ marginTop: "1.25rem" }}>
        <h1 style={{ color: "#64748b", margin: "0.5rem", fontWeight: "bold" }}>
          History
        </h1>
        <table
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: "0.875rem",
            tableLayout: "fixed",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#e2e8f0" }}>
              <th style={{ padding: "1.25rem 0" }}>User ID</th>
              <th>Username</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Total</th>
              <th>Delivery</th>
              <th>Status</th>
              <th>Detail</th>
            </tr>
          </thead>
        </table>
        <div
          style={{ width: "100%", margin: "0.75rem 0", textAlign: "center" }}
        >
          <Spinner /> Loading ...
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "1.25rem" }}>
      <h1 style={{ color: "#64748b", margin: "0.5rem", fontWeight: "bold" }}>
        History
      </h1>
      <table
        style={{
          width: "100%",
          textAlign: "center",
          fontSize: "0.875rem",
          tableLayout: "auto",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#e2e8f0" }}>
            <th style={{ padding: "1.25rem 0" }}>User ID</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Total</th>
            <th>Delivery</th>
            <th>Status</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody style={{ color: "#64748b" }}>
          {orderData.orders.length > 0 ? (
            orderData.orders.map((order) => (
              <tr
                key={order._id}
                style={{
                  borderBottom: "1px solid #e2e8f0",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f1f5f9")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <td>{order.user}</td>
                <td>{order.name}</td>
                <td>{order.phone}</td>
                <td>{order.address}</td>
                <td>{new Intl.NumberFormat().format(order.totalPrice)} VND</td>
                <td>{order.paymentStatus}</td>
                <td>{order.status}</td>
                <td>
                  <div
                    style={{
                      padding: "1.25rem 0",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Link to={`/order/${order._id}`}>
                      <Button
                        style={{
                          backgroundColor: "#22c55e",
                          color: "white",
                          padding: "0.5rem 1rem",
                          borderRadius: "0.25rem",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                          transition: "transform 0.15s ease",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      >
                        Detail
                      </Button>
                    </Link>
                  </div>
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

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "0.25rem",
          marginTop: "0.75rem",
        }}
      >
        {[...Array(Math.ceil(orderData.total / 5))].map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            style={{
              backgroundColor: "#e2e8f0",
              color: page === index + 1 ? "#000" : "#64748b",
              fontWeight: page === index + 1 ? "bold" : "normal",
              padding: "0.25rem 0.5rem",
              margin: "0 0.25rem",
              border: "none",
              borderRadius: "0.25rem",
              cursor: "pointer",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Orderlist;
