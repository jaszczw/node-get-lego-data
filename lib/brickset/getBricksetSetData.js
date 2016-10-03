'use strict';
var soap = require('soap');
var _ = require('lodash');
var utils = require('../utils');
var bricksetWSDL = 'http://brickset.com/api/v2.asmx?WSDL';

module.exports = (brickset) =>
  function (setId) {
    let config = utils.getConfig('BRICKSET_PRIVATE_CONFIG', __dirname);

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
  };
