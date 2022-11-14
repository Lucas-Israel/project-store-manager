const camelize = require('camelize');
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

  return camelize(result);
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT a.id, a.date, b.*
    FROM StoreManager.sales as a
    INNER JOIN StoreManager.sales_products as b
    ON a.id = b.sale_id
    WHERE a.id = ?
    `, [id],
  );

  return camelize(result);
};

const deleting = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    `DELETE StoreManager.sales, StoreManager.sales_products FROM StoreManager.sales
    INNER JOIN StoreManager.sales_products
    ON StoreManager.sales.id = StoreManager.sales_products.sale_id
    WHERE StoreManager.sales.id = ?
    `, [id],
  );

  return { affectedRows };
};

module.exports = {
  insert,
  getAll,
  getById,
  deleting,
};