'use strict';

const dataProviderDefaultsToActive = true;
const _ = require('lodash');

const isProviderVisibleInConfig = (config) => (value, key) =>
    _.get(config, key, dataProviderDefaultsToActive);

const getProvidersInConfig = (dataProviders, config)  =>
    _.pickBy(dataProviders, isProviderVisibleInConfig(config));

const createLegoDataGetter = (dataProviders, config) =>
    _.thru(getProvidersInConfig(dataProviders, config), constructGetterWithProviders);

const getProvidersData = (providers, setId) =>
   _.map(providers, (provider, providerName) =>
       Promise.resolve(provider(setId))
        .then((providerData) => ({ providerName, providerData }))
        .catch((err) => {
          console.error(`Provider: ${providerName}, failed with: ${err}`);
          return { providerName };
        }));

const mapFetchedData = (providerObjs) => _(providerObjs)
    .reject((provider)=> _.isNil(provider.providerData))
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
