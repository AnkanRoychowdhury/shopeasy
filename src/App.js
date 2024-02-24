import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import Home from './pages/Home'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useState } from "react";
import Contact from './components/Contact';
import ProductOverview from "./components/ProductOverview";
import Cart from "./components/Cart";
import { ThankYou } from './components/ThankYou';


function App() {

  let saveUser = localStorage.getItem("isLoggedin");
  let username = localStorage.getItem('username')
  // let userId = localStorage.getItem('userId')
  
  const [isLogged, setIsLogged] = useState(saveUser);
  const [product, setProduct] = useState({});
  const [userEmail, setUserEmail] = useState('');

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home isLogged={isLogged} setIsLogged={setIsLogged} user={userEmail} setProduct={setProduct}></Home>,
    },
    {
      path: "/login",
      element: <LoginPage isLogged={isLogged} setIsLogged={setIsLogged} setUserEmail={setUserEmail}></LoginPage>,
    },
    {
      path: "/register",
      element: <RegisterPage setIsLogged={setIsLogged} user={username}></RegisterPage>,
    },
    {
      path: `/products`,
      element: <ProductOverview isLogged={isLogged}  product={product}/>,
    },
    {
      path: "/contact",
      element: <Contact></Contact>,
    },
    {
      path: "/cart",
      element: <Cart></Cart>,
    },
    {
      path: "/thankyou",
      element: <ThankYou></ThankYou>,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
