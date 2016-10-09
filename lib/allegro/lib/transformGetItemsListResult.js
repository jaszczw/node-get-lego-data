'use strict';
const _ = require('lodash');
const priceWithDelivery = { priceType: 'withDelivery' };
const defaultObject = {
  itemsCount: 0,
  itemsList: [],
};

const findPriceInfo = auction => _.find(auction.priceInfo, priceWithDelivery);

const orderAuctionsByPrice = (auctions) =>
    _.sortBy(auctions, (auction) =>
        +findPriceInfo(auction).priceValue
    );

const shortcutItem = (props) => (auction) =>
    props.forEach(prop => auction[prop] = auction[prop].item);

const shortenProps = shortcutItem(['priceInfo', 'photosInfo', 'parametersInfo']);

const addHref = (auction) => {
    auction.href = `http://allegro.pl/show_item.php?item=${auction.itemId}`;
};

const tranformAuctions = (auctions) => {
  auctions.forEach(auction => {
    shortenProps(auction);
    addHref(auction);
  });
  return auctions;
};

const transformItemsList = (itemsList) =>
    _.thru(
        tranformAuctions(itemsList.item),
        orderAuctionsByPrice
    );

const isProperResult = result => _.get(result, 'itemsCount') && _.get(result, 'itemsList');

const getTransformedResult = (result) => ({
    itemsCount: result.itemsCount,
    itemsList: transformItemsList(result.itemsList),
  });

const transformGetItemsListResult = (allegroDataResult) => isProperResult(allegroDataResult) ?
    getTransformedResult(allegroDataResult) :
    Object.assign({}, defaultObject);

module.exports = transformGetItemsListResult;
