'use strict';
const soap = require('soap');
const _ = require('lodash');
const utils = require('../utils');
const bricksetWSDL = 'http://brickset.com/api/v2.asmx?WSDL';

const apiKey = process.env.BRICKSET_APIKEY;

const getBricksetParams = (options) => (
    Object.assign(
      { api_key: apiKey, },
      options
    )
);

const getAdditionalParams = (options) => {
  const additionalParams = {};

  if (!options.username && !options.userHash) {
    additionalParams.userHash = null;
  }

  return additionalParams;
};

const getReqParams = (setId, options) =>
    Object.assign({
      setNumber: utils.geSetIdWithVersion(setId),
    }, getAdditionalParams(options));

module.exports = (brickset) =>
  (setId, options) =>
      brickset(getBricksetParams(options))
        .then((bs) => bs.getSets(getReqParams(setId, options)))
        .then((result) => _.get(result, ['getSetsResult', 'sets'], [])[0]);
