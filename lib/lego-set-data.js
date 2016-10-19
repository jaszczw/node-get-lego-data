'use strict';

const dataProviderDefaultsToActive = true;
const _ = require('lodash');

const isProviderActive = (options) => (value, key) =>
    _.get(options, key, dataProviderDefaultsToActive);

const getActiveProviders = (dataProviders, options)  =>
    _.pickBy(dataProviders, isProviderActive(options));

const createLegoDataGetter = (dataProviders, options) =>
    _.thru(getActiveProviders(dataProviders, options), constructGetterWithProviders);

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
  createConfigurableLegoDataGetter: (dataProviders) => (options) =>
      createLegoDataGetter(dataProviders, options),
};
