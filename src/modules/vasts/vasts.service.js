const MySQLClient = require("../../helpers/MySQLClient");

async function findVastsById(id) {
  const data = await MySQLClient.findVastsById(id);
  return data;
}

async function findVasts() {
  const data = await MySQLClient.findVasts({
    attributes: ["id", "vastUrl", "position", "width", "height"]
  });
  return {
    vasts: data.map(({ dataValues }) => ({ ...dataValues }))
  };
}

async function updateVasts(body) {
  const { vastId } = body;
  await MySQLClient.updateVast(vastId, body);
  const res = await MySQLClient.findVastsById(vastId);
  return res;
}

async function createVasts(body) {
  const data = await MySQLClient.createVast(body);
  return data;
}

async function deleteVast(id) {
  const data = await MySQLClient.deleteVast(id);
  return data;
}

module.exports = {
  createVasts,
  updateVasts,
  findVasts,
  findVastsById,
  deleteVast
};
