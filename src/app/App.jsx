import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react'
import './ui/App.css'
import Layout from '../widgets/layout/Layout';
import Category from '../pages/category/Category';
import Home from '../pages/home/Home';
import AppContext from '../features/context/AppContext';
import Base64 from '../shared/base64/Base64';
import Product from '../pages/product/Product';
import Cart from '../pages/cart/Cart';

const initCartState = {
  cartItems: []
};

function App() {
  const [cart, setCart] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const updateCart = () => {
    if (user) {
      request("/api/cart")
        .then(setCart)
    } else {
      setCart(initCartState);
    }
  }

  useEffect(() => {
    if(token) {
      setUser( Base64.jwtDecodePayload(token) );
    }
    else {
      setUser(null);
    }
    updateCart();
  }, [token]);

  const backUrl = "https://localhost:7278";

  const request = (url, conf) => new Promise((resolve, reject) => {
    console.log("Requesting", url, conf);
    if(url.startsWith('/')) {
      url = backUrl + url;
      // додаємо токен до кожного запиту, що іде до бекенду - Authorization: Bearer token
      if(token) {
        if(typeof conf == 'undefined') {
          conf = {};
        }
        if(typeof conf.headers == 'undefined') {
          conf.headers = {};
        }
        if(typeof conf.headers['Authorization'] == 'undefined') {
          conf.headers['Authorization'] = 'Bearer ' + token;
        }
      }
    }
    console.log("Final URL:", url);
    fetch(url, conf)
        .then(r => r.json())
        .then(j => {
            if(j.status.isOk) {
                resolve(j.data);
            }
            else {
                reject(j);
            }
        });
  });

  return <AppContext.Provider value={ { cart, updateCart, request, backUrl, user, setToken } }>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="category/:slug" element={<Category />} />
          <Route path="product/:slug" element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AppContext.Provider>;
}

export default App
