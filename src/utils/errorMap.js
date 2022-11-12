const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  INVALID_VALUE: 400,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};