import axios from "axios";
import { Alert, Button, FileInput, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { PiPlusCircle } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

const NewProductForm = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    long_desc: "",
    short_desc: "",
    category: "",
    stock: "",
    images: [],
  });

  const handleFieldChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.files,
    });
  };

  const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (form.images.length < 5) {
      setError("Please select at least 5 images");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("long_desc", form.long_desc);
    formData.append("short_desc", form.short_desc);
    formData.append("category", form.category);
    formData.append("stock", form.stock);
    formData.append("images", form.images);
    formData.append("images", form.images[0]);
    formData.append("images", form.images[1]);
    formData.append("images", form.images[2]);
    formData.append("images", form.images[3]);
    formData.append("images", form.images[4]);

    try {
      const response = await axios.post(
        `${SERVER_HOST}/admin/products/add-new`,
        formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log(response)

      if (response.status === 201) {
        setSuccess(true);
        setLoading(false);
      }

    } catch (error) {
      setLoading(false);
      console.log(error);
      if(error.response.status === 401) {
        navigate("/login");
      }
      if (error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  if(success) {
    return (
      <div>
        <div className="p-3 flex items-center gap-4">
          <HiCheckCircle size={40} color="green" />
          <h1 className="text-2xl font-bold">Success added new Product</h1>
        </div>
        <Link to={"/products"}>
        <Button className="mx-5"> <HiArrowUturnLeft className="mr-2"/>  Back to products page</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} >
        <div className="mb-6">
          <Label htmlFor="name">Product&apos;s Name: </Label>
          <TextInput
            id="name"
            value={form.name}
            type="text"
            name="name"
            required
            onChange={handleFieldChange}
            disabled={loading}
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="category">Product&apos;s Category: </Label>
          <TextInput
            id="category"
            value={form.category}
            type="text"
            name="category"
            required
            onChange={handleFieldChange}
            disabled={loading}
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="price">Product&apos;s Price: </Label>
          <TextInput
            id="price"
            value={form.price}
            type="text"
            name="price"
            required
            onChange={handleFieldChange}
            disabled={loading}
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="long_desc">Product&apos;s Long Description: </Label>
          <TextInput
            id="long_desc"
            value={form.long_desc}
            type="text"
            name="long_desc"
            required
            onChange={handleFieldChange}
            disabled={loading}
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="short_desc">Product&apos;s Short Description: </Label>
          <TextInput
            id="short_desc"
            value={form.short_desc}
            type="text"
            name="short_desc"
            required
            onChange={handleFieldChange}
            disabled={loading}
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="stock">Product stock: </Label>
          <TextInput
            id="stock"
            value={form.stock}
            type="text"
            name="stock"
            required
            onChange={handleFieldChange}
            disabled={loading}
          />
        </div>
        <div>
          <Label htmlFor="images">Product&apos;s Images: </Label>
          <FileInput
            id="images"
            name="images"
            multiple
            onChange={handleFileChange}
            disabled={loading}
          />
        </div>
        <div className="flex justify-between items-center mt-20">
          <Button color="success" type="submit">
            <div className="flex items-center">{
              loading ? <Spinner size="sm" color="success" className="mr-2" /> :<PiPlusCircle className="w-5 h-5 mr-2" />
            } Add product</div>
          </Button>
          {error && (
            <Alert color="failure" onDismiss={() => setError(null)}>
              {error}
            </Alert>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewProductForm;
