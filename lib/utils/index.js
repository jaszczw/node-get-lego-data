const getConfig = (envVariableName, defaultConfig) => {
  const envConfig = process.env[envVariableName];
  return envConfig ?
     Object.assign({}, defaultConfig, JSON.parse(envConfig)) : Object.assign(defaultConfig);
};

const geSetIdWithVersion = (setId) => setId.includes('-') ? setId : setId + '-1';
const getSetIdWithoutVersion = (setId) => setId.split('-')[0];

module.exports = {
  getConfig: getConfig,
  geSetIdWithVersion: geSetIdWithVersion,
  getSetIdWithoutVersion: getSetIdWithoutVersion,
};
