import React, { useContext } from 'react';
import { ProductsContext } from '../../ProductsContext';
import styles from './Card.module.css';

export const Card = ({ id, nome, valor, status, descricao }) => {
  const { getProdutos, setMessage, setFiltro } = useContext(ProductsContext);

  async function deleteProduct() {
    const rawResponse = await fetch(`http://localhost:3001/products/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (rawResponse.status === 200) {
      await setMessage('Produto excluido com sucesso!');
      const timer = setTimeout(() => setMessage(null), 5000);
      getProdutos();
      setFiltro([]);
      return () => clearTimeout(timer);
    }
  }

  return (
    <div className={styles.card_wrapper}>
      <header>
        <p className={styles.id}>#{id}</p>
        <button
          className={styles.delete_product_button}
          onClick={() => deleteProduct()}
        >
          excluir
        </button>
        <p
          className={styles.status}
          style={{ color: status ? '#03FF4A' : '#EF2B00' }}
        >
          {status ? 'disponivel' : 'indisponivel'}
        </p>
      </header>
      <h3>{nome}</h3>
      <p className={styles.valor}>
        {Number(valor).toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}
      </p>
      <p className={styles.descricao}>{descricao}</p>
    </div>
  );
};
