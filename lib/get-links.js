const getLinks = (setId) => ({
  brickset: 'http://brickset.com/sets/' + setId,
  rebrickable: 'https://rebrickable.com/sets/' + setId,
  bricklink: 'http://www.bricklink.com/v2/catalog/catalogitem.page?S=' + setId,
});

module.exports = getLinks;
