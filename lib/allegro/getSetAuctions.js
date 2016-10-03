'use strict';
var soap = require('soap');
var utils = require('../utils');
var transformItemsList = require('./transformGetItemsListResult');
var config = utils.getConfig('ALLEGRO_PRIVATE_CONFIG', __dirname);
var allegroWSDL = 'https://webapi.allegro.pl/service.php?wsdl';

module.exports = getSetAuctions;

function getSetAuctions(setId) {
  setId = utils.getSetIdWithoutVersion(setId);
  let fetchAllegroData = new Promise(allegroDataFetcher);
  return fetchAllegroData
      .then(function (results) {
        return transformItemsList(results);
      });

  function allegroDataFetcher(resolve, reject) {
    soap.createClient(allegroWSDL, wsdlGetItemsList);

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
}

function getItemsListParams(setId) {
  return {
    webapiKey: config.webapiKey,
    countryId: config.country,
    filterOptions: {
      item: [
        getFilterOption('category', '17865'), //Lego category
        getFilterOption('search', setId),
        getFilterOption('offerType', 'buyNow'),
        getFilterOption('128068', '3'), //Only whole sets
      ],
    },
    sortOptions: {
      sortType: 'priceDelivery',
    },
    resultSize: 10,
  };
}

function getFilterOption(name, value) {
  return {
      filterId: name,
      filterValueId: { item: value },
    };
}
