'use strict';

const _ = require('lodash');

const isProviderVisibleInConfig = (config) => (value, key) => _.get(config, key, true);

const getProvidersInConfig = (dataProviders, config)  =>
    _.pickBy(dataProviders, isProviderVisibleInConfig(config));

const createLegoDataGetter = (dataProviders, config) =>
    _.thru(getProvidersInConfig(dataProviders, config), constructGetterWithProviders);

const getProvidersData = (providers, setId) =>
   _.map(providers, (provider, providerName) => provider(setId)
      .then((providerData) => ({ providerName, providerData })));

const mapFetchedData = (providerObjs) => _(providerObjs)
    .keyBy('providerName')
    .mapValues('providerData')
    .value();

const constructGetterWithProviders = (providers) =>
  (setId) => Promise.all(getProvidersData(providers, setId))
        .then(mapFetchedData)
        .catch(console.error);

module.exports = {
  createLegoDataGetter: (dataProviders) => (config) => createLegoDataGetter(dataProviders, config),
};
