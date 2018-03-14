'use strict';

const _ = require('lodash');
const utils = require('../utils');
const apiKey = process.env.REBRICKABLE_APIKEY;
const createRequestParams = (setId) =>({
  uri: 'https://rebrickable.com/api/get_set',
  qs: {
    format: 'json',
    key: apiKey,
    set_id: setId,
  },
  headers: {
    'User-Agent': 'Request-Promise',
  },
  json: true,
});

const getErrorMessage = setId => err =>
    console.info(`There was an error fetching data for set ${setId} from rebrickable`, err);

const getRebrickableSet = (request) => (setId) => {
  const parsedSetId = utils.geSetIdWithVersion(setId);
  const requestsParams = createRequestParams(parsedSetId);

  return request(requestsParams)
      .catch(getErrorMessage(parsedSetId))
      .then(_.head);
};

module.exports = getRebrickableSet;
