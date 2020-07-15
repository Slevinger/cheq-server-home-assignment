var VAST = require("vast-xml");

module.exports = ({ id, width, height, position, vastUrl }) => {
  const vastXml = new VAST();

  const ad = vastXml.attachAd({
    id: id,
    structure: "inline",
    AdTitle: "",
    AdSystem: { name: "Cheq Ad Server", version: "2.0" }
  });

  const creative = ad.attachCreative("Linear", {
    Duration: "00:00:00"
  });
  creative.attachMediaFile(vastUrl, {
    id: id,
    type: "application/javascript",
    width,
    height,
    position,
    maintainAspectRatio: "true",
    apiFramework: "VPAID"
  });

  return vastXml.xml({ pretty: true, indent: "  ", newline: "\n" });
};
