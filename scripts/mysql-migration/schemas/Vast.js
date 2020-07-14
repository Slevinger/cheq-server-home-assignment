const Sequelize = require("sequelize");

module.exports = {
  // attributes
  id: {
    allowNull: false,
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  vastUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  position: {
    type: Sequelize.ENUM,
    values: [
      "top_left",
      "top_middle",
      "top_right",
      "middle_left",
      "middle_right",
      "bottom_left",
      "bottom_middle",
      "bottom_right",
    ],
    allowNull: false,
    defaultValue: "bottom_right",
  },
  width: {
    type: Sequelize.INTEGER,
    len: [100, 1000],
  },
  height: {
    type: Sequelize.INTEGER,
    len: [100, 1000],
  },
};
