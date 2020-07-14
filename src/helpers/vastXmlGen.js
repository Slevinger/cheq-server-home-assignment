const libxmljs = require("libxmljs");

const xmlString = vast => {
  const { id, width, height, position, vastUrl } = vast;
  return `
  <VAST version="2.0">
    <Ad>
        <InLine>
            <AdSystem>2.0</AdSystem>
            <Impression/>
            <Creatives>
            <Creative>
            <Linear>
                <MediaFiles>
                    <MediaFile type="application/javascript" apiFramework="VPAID" height="${height}" width="${width}" delivery="progressive">
                    <![CDATA[
                    https://cheq.com/vpaid.js?vast=${vastUrl}&position=${position}&vastId=${id}
                    ]]>
                    </MediaFile>
                </MediaFiles>
            </Linear>
            </Creative>
            </Creatives>
        </InLine>
    </Ad>
</VAST>
  `;
};

module.exports = vast => {
  const xmlStr = xmlString(vast);
  return libxmljs.parseXml(xmlStr);
};
