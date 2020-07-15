const vastsService = require("./vasts.service");
const buildXml = require("../../helpers/buildXml");

module.exports = {
  getVasts: async (req, res, next) => {
    try {
      const result = await vastsService.findVasts();
      return res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  },
  getVastsById: async (req, res, next) => {
    try {
      const { ctx: context } = req;
      const { vastId } = context;
      const vast = await vastsService.findVastsById(vastId);
      if (vast) {
        const xml = buildXml(vast);
        res.set("Content-Type", "text/xml");
        return res.status(200).send(xml);
      }

      throw new Error("Did not find vast in DB");
    } catch (err) {
      next(err);
    }
  },
  createVasts: async (req, res, next) => {
    try {
      const { body } = req;
      const result = await vastsService.createVasts(body);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  },
  updateVasts: async (req, res, next) => {
    try {
      const { body } = req;
      const result = await vastsService.updateVasts(body);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  },
  deleteVast: async (req, res, next) => {
    try {
      const { ctx: context } = req;
      const { vastId } = context;
      const result = await vastsService.deleteVast(vastId);
      res.status(200).send("ok");
    } catch (err) {
      next(err);
    }
  }
};
