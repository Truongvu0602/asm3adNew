/* eslint-disable react/prop-types */

import axios from "axios";
import {
  Alert,
  Button,
  Label,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const ProductDetail = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: product.name,
    price: product.price,
    long_desc: product.long_desc,
    short_desc: product.short_desc,
    category: product.category,
    stock: product.stock,
    images: product.images,
  });
  const [error, setError] = useState(null);

  const handleFieldChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const SERVER_HOST = import.meta.env.VITE_SERVER_HOST?.replace(/\/+$/, "");
  const navigate = useNavigate();

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch(
        `${SERVER_HOST}/admin/products/${product._id}`,
        form,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setLoading(false);
        navigate("/products");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    setForm({
      name: product.name,
      price: product.price,
      long_desc: product.long_desc,
      short_desc: product.short_desc,
      category: product.category,
      stock: product.stock,
      images: product.images,
    });
  }, [product]);

  return (
    <div style={{ padding: "1.25rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ fontSize: "1.875rem", fontWeight: "bold" }}>
          Edit Product
        </h1>
      </div>

      <form style={{ width: "auto" }} onSubmit={handleUpdateProduct}>
        <div style={{ margin: "1.25rem 0" }}>
          <Label htmlFor="productId" value="Product ID:" />
          <TextInput id="productId" value={product._id} disabled />
        </div>

        <div style={{ margin: "1.25rem 0" }}>
          <Label htmlFor="productName" value="Product Name:" />
          <TextInput
            id="productName"
            value={form.name}
            name="name"
            onChange={handleFieldChange}
            required
          />
        </div>

        <div style={{ margin: "1.25rem 0" }}>
          <Label htmlFor="productPrice" value="Product Price:" />
          <TextInput
            id="productPrice"
            value={form.price}
            name="price"
            onChange={handleFieldChange}
            required
          />
        </div>

        <div style={{ margin: "1.25rem 0" }}>
          <Label htmlFor="productCate" value="Product Category:" />
          <TextInput
            id="productCate"
            value={form.category}
            name="category"
            onChange={handleFieldChange}
            required
          />
        </div>

        <div style={{ margin: "1.25rem 0" }}>
          <Label htmlFor="productStock" value="Product Stock:" />
          <TextInput
            id="productStock"
            value={form.stock}
            name="stock"
            onChange={handleFieldChange}
            required
          />
        </div>

        <div style={{ margin: "1.25rem 0" }}>
          <Label htmlFor="productLongDesc" value="Product Long Desc:" />
          <Textarea
            id="productLongDesc"
            style={{ minHeight: "200px" }}
            value={form.long_desc}
            name="long_desc"
            onChange={handleFieldChange}
            required
          />
        </div>

        <div style={{ margin: "1.25rem 0" }}>
          <Label htmlFor="productShortDesc" value="Product Short Desc:" />
          <Textarea
            id="productShortDesc"
            style={{ minHeight: "200px" }}
            value={form.short_desc}
            name="short_desc"
            onChange={handleFieldChange}
            required
          />
        </div>

        <div>
          <Label>Product images:</Label>
          <div
            style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}
          >
            {product.images &&
              product.images.map((image) => {
                return (
                  <img
                    key={product.name}
                    src={image}
                    alt="product"
                    style={{
                      width: "8rem",
                      height: "8rem",
                      backgroundColor: "#f1f5f9", // slate-100
                      padding: "0.25rem",
                      borderRadius: "0.375rem",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                      transition: "box-shadow 0.2s ease-in-out",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 4px 6px rgba(0,0,0,0.15)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 1px 3px rgba(0,0,0,0.1)")
                    }
                  />
                );
              })}
          </div>
        </div>

        <hr style={{ margin: "1.25rem 0" }} />

        <div style={{ margin: "1.25rem 0", float: "right" }}>
          {error && (
            <Alert color="failure" onDismiss={() => setError(null)}>
              {error}
            </Alert>
          )}
          <Button type="submit" color="success">
            {loading ? (
              <Spinner style={{ margin: "0 5rem" }} />
            ) : (
              <span style={{ display: "flex", alignItems: "center" }}>
                <BiCheckCircle
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    marginRight: "0.5rem",
                  }}
                />
                Confirm changes
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>

    // <div className="p-5">
    //   <div className="flex items-center justify-between">
    //     <h1 className="text-3xl font-bold">{`${"Edit Product"}`}</h1>
    //   </div>
    //   <form className="w-auto" onSubmit={handleUpdateProduct}>
    //     <div className="my-5">
    //       <Label htmlFor="productId" value="Product ID:" />
    //       <TextInput id="productId" value={product._id} disabled />
    //     </div>
    //     <div className="my-5">
    //       <Label htmlFor="productName" value="Product Name:" />
    //       <TextInput
    //         id="productName"
    //         value={form.name}
    //         name="name"
    //         onChange={handleFieldChange}
    //         required
    //       />
    //     </div>
    //     <div className="my-5">
    //       <Label htmlFor="productPrice" value="Product Price:" />
    //       <TextInput
    //         id="productPrice"
    //         value={form.price}
    //         name="price"
    //         onChange={handleFieldChange}
    //         required
    //       />
    //     </div>
    //     <div className="my-5">
    //       <Label htmlFor="productCate" value="Product Category:" />
    //       <TextInput
    //         id="productCate"
    //         value={form.category}
    //         name="category"
    //         onChange={handleFieldChange}
    //         required
    //       />
    //     </div>
    //     <div className="my-5">
    //       <Label htmlFor="productStock" value="Product Stock:" />
    //       <TextInput
    //         id="productStock"
    //         value={form.stock}
    //         name="stock"
    //         onChange={handleFieldChange}
    //         required
    //       />
    //     </div>
    //     <div className="my-5">
    //       <Label htmlFor="productLongDesc" value="Product Long Desc:" />
    //       <Textarea
    //         className="min-h-[200px]"
    //         id="productLongDesc"
    //         value={form.long_desc}
    //         name="long_desc"
    //         onChange={handleFieldChange}
    //         required
    //       />
    //     </div>
    //     <div className="my-5">
    //       <Label htmlFor="productShortDesc" value="Product Short Desc:" />
    //       <Textarea
    //         className="min-h-[200px]"
    //         id="productShortDesc"
    //         value={form.short_desc}
    //         name="short_desc"
    //         onChange={handleFieldChange}
    //         required
    //       />
    //     </div>
    //     <div>
    //       <Label>Product images:</Label>
    //       <div className="flex items-center gap-5">
    //         {product.images &&
    //           product.images.map((image) => {
    //             return (
    //               <img
    //                 key={product.name}
    //                 src={image}
    //                 alt="product"
    //                 className="w-32 h-32 bg-slate-100 p-1 rounded shadow hover:shadow-md transition-all cursor-pointer"
    //               />
    //             );
    //           })}
    //       </div>
    //     </div>
    //     <hr className="my-5" />
    //     <div className="my-5 float-right">
    //       {error && (
    //         <Alert color="failure" onDismiss={() => setError(null)}>
    //           {error}
    //         </Alert>
    //       )}
    //       <Button type="submit" color="success">
    //         {loading ? (
    //           <Spinner className="mx-20" />
    //         ) : (
    //           <span className="flex items-center">
    //             <BiCheckCircle className="w-5 h-5 mr-2" /> Confirm changes
    //           </span>
    //         )}
    //       </Button>
    //     </div>
    //   </form>
    // </div>
  );
};

export default ProductDetail;
