import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './LoginPage';
import DashboardHome from './dashboard';
import CategoryHome from './category-home';
import ProductHome from './product-home';
import PosPage from './pos';
import Analytics from './analytics';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/category-home" element={<CategoryHome />} />
        <Route path="/product-home" element={<ProductHome />} />
        <Route path="/pos" element={<PosPage />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
}
