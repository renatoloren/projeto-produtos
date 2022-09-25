import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Produtos from './pages/Produtos/Produtos';
import React from 'react';
import { ProductsStorage } from './ProductsContext';
function App() {
  return (
    <BrowserRouter>
      <ProductsStorage>
        <Routes>
          <Route path="/" element={<Produtos />} />
        </Routes>
      </ProductsStorage>
    </BrowserRouter>
  );
}

export default App;
