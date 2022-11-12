const connection = require('./database/connection');

const insert = async (id) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales(id) VALUE (?)', [id],
  );

  return { insertId };
};

module.exports = {
  insert,
};