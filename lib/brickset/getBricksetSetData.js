'use strict';
const soap = require('soap');
const _ = require('lodash');
const utils = require('../utils');
const bricksetWSDL = 'http://brickset.com/api/v2.asmx?WSDL';

const config = utils.getConfig('BRICKSET_PRIVATE_CONFIG');
//TODO WJ: Add here username and password if stored in config
const getBricksetParams = () =>  ({ api_key: config.apiKey, });

const getReqParams = (setId) => ({
  userHash: null,
  setNumber: utils.geSetIdWithVersion(setId),
});

module.exports = (brickset) =>
  (setId) => brickset(getBricksetParams())
      .then((bs) => bs.getSets(getReqParams(setId)))
      .then((result) => _.get(result, ['getSetsResult', 'sets'], [])[0]);
