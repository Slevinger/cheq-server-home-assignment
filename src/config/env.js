const env = {};

function getKeyByValue(object, value) {
  return Object.keys(object).filter(key => object[key] === value);
}

env.init = () => {
  env.PORT = Number(process.env.PORT) || 'MISSING';

  env.DEFAULT_PAGE_SIZE = Number(process.env.DEFAULT_PAGE_SIZE || 25);
  // google variables
  env.DB_HOST = process.env.DB_HOST || 'MISSING';
  env.DB_PORT = process.env.DB_PORT || 'MISSING';
  env.DB_NAME = process.env.DB_NAME || 'MISSING';

  env.NODE_ENV = process.env.NODE_ENV || 'MISSING';
  const missingFields = getKeyByValue(env, 'MISSING');

  if (missingFields.length > 0) {
    console.error('missing mandatory env variables', missingFields);
    process.exit(1);
  }
  return env;
};

module.exports = env;
