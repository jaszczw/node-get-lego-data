var rebrickable = require('../rebrickable');
var allegro = require('../allegro');
var brickset = require('../brickset');

module.exports = getLegoSetData;

function getLegoSetData(setId) {
  var rbFetch = rebrickable.getRebrickableSet(setId);
  var links = getLinks(setId);
  var allegroFetch = allegro.getSetAuctions(setId);
  var bricksetFetch = brickset.getBricksetSetData(setId);

  return Promise.all([
        rbFetch,
        links,
        allegroFetch,
        bricksetFetch,
    ]).then(function (data) {
          var rbData = data[0];
          var linksData = data[1];
          var allegroData = data[2];
          var bricksetData = data[3];
          console.log('Resolved query for: ', setId);

          return {
              rebrickable: rbData,
              links: linksData,
              allegro: allegroData,
              brickset: bricksetData,
            };
        })
      .catch(function (error) {
          console.error(error);
        });
};

function getLinks(setId) {
  return {
    brickset: 'http://brickset.com/sets/' + setId,
    rebrickable: 'https://rebrickable.com/sets/' + setId,
    bricklink: 'http://www.bricklink.com/v2/catalog/catalogitem.page?S=' + setId,
  };
};
