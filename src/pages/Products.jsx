import { useEffect } from 'react';
import Productlist from '../components/products/Productlist'
import { useUserContext } from '../store/UserContext';
import { useNavigate } from 'react-router-dom';

const Products = () => {

  const {user} = useUserContext();

  const navigate = useNavigate();


  useEffect(() => {
    if(user && user.role !== "admin") {
      navigate("/chat");
    }
  }, [user, navigate])

  return (
    <div>
      <Productlist/>
    </div>
  )
}

export default Products;