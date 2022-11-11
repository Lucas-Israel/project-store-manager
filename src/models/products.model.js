const connection = require('./database/connection');

const findAll = async () => {
  const result = await connection.execute(
    'SELECT * FROM products',
  );

  return result;
};

const findByID = async (productId) => {
  const result = await findAll();
  const found = result.find(({ id }) => id === productId);
  return found;
};

module.exports = {
  findAll,
  findByID,
};