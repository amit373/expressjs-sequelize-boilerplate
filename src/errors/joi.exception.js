const { ErrorMessage } = require('../constants');

const JoiException = async (schema, body) => {
  try {
    const value = await schema?.validateAsync(body);
    return {
      error: null,
      value,
    };
  } catch (err) {
    return {
      value: null,
      error: err?.details[0]?.message || ErrorMessage.SOMETHING_WENT_WRONG,
    };
  }
};

module.exports = { JoiException };
