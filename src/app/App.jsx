import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { useState } from 'react'
import './ui/App.css'
import Layout from '../widgets/layout/Layout';
import Category from '../pages/category/Category';
import Home from '../pages/home/Home';
import AppContext from '../features/context/AppContext';

function App() {
  const [count, setCount] = useState(0)

  const backUrl = "https://localhost:7278";

  const request = (url, conf) => new Promise((resolve, reject) => {
    if(url.startsWith('/')) {
      url = backUrl + url;
    }
    fetch(url)
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

  return <AppContext.Provider value={ { request, backUrl } }>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="category" element={<Category />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AppContext.Provider>;
}

export default App
