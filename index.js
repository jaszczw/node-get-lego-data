const rebrickable = require('./lib/rebrickable');
const allegro = require('./lib/allegro');
const brickset = require('./lib/brickset');
const getLinks = require('./lib/get-links');
const legoData = require('./lib/lego-set-data');

const dataProviders = {
  rebrickable: rebrickable.getRebrickableSet,
  allegro:  allegro.getSetAuctions,
  brickset: brickset.getBricksetSetData,
  links: getLinks,
};

module.exports = legoData.createLegoDataGetter(dataProviders);
