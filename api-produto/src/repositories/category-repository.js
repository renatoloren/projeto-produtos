const mongoose = require('mongoose');
const Category = mongoose.model('Category');

exports.get = async () => {
  const result = await Category.find({}, '_id name material label isPrinted');
  return result;
};

exports.create = async (data) => {
  let category = Category(data);
  await category.save();
};

exports.put = async (id, data) => {
  await Category.findByIdAndUpdate(id, {
    $set: {
      name: data.name,
      material: data.material,
      label: data.label,
      isPrinted: data.isPrinted,
    },
  });
};

exports.getById = async (id) => {
  const result = await Category.findById(
    { _id: id },
    '_id name material label isPrinted',
  );
  return result;
};

exports.delete = async (id) => {
  await Category.findByIdAndDelete({ _id: id });
};
