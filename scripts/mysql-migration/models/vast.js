const schema = require("../schemas/Vast");

module.exports = sequelize => {
  const Vasts = sequelize.define("Vast", schema, {
    tableName: "vasts"
  });
  return Vasts;
};
