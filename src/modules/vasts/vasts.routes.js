const express = require("express");
const cors = require("cors");
const vastsRouter = express.Router();
const queryContextExtractor = require("./middlewares/queryContextExtractor");
const postValidationMiddleware = require("./middlewares/postValidationMiddleware");
const updateValidationMiddleware = require("./middlewares/updateValidationMiddleware");
const vastsController = require("./vasts.controller");

vastsRouter.get("/", queryContextExtractor, vastsController.getVastsById);
vastsRouter.get(
  "/fetch_vasts",
  queryContextExtractor,
  vastsController.getVasts
);

vastsRouter.post(
  "/edit_vast",
  cors(),
  updateValidationMiddleware,
  queryContextExtractor,
  vastsController.updateVasts
);

vastsRouter.delete(
  "/",
  cors(),
  queryContextExtractor,
  vastsController.deleteVast
);

vastsRouter.post(
  "/create_vast",
  cors(),
  postValidationMiddleware,
  queryContextExtractor,
  vastsController.createVasts
);

module.exports = vastsRouter;
