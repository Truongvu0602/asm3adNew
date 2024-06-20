import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "../components/products/ProductDetail";

const ProductDetailPage = () => {
  const [product, setProduct] = useState({});

  const params = useParams();
  const productId = params.id;

  const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${SERVER_HOST}/admin/products/${productId}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          const data = await response.data;
          setProduct(data.product);
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 401) {
          window.location.reload();
        }
      }
    };

    fetchProduct();

  }, [productId]);

  return <div>
    <ProductDetail product={product}/>
  </div>;
};

export default ProductDetailPage;
