const getBricksetData = require('./getBricksetSetData');
const soap = require('soap');

module.exports = {
  getBricksetSetData: getBricksetData(soap),
};
