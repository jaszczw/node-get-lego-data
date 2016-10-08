const getConfig = (envVariableName, dirname) => {
  const envConfig = process.env[envVariableName];
  return envConfig ?
      JSON.parse(envConfig) :
      require(dirname + '/private-config.json');
};

const geSetIdWithVersion = (setId) => setId.includes('-') ? setId : setId + '-1';
const getSetIdWithoutVersion = (setId) => setId.split('-')[0];

module.exports = {
  getConfig: getConfig,
  geSetIdWithVersion: geSetIdWithVersion,
  getSetIdWithoutVersion: getSetIdWithoutVersion,
};
