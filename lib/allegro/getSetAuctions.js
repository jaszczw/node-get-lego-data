'use strict';
const utils = require('../utils');
const _ = require('lodash');
const transformItemsList = require('./transformGetItemsListResult');
const config = require('./config');

module.exports = (soap) => function getSetAuctions(setId) {
  let privateConfig = utils.getConfig('ALLEGRO_PRIVATE_CONFIG', __dirname);
  setId = utils.getSetIdWithoutVersion(setId);
  let fetchAllegroData = new Promise(allegroDataFetcher);
  return fetchAllegroData
      .then(function (results) {
        return transformItemsList(results);
      });

  function allegroDataFetcher(resolve, reject) {
    soap.createClient(config.allegroWSDL, wsdlGetItemsList);

    function wsdlGetItemsList(err, client) {
      if (err) {
        reject(err);
      }

      let itemsParms = getItemsListParams(setId);
      client.doGetItemsList(itemsParms, responseHandler);
    }

    function responseHandler(err, result, raw, soapHeader) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    }
  }

  function getItemsListParams(setId) {
    var defaultFilters = _(config.defaultFilters)
        .mapValues((value, key) => getFilterOption(key, value))
        .values()
        .value();

    return {
      webapiKey: privateConfig.webapiKey,
      countryId: config.country,
      filterOptions: {
        item: defaultFilters.concat(getFilterOption('search', setId)),
      },
      sortOptions: config.sortOptions,
      resultSize: config.resultSize,
    };
  }
};

function getFilterOption(name, value) {
  return {
      filterId: name,
      filterValueId: { item: value },
    };
}
