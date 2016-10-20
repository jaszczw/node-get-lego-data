const request = require('request-promise-native');
var getRebrickableSet = require('./getRebrickableSet')(request);

module.exports = {
  getRebrickableSet: getRebrickableSet,
};
