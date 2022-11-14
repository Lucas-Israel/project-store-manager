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

  console.log(result);
  
  return result;
};

const insert = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products(name) VALUE (?)', [name],
  );

  return { id: insertId, name };
};

const update = async (pId, name) => {
  await connection.execute(
    `UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?
    `, [name, pId],
  );

  return { id: pId, name };
};

const deleting = async (pId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?', [pId],
  );

  return { affectedRows };
}; 

module.exports = {
  findAll,
  findByID,
  insert,
  update,
  deleting,
};