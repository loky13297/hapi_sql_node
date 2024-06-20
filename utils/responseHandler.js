const successHandler = (req, res, status, message = "success", data) => {
  return res.response({ message, data });
};

const errorHandler = (req, res, status, message = "error", data = {}) => {
  return res.response({ message, data });
};

module.exports = { successHandler, errorHandler };
