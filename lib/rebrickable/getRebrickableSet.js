'use strict';

const _ = require('lodash');
const request = require('request-promise-native');
const utils = require('../utils');

const getPrivateConfig = () => utils.getConfig('REBRICKABLE_PRIVATE_CONFIG', __dirname);
const createRequestParams = (setId) =>({
  uri: 'https://rebrickable.com/api/get_set',
  qs: {
    format: 'json',
    key: getPrivateConfig().apiKey,
    set_id: setId,
  },
  headers: {
    'User-Agent': 'Request-Promise',
  },
  json: true,
});

const getRebrickableSet = (setId) =>
    _.thru(createRequestParams(setId), request)
    .catch((err) =>
      console.info(`There was an error fetching data for set ${setId} from rebrickable`, err)
    )
    .then(_.head);

module.exports = (setId) => _.thru(utils.geSetIdWithVersion(setId), getRebrickableSet);
