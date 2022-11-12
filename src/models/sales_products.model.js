const connection = require('./database/connection');

const insert = async (saleId, productId, quantity) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) VALUES(?, ?, ?)',
    [saleId, productId, quantity],
  );

  const newObj = { productId, quantity };

  return newObj;
};

module.exports = {
  insert,
};