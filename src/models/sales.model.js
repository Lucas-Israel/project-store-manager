const connection = require('./database/connection');

const insert = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales(date) VALUE (now())', // pode usar now() direto no value?
  );

  return { insertId };
};

module.exports = {
  insert,
};