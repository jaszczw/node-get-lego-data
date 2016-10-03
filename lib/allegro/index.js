const getSetAuctions = require('./getSetAuctions');
const soap = require('soap');

module.exports = {
  getSetAuctions: getSetAuctions(soap),
};
