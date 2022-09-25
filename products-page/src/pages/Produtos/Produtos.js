import React, { useContext, useEffect, useState } from 'react';
import { Card } from '../../components/Card/Card';
import { Formulario } from '../../components/Formulario/Formulario';
import { ProductsContext } from '../../ProductsContext';
import styles from './Produtos.module.css';

const Produtos = () => {
  const [modal, setModal] = useState(false);
  const { getProdutos, produtos, message, filtro, setFiltro } =
    useContext(ProductsContext);

  useEffect(() => {
    getProdutos();
  });

  return (
    <>
      <div className={styles.container}>
        <section
          className={styles.modal}
          style={{
            width: modal ? '70%' : '0px',
          }}
        >
          <div
            className={styles.content}
            style={{
              display: modal ? 'block' : 'none',
            }}
          >
            <h1>Cadastro de produtos</h1>
            <Formulario />
          </div>
        </section>
        <section className={styles.estoque}>
          <header>
            <h1>Estoque de produtos</h1>
            <input
              className={styles.pesquisa}
              placeholder="Busque um produto pelo nome"
              type="text"
              onChange={({ target }) => {
                setFiltro(
                  produtos.filter((p) =>
                    p.title
                      .toLocaleLowerCase()
                      .includes(target.value.toLocaleLowerCase()),
                  ),
                );
              }}
            ></input>
            <button
              className={styles.header_buttons}
              onClick={() => setModal(!modal)}
            >
              {modal ? 'Fechar cadastro' : '+ Adicionar produto'}
            </button>
          </header>
          <section className={styles.products_wrapper}>
            {filtro.length !== 0 ? (
              filtro.map((p) => (
                <Card
                  key={p._id}
                  id={p._id}
                  nome={p.title}
                  status={p.active}
                  valor={p.price}
                  descricao={p.description}
                />
              ))
            ) : produtos.length > 0 ? (
              produtos.map((p) => (
                <Card
                  key={p._id}
                  id={p._id}
                  nome={p.title}
                  status={p.active}
                  valor={p.price}
                  descricao={p.description}
                />
              ))
            ) : (
              <p>Nenhum produto foi cadastrado</p>
            )}
          </section>
        </section>
        <p
          className={styles.message}
          style={{
            display: message == null ? 'none' : 'block',
            backgroundColor: message
              ? message.includes('cadastrado')
                ? '#03FF4A'
                : '#EF2B00'
              : null,
          }}
        >
          {message !== null ? message : null}
        </p>
      </div>
    </>
  );
};

export default Produtos;
