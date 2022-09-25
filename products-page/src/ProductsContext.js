import React, { useState } from 'react';

export const ProductsContext = React.createContext();

export const ProductsStorage = ({ children }) => {
  const [produtos, setProdutos] = useState([]);
  const [filtro, setFiltro] = useState([]);
  const [message, setMessage] = useState(null);

  async function getProdutos() {
    const response = await fetch('http://localhost:3001/products');
    const json = await response.json();
    setProdutos(json);
  }

  return (
    <ProductsContext.Provider
      value={{ getProdutos, produtos, message, setMessage, filtro, setFiltro }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
