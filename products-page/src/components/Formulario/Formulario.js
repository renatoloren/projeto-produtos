import React, { useContext, useState } from 'react';
import styles from './Formulario.module.css';
import CurrencyInput from 'react-currency-input-field';
import useForm from '../../hooks/useForm';
import { ProductsContext } from '../../ProductsContext';

export const Formulario = () => {
  const { getProdutos, setMessage, setFiltro } = useContext(ProductsContext);
  const name = useForm();
  const description = useForm();
  const cost = useForm();
  const [isAvailabe, setAvailabe] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    let novoValor = cost.valor.replace(',', '.');
    submitForm(novoValor);
  }

  async function submitForm(valor) {
    if (name.error || description.error || cost.error) {
      return null;
    }

    if (valor.includes('R$')) {
      return null;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "emailFrom": "isabela.fiap0710@gmail.com",
      "emailTo": "isabela.fiap0710@gmail.com",
      "subject": "Cadastro de produto com sucesso",
      "text": `Nome: ${name.valor}\n Descrição: ${description.valor}\n Valor: R$ ${cost.valor}\n ${isAvailabe? 'Disponível em estoque': 'Indisponível no estoque'}`
    });

    const sendEmail = await fetch('http://localhost:8080/send-email', {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    });

    const rawResponse = await fetch('http://localhost:3001/products', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: name.valor,
        description: description.valor,
        price: valor,
        active: isAvailabe,
      }),
    });

    if (rawResponse.status === 200 && sendEmail.status === 200) {
      await setMessage('Produto cadastrado com sucesso!');
      setFiltro([]);
      const timer = setTimeout(() => setMessage(null), 5000);
      await getProdutos();
      return () => clearTimeout(timer);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.form_inputs}>
        <label>Nome do produto</label>
        <input type="text" name="name" {...name}></input>
        <p className={styles.error}>{name.error ? name.error : null}</p>
      </div>

      <div className={styles.form_inputs}>
        <label>Descrição</label>
        <textarea
          type="text"
          rows="5"
          cols={1}
          name="description"
          {...description}
        ></textarea>
        <p className={styles.error}>
          {description.error ? description.error : null}
        </p>
      </div>

      <div className={styles.form_inputs}>
        <label>Valor</label>
        <CurrencyInput
          defaultValue={0.0}
          decimalsLimit={2}
          prefix={'R$'}
          name="cost"
          intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
          onValueChange={(value, name) => cost.setValue(value)}
          {...cost}
        />
        <p className={styles.error}>{cost.error ? cost.error : null}</p>
      </div>

      <div className={styles.form_inputs_check}>
        <input
          type="checkbox"
          id="isAvailabe"
          name="isAvailabe"
          value={isAvailabe}
          onChange={() => setAvailabe(!isAvailabe)}
        />
        <label>Em estoque</label>
      </div>

      <button className={styles.form_save_btn}>Salvar</button>
    </form>
  );
};
