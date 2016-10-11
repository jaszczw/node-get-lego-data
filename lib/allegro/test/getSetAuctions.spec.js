'use strict';

const getAuctionsForSet = require('../lib/getAuctionsForSet');
const jexpect = expect;

expect = require('chai').expect;

describe('allegro#getSetAuctions', () => {

  let allegroClientMock,
      soapMock,
      result = { itemsCount: 0, itemsList: null };

  process.env.ALLEGRO_PRIVATE_CONFIG = '{"webapiKey": "webApiKey"}';

  beforeEach(()=> {
    allegroClientMock = {
      doGetItemsList: jest.fn().mockImplementation((params, responseHandler) => {
        responseHandler(null, result);
      }),
    };
    soapMock = { createClient: (a, cb)=> cb(null, allegroClientMock) };
  });

  it('makes proper request to a soap', function () {
    return getAuctionsForSet(soapMock)('setId')
        .then(function () {
          jexpect(allegroClientMock.doGetItemsList)
              .toBeCalled();

          let firstCall = allegroClientMock.doGetItemsList.mock.calls[0];
          let callParams = firstCall[0];
          let filterOptions = callParams.filterOptions.item;
          let searchFilter = [{
              filterId: 'search',
              filterValueId: { item: 'setId' },
            },
          ];
          expect(callParams).to.have.property('webapiKey').equal('webApiKey');
          expect(callParams).to.have.property('filterOptions');
          expect(filterOptions).to.deep.include.members(searchFilter);
        });
  });

  it('makes returns result from soap call', function () {
    return getAuctionsForSet(soapMock)('setId')
        .then(function (actualResult) {
          jexpect(allegroClientMock.doGetItemsList)
              .toBeCalled();

          expect(actualResult).to.deep.equal({ itemsCount: 0, itemsList: [] });
        });
  });
});
