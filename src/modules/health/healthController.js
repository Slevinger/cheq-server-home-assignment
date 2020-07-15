module.exports.checkHealth = (req, res) => {
  console.log('Checking health...');
  const message = {
    version: module.exports.version,
    message: 'OK',
  };
  res.json(message);
};
