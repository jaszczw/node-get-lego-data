var getBricksetData = require('./getBricksetSetData');
var brickset = require('brickset');

module.exports = {
  getBricksetSetData: getBricksetData(brickset),
};
