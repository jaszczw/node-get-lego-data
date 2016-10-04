'use strict';

const transformGetItemsListResult = require('../lib/transformGetItemsListResult');
const jexpect = expect;

expect = require('chai').expect;

describe('allegro#transformGetItemsListResult', () => {

  it('returns proper object fo null passed', function () {
    let data = null;
    let transformed = transformGetItemsListResult(data);

    expect(transformed).to.exist;
    expect(transformed.itemsList).to.be.empty;
    expect(transformed.itemsCount).to.be.equal(0);
  });

  it('returns proper object for only itemsCount passed', function () {
    let data = {
      itemsCount: 5,
      itemsList: null,
    };
    let transformed = transformGetItemsListResult(data);

    expect(transformed).to.exist;
    expect(transformed.itemsList).to.be.empty;
    expect(transformed.itemsCount).to.be.equal(0);
  });

  it('returns proper object for only itemsList passed', function () {
    let data = {
      itemsCount: null,
      itemsList: {},
    };
    let transformed = transformGetItemsListResult(data);

    expect(transformed).to.exist;
    expect(transformed.itemsList).to.be.empty;
    expect(transformed.itemsCount).to.be.equal(0);
  });

  it('returns proper object for correct object data', function () {
    var data = require('./allegroResultData.json');
    let transformed = transformGetItemsListResult(data);

    expect(transformed).to.exist;
    expect(transformed.itemsList).to.be.not.empty;
    expect(transformed.itemsCount).to.be.equal(2);

    let firstAuction = transformed.itemsList[0];

    expect(firstAuction).to.exist;
    expect(firstAuction.priceInfo).to.exist;
    expect(firstAuction.priceInfo.item).to.not.exist;
    expect(firstAuction.photosInfo).to.exist;
    expect(firstAuction.photosInfo.item).to.not.exist;
    expect(firstAuction.parametersInfo).to.exist;
    expect(firstAuction.parametersInfo.item).to.not.exist;
    expect(firstAuction.href).to.exist;
  });

});
