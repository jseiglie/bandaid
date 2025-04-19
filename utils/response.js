const responseObject = (statusCode, success, message, data) => {
  return {
    statusCode,
    success,
    message,
    data,
  };
};

module.exports = responseObject;
