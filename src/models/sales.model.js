const connection = require('./database/connection');

const insert = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales(date) VALUE (now())', // pode usar now() direto no value?
  );

  return { insertId };
};

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT a.id, a.date, b.*
    FROM StoreManager.sales as a
    INNER JOIN StoreManager.sales_products as b
    ON a.id = b.sale_id
    `,
  );

  return result;
};

module.exports = {
  insert,
  getAll,
};