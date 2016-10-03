'use strict';

var _ = require('lodash');
var rp = require('request-promise-native');
var utils = require('../utils');
var config = utils.getConfig('REBRICKABLE_PRIVATE_CONFIG', __dirname);

module.exports = function (setId) {
    var uri = '';
    setId = utils.geSetIdWithVersion(setId);
    return getRebrickableSet(setId);
  };

function getRebrickableSet(setId) {
  var params = createRequestParams(setId);

  return rp(params)
      .catch(()=>
        console.info('There was an error fetching data for set ' + setId + ' from rebrickable')
      )
      .then(transformResponse);
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
  if (!results || !results[0]) { return null; }

  let rbDataObject = results[0];

  return {
    pieces: rbDataObject.pieces,
    description: rbDataObject.descr,
    theme: rbDataObject.theme,
    img_big: rbDataObject.img_big,
    img_sm: rbDataObject.img_sm,
    img_tn: rbDataObject.img_tn,
    year: rbDataObject.year,
  };
}
