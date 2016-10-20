'use strict';

const dataProviderDefaultsToActive = true;
const _ = require('lodash');

const isProviderActive = (options) => (value, key) =>
    _.get(options, key, dataProviderDefaultsToActive);

const getActiveProviders = (dataProviders, options)  =>
    _.pickBy(dataProviders, isProviderActive(options));

const getProvidersData = (providers, setId) =>
    _.map(providers, (provider, providerName) =>
        Promise.resolve(provider(setId))
            .then((providerData) => ({ providerName, providerData }))
            .catch((err) => {
              console.error(`Provider: ${providerName}, failed with: ${err}`);
              return { providerName };
            }));

const mapFetchedData = (providerObjs) => _(providerObjs)
    .reject((provider) => _.isNil(provider.providerData))
    .keyBy('providerName')
    .mapValues('providerData')
    .value();

const getDataForProviders = (providers, setId) =>
    Promise.all(getProvidersData(providers, setId))
      .then(mapFetchedData)
      .catch(console.error);

module.exports = {
  createConfigurableLegoDataGetter: (dataProviders) => (options) => {
    const providers = getActiveProviders(dataProviders, options);
    return (setId) => getDataForProviders(providers, setId);
  },
};
