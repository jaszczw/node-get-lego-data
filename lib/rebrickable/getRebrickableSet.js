'use strict';

var _ = require('lodash');
var rp = require('request-promise-native');
var utils = require('../utils');
var config = utils.getConfig('REBRICKABLE_PRIVATE_CONFIG', __dirname);

module.exports = getRebrickableSet;

function getRebrickableSet(setId) {
  setId = utils.geSetIdWithVersion(setId);
  var params = createRequestParams(setId);

  return rp(params)
      .catch(()=>
        console.info('There was an error fetching data for set ' + setId + ' from rebrickable')
      )
      .then((results) => _.get(results, '[0]', null));
}

function createRequestParams(setId) {
  return {
    uri: 'https://rebrickable.com/api/get_set',
    qs: {
      format: 'json',
      key: config.apiKey,
      set_id: setId,
    },
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true,
  };
}

function transformResponse(results) {
  return results[0] || null;
}
