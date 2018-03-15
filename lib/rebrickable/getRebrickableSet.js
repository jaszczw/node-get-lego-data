'use strict';

const utils = require('../utils');
const apiKey = process.env.REBRICKABLE_APIKEY;
const commonRequestParams = {
  headers: {
    'User-Agent': 'Request-Promise',
    'Authorization': `key ${apiKey}`
  },
  json: true,
};

const createRequestParams = (setId) => ({
  ...commonRequestParams,
  uri: `https://rebrickable.com/api/v3/lego/sets/${setId}`,
});

const fetchThemeName = (request) => (themeId) =>
  request({
    ...commonRequestParams,
    uri: `https://rebrickable.com/api/v3/lego/themes/${themeId}`,
  }).then((res) => res.name);

const getErrorMessage = setId => err =>
  console.info(`There was an error fetching data for set ${setId} from rebrickable`, err);

const getRebrickableSet = (request) => (setId) => {
  const parsedSetId = utils.geSetIdWithVersion(setId);
  const requestsParams = createRequestParams(parsedSetId);

  return request(requestsParams)
    .then((data) =>
      fetchThemeName(request)(data.theme_id)
        .then((themeName) => ({
          ...data,
          theme: themeName
        }))
    )
    .catch(getErrorMessage(parsedSetId))
};

module.exports = getRebrickableSet;
