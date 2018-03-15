'use strict';
require('dotenv').config({silent: true});

const request = require('request-promise-native');
const getRebrickableSet = require('../getRebrickableSet');

describe('getRebrickableSet-intergration', function () {
  it('Properly resolve set returning its data', () => {
    return getRebrickableSet(request)('75101');
  });
});

describe('getRebrickableSet', function () {
  let requestMock = null;
  const expect = require('chai').expect;

  describe('given correct response', () => {
    const expectedResult = {};

    beforeEach(() => {
      requestMock = jest.fn()
        .mockReturnValue(Promise.resolve([expectedResult]));
    });

    it('It returns promise', () => {
      const setId = '70404-1';
      const result = getRebrickableSet(requestMock)(setId);
      expect(result).to.be.a('Promise');
    });
  });

  describe('provided error', () => {

    beforeEach(() => {
      requestMock = jest.fn()
        .mockReturnValue(Promise.reject(null));
    });

    it('retrives no value', () => {
      const setId = '70404';
      return getRebrickableSet(requestMock)(setId)
        .then((result) => {
          expect(result).to.be.undefined;
        });
    });
  });
});
