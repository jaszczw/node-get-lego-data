'use strict';

const _ = require('lodash');
const envApiKey = process.env.ALLEGRO_APIKEY;

const getFilterOption = (name, value) => ({
  filterId: name,
  filterValueId: { item: value },
});

const getItemsListParams = (setId, config) => {
  const basicFilters = _(config.basicFilters)
      .mapValues((value, key) => getFilterOption(key, value))
      .values()
      .value();

  const filterOptions = basicFilters
          .concat(
              getFilterOption('search', setId)
          );

  const itemsListParams = {
    webapiKey: config.apiKey || envApiKey,
    countryId: config.country,
    filterOptions: {
      item: filterOptions,
    },
    sortOptions: config.sortOptions,
    resultSize: config.resultSize,
  };

  return itemsListParams;
};

module.exports = getItemsListParams;
