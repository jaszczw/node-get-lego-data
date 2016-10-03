'use strict';
var _ = require('lodash');
const priceWithDelivery = { priceType: 'withDelivery' };

module.exports = transformGetItemsListResult;

function transformGetItemsListResult(allegroDataResult) {
  return {
    itemsCount: allegroDataResult.itemsCount,
    itemsList: transformItemsList(allegroDataResult.itemsList),
  };
};

function transformItemsList(itemsList) {
  if (!itemsList) {
    return [];
  }

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
