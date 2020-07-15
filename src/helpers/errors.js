const _ = require("lodash");

class VastsError extends Error {
  constructor(
    { message, msg, more_info, statusCode, stack, ...rest },
    serviceName = "VastsService"
  ) {
    super(message || msg);
    this.more_info = more_info;
    this.statusCode = statusCode;
    this.stack = stack;
    this.serviceName = serviceName;
    this.custom = rest;
  }

  getBody() {
    return _.pickBy(
      {
        message: this.message || this.msg,
        more_info: this.more_info,
        service_name: this.serviceName,
        status: this.statusCode,
        stack: this.stack,
        ...this.custom,
      },
      _.identity
    );
  }
}

module.exports = {
  VastsError,
};
