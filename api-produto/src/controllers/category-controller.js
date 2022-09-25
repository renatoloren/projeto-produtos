const mongoose = require('mongoose');
const repository = require('../repositories/category-repository');

exports.get = async (req, res, next) => {
  const data = await repository.get();
  res.status(200).send(data);
};

exports.post = async (req, res, next) => {
  await repository.create(req.body);
  res.status(201).send({ message: 'Criado com sucesso!' });
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
