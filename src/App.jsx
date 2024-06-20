import Root from "./layout/Root.jsx";
import Login from "./pages/Login.jsx";
import Welcome from "./pages/Welcome.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Products from "./pages/Products.jsx";
import Chat from "./pages/Chat.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import OrderDetail from "./pages/OrderDetail.jsx";
import NewProduct from "./pages/NewProduct.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/products/add-new",
        element: <NewProduct/>
      },
      {
        path: "/order/:id",
        element: <OrderDetail/>
      },
      {
        path: "chat",
        element: <Chat />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
