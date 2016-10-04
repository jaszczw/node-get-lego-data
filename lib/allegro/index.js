const getSetAuctions = require('./lib/getAuctionsForSet');
const soap = require('soap');

module.exports = {
  getSetAuctions: getSetAuctions(soap),
};
