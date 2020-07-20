const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("../../mysql-migration/config/config")[env];
const models = {};
let sequelize;

sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    let modelDefenition = path.join(__dirname, file);
    let model = require(modelDefenition)(sequelize);
    db[model.name] = model;
  });

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(db);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
