'use strict';
const utils = require('../../utils/index');
const _ = require('lodash');
const transformItemsList = require('./transformGetItemsListResult');
const config = require('./config');

const getFilterOption = (name, value) => ({
  filterId: name,
  filterValueId: { item: value },
});

const defaultFilters = _(config.defaultFilters)
    .mapValues((value, key) => getFilterOption(key, value))
    .values()
    .value();

const getPrivateConfig = () => utils.getConfig('ALLEGRO_PRIVATE_CONFIG', __dirname);
const getItemsListParams = (setId) =>({
  webapiKey: getPrivateConfig().webapiKey,
  countryId: config.country,
  filterOptions: {
    item: defaultFilters.concat(getFilterOption('search', setId)),
  },
  sortOptions: config.sortOptions,
  resultSize: config.resultSize,
});

module.exports = (soap) => (setId) =>
  _.thru(
    utils.getSetIdWithoutVersion(setId),
    getAuctionsForSet(soap)
  );

const getAuctionsForSet = (soap) => (setId) => {
    const fetchAllegroData = new Promise(allegroDataFetcher);
    return fetchAllegroData
      .then(transformItemsList);

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
  };
