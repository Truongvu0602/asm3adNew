import axios from "axios";
import { Button, ButtonGroup, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

const Productlist = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);

  const serverHost = import.meta.env.VITE_SERVER_HOST;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        if (search.trim().length > 0) {
          const response = await axios.get(
            `${serverHost}/admin/products/byname?name=${search}`,
            { withCredentials: true }
          );
          if (response.status === 200) {
            const data = await response.data;
            setProducts(data.products);
            setLoading(false);
          }
        } else {
          const response = await axios.get(`${serverHost}/admin/products/all`, {
            withCredentials: true,
          });
          if (response.status === 200) {
            const data = await response.data;
            setProducts(data.products);
            setLoading(false);
          }
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        if (error.response && error.response.status === 401) {
          window.location.reload();
        }
      }
    };

    fetchProducts();
  }, [search]);

  const handleDeleteProduct = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.delete(
          `${serverHost}/admin/products/${id}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          const data = await response.data;
          const deletedProduct = data.product;
          setProducts(
            products.filter((product) => product._id !== deletedProduct._id)
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUserInputchange = (e) => {
    setInputVal(e.target.value);
    const timeOutId = setTimeout(() => setSearch(inputVal), 750);
    return () => clearTimeout(timeOutId);
  };

  if (loading || !products) {
    return (
      <div className="text-slate-500 text-center mt-5">
        <h1 className="text-slate-500 m-2 font-bold">Products</h1>
        <Spinner />
        Loading...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-slate-500 m-2 font-bold">Products</h1>
      <div className="div">
        <div className="searchWrapper my-5 flex items-center justify-between">
          <input
            type="text"
            value={inputVal}
            onChange={handleUserInputchange}
            placeholder="Search product"
          />
          <Link to={"/products/add-new"}>
            <Button className="mr-2 flex items-center">
              <HiPlusCircle className="w-5 h-5 mr-3" />
              <span>Add new product</span>
            </Button>
          </Link>
        </div>
        <div className="productsTable">
          <table className="table-auto w-full text-center">
            <thead className="bg-slate-300">
              <tr>
                <th className="py-3">ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => {
                  return (
                    <tr
                      key={product._id}
                      className="border-b border-slate-300 text-slate-500 hover:bg-slate-100"
                    >
                      <td className="py-3">{product._id}</td>
                      <td>{product.name}</td>
                      <td>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.price)}
                      </td>
                      <td>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 m-2"
                        />
                      </td>
                      <td>{product.category}</td>
                      <td>
                        <ButtonGroup>
                          <Link to={`${product._id}?mode=edit`}>
                            <Button color="warning">Edit</Button>
                          </Link>
                          <Button
                            onClick={() => handleDeleteProduct(product._id)}
                            color="failure"
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Productlist;
