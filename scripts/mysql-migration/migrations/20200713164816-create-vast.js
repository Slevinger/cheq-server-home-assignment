const schema = require('../schemas/Vast');

module.exports = {
  up: queryInterface => queryInterface.createTable('vasts', schema),
  down: queryInterface => queryInterface.dropTable('vasts'),
};
