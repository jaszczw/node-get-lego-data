'use strict';
var _ = require('lodash');
const priceWithDelivery = { priceType: 'withDelivery' };
const defaultObject = {
  itemsCount: 0,
  itemsList: []
};

module.exports = transformGetItemsListResult;


function transformGetItemsListResult(allegroDataResult) {
  if (!_.get(allegroDataResult, 'itemsCount') || !_.get(allegroDataResult, 'itemsList')) {
    return Object.assign({}, defaultObject);
  }

  return {
    itemsCount: allegroDataResult.itemsCount,
    itemsList: transformItemsList(allegroDataResult.itemsList),
  };
};

function transformItemsList(itemsList) {
  let auctions = itemsList.item;
  auctions = auctions.map(flattenData);
  auctions = orderAuctionsByPrice(auctions);

  return auctions;
}

function flattenData(auction) {
  auction.priceInfo = auction.priceInfo.item;
  auction.photosInfo = auction.photosInfo.item;
  auction.parametersInfo = auction.parametersInfo.item;
  auction.href = `http://allegro.pl/show_item.php?item=${auction.itemId}`;
  return auction;
}

function orderAuctionsByPrice(auctions) {
  return _.sortBy(auctions, function (auction) {
    var priceData = _.find(auction.priceInfo, priceWithDelivery);
    return +priceData.priceValue;
  });
}
