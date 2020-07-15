const Validator = require("jsonschema").Validator;
const { VastsError } = require("../../../helpers/errors");
const validator = new Validator();

const vastUpdateSchema = {
  id: "/vastUpdate",
  type: "object",
  properties: {
    vastId: {
      type: "integer"
    },
    vastUrl: {
      type: "string",
      format: "uri"
    },
    position: { type: "string" },
    width: {
      type: ["integer", "null"],
      minimum: 100,
      maximum: 1000
    },
    height: {
      type: ["integer", "null"],
      minimum: 100,
      maximum: 1000
    }
  },
  required: ["vastId"]
};

module.exports = async (req, res, next) => {
  try {
    const { body } = req;
    const valid = await validator.validate(body, vastUpdateSchema);
    if (valid.errors.length > 0) {
      throw new VastsError({
        message: valid.errors[0].message,
        statusCode: 400
      });
    }
    if (Object.keys(body).length <= 1) {
      throw new VastsError({
        message: "at-least one of the optionals is required",
        statusCode: 400
      });
    }
    next();
  } catch (e) {
    next(e);
  }
};
