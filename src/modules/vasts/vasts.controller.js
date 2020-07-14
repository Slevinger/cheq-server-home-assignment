const vastsService = require("./vasts.service");

var VAST = require("vast-xml");

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
      const vast = new VAST();
      const { ctx: context } = req;
      const { vastId } = context;
      const result = await vastsService.findVastsById(vastId);
      if (result) {
        const ad = vast.attachAd({
          id: vastId,
          structure: "inline",
          AdTitle: "Test Ad Title",
          AdSystem: { name: "Test Ad Server", version: "2.0" }
        });

        const { id, width, height, position, vastUrl } = result;
        var creative = ad.attachCreative("Linear", {
          AdParameters: "<xml></xml>",
          Duration: "00:00:30"
        });
        creative.attachMediaFile(vastUrl, {
          id: vastId,
          type: "application/javascript",
          width,
          height,
          position,
          maintainAspectRatio: "true",
          apiFramework: "VPAID"
        });
        res.set("Content-Type", "text/xml");
      }
      res
        .status(200)
        .send(vast.xml({ pretty: true, indent: "  ", newline: "\n" }));
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
