import React from 'react';

const useForm = () => {
  const [valor, setValue] = React.useState('');
  const [error, setError] = React.useState();

  function validate(valor) {
    if (valor.length === 0 || valor === 0 || valor === null) {
      setError('Preencha um valor.');
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }) {
    if (error) validate(target.value);
    setValue(target.value);
  }

  return {
    valor,
    setValue,
    setError,
    onChange,
    error,
    validate: () => validate(valor),
    onBlur: () => validate(valor),
  };
};

export default useForm;
