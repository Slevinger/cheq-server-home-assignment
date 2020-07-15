const { Vast } = require("../../scripts/mysql-migration/models");

const createVast = async vast => Vast.create(vast);

const deleteVast = async id => Vast.destroy({ where: { id } });

const updateVast = async (id, patch) =>
  Vast.update(patch, {
    where: {
      id
    }
  });

const findVasts = async props => Vast.findAll(props);

const findVastsById = async id => Vast.findByPk(id);

module.exports = {
  findVasts,
  findVastsById,
  createVast,
  updateVast,
  deleteVast
};
