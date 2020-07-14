const Validator = require("jsonschema").Validator;
const errors = require("../../../helpers/errors");

const validator = new Validator();

const vastCreateSchema = {
  id: "/vastCreate",
  type: "object",
  properties: {
    vastUrl: {
      type: "string",
      format: "uri",
      name: "uri",
      pattern:
        "^(https?|ftp|torrent|image|irc)://(-.)?([^s/?.#-]+.?)+(/[^s]*)?$"
    },
    position: { type: "string" },
    width: { type: "integer", minimum: 100, maximum: 1000 },
    height: { type: "integer", minimum: 100, maximum: 1000 }
  },
  required: ["vastUrl"]
};

module.exports = async (req, res, next) => {
  try {
    const { body } = req;
    const valid = await validator.validate(body, vastCreateSchema);
    if (valid.errors.length > 0) {
      throw new errors.VastsError({
        message: valid.errors[0].message,
        statusCode: 400
      });
    }
    next();
  } catch (e) {
    next(e);
  }
};
