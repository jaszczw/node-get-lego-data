'use strict';

const utils = require('../../utils/index');
const _ = require('lodash');
const transformItemsList = require('./transformGetItemsListResult');
const getItemsListParams = require('./prepareItemListParams');
const defaultConfig = require('./config');

const getAuctionsForSet = (soap, config) => (setId) => {
  const fetchAllegroData = new Promise(allegroDataFetcher);
  return fetchAllegroData
      .then(transformItemsList);

  function allegroDataFetcher(resolve, reject) {
    soap.createClient(config.allegroWSDL, wsdlGetItemsList);

    function wsdlGetItemsList(err, client) {
      if (err) {
        reject(err);
      }

      let itemsParms = getItemsListParams(setId, config);
      client.doGetItemsList(itemsParms, (err, result) =>
        err ?
        reject(err) :
        resolve(result)
      );
    }
  }
};

const getConfig = (options) => Object.assign({}, defaultConfig, options);

module.exports = (soap) => (setId, options) =>
  _.thru(
      utils.getSetIdWithoutVersion(setId),
      getAuctionsForSet(soap, getConfig(options))
  );
