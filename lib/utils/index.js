const geSetIdWithVersion = (setId) => setId.includes('-') ? setId : setId + '-1';
const getSetIdWithoutVersion = (setId) => setId.split('-')[0];

module.exports = {
  geSetIdWithVersion: geSetIdWithVersion,
  getSetIdWithoutVersion: getSetIdWithoutVersion,
};
