'use strict';

const _ = require('lodash');
const isProviderVisibleInConfig = (config) => (value, key) => _.get(config, key, true);
const legoDataGetter = (dataProviders, config) => {
  var providers = _.pickBy(dataProviders, isProviderVisibleInConfig(config));
  return getLegoSetDataUsing(providers);
};

function getLegoSetDataUsing(providers) {
  return (setId) => {
    var providersData = _.mapValues(providers, (provider, key) => provider(setId)
        .then(function (providerData) {
          return { providerName: key, data: providerData };
        }));

    return Promise.all(_.values(providersData))
        .then(function (dataObjects) {
          var result = {};

          dataObjects.forEach((dataObj)=> {
            result[dataObj.providerName] = dataObj.data;
          });

          return result;
        })
        .catch(function (error) {
          console.error(error);
        });
  };
};

module.exports = {
  createLegoDataGetter: (dataProviders) => (config) => legoDataGetter(dataProviders, config),
};
