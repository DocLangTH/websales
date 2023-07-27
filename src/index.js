import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import App from './App';
import Detail from './component/Blog/Detail';
import List from './component/Blog/List';
import './index.css';
import Index from './Member/Index';

import reportWebVitals from './reportWebVitals';
import Accountupdate from './Member/Accountupdate';
import Addproduct from './component/product/Addproduct';
import Myproduct from './component/product/Myproduct';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route path="/blog/list" element={<List />} />
          <Route path="/blog/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Index />} />
          <Route path="/account" element={<Accountupdate />} />
          <Route path="/account/product" element={<Addproduct />} />
          <Route path="/account/my-product" element={<Myproduct />} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
