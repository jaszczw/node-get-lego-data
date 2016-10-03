'use strict';
var soap = require('soap');
var _ = require('lodash');
var utils = require('../utils');
var config = utils.getConfig('BRICKSET_PRIVATE_CONFIG', __dirname);
var bricksetWSDL = 'http://brickset.com/api/v2.asmx?WSDL';
var brickset = require('brickset');

module.exports = function (setId) {
  return getBricksetSet(setId);
};

function getBricksetSet(setId) {
  return brickset({
    api_key: config.apiKey,
  }).then(function (bs) {
    return bs.getSets({
      userHash: null,
      setNumber: utils.geSetIdWithVersion(setId),
    });
  }).then(function (result) {
    return _.get(result, ['getSetsResult', 'sets'], [])[0];
  });
}
