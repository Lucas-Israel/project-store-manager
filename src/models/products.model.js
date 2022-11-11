const connection = require('./database/connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return result;
};

const findByID = async (productId) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [productId],
  );
  
  return result;
};

module.exports = {
  findAll,
  findByID,
};