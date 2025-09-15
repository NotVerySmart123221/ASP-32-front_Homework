import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { useState } from 'react'
import './ui/App.css'
import Layout from '../widgets/layout/Layout';
import Category from '../pages/category/Category';
import Home from '../pages/home/Home';

function App() {
  const [count, setCount] = useState(0)

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="category" element={<Category />} />
      </Route>
    </Routes>
  </BrowserRouter>;
}

export default App
