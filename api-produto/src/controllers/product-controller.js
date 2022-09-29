const mongoose = require('mongoose');
const repository = require('../repositories/product-repository');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.get = async (req, res, next) => {
  const data = await repository.getProduct();
  res.status(200).send(data);
};

exports.post = async (req, res, next) => {
  await repository.create(req.body);
  var raw = JSON.stringify({
    "emailFrom": "isabela.fiap0710@gmail.com",
    "emailTo": "isabela.fiap0710@gmail.com",
    "subject": "Cadastro de produto com sucesso",
    "text": `Nome: ${req.body.title}\n Descrição: ${req.body.description}\n Valor: R$ ${req.body.price}\n ${req.body.active? 'Disponível em estoque': 'Indisponível no estoque'}`
  });

 await fetch('http://localhost:8080/send-email', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: raw,
    redirect: 'follow'
  });
  res.status(200).send({ message: 'Criado com sucesso!' });
};

exports.put = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  await repository.put(id, body);
  res.status(200).send({ message: 'Atualizado' });
};

exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const data = await repository.getById(id);

  if (data == null) res.status(404).send();

  res.status(200).send(data);
};

exports.delete = async (req, res, next) => {
  const id = req.params.id;

  await repository.delete(id);
  res.status(200).send({ message: 'removido com sucesso' });
};
