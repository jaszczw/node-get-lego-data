'use strict';
const soap = require('soap');
const _ = require('lodash');
const utils = require('../utils');
const bricksetWSDL = 'http://brickset.com/api/v2.asmx?WSDL';

const getPrivateConfig = () => utils.getConfig('BRICKSET_PRIVATE_CONFIG', __dirname);
const getBricksetParams = () =>  ({ api_key: getPrivateConfig().apiKey, });

const getReqParams = (setId) => ({
  userHash: null,
  setNumber: utils.geSetIdWithVersion(setId),
});

module.exports = (brickset) =>
  (setId) => brickset(getBricksetParams())
      .then((bs) => bs.getSets(getReqParams(setId)))
      .then((result) => _.get(result, ['getSetsResult', 'sets'], [])[0]);
