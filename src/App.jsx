import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './LoginPage';
import DashboardHome from './dashboard';
import CategoryHome from './category-home';
import ProductHome from './product-home';
import PosPage from './pos';
import ReportHome from './reports-home';
import Products from './products';
import ProductReport from './products-report';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/category-home" element={<CategoryHome />} />
        <Route path="/product-home" element={<ProductHome />} />
        <Route path="/pos" element={<PosPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/reports-home" element={<ReportHome />} />
        <Route path="/products-report" element={<ProductReport />} />
      </Routes>
    </Router>
  );
}
