'use strict';

process.env.REBRICKABLE_APIKEY = 'apiKey';
const getRebrickableSet = require('../getRebrickableSet');
const expectedRestArgs = (setID) => ({
  headers: { 'User-Agent': 'Request-Promise' },
  json: true, qs: { format: 'json', key: 'apiKey', set_id: setID },
  uri: 'https://rebrickable.com/api/get_set',
});

describe('getRebrickableSet', function () {
  let jexpect = expect;
  let requestMock;

  expect = require('chai').expect;

  describe('given correct response', () => {
    var expectedResult = {};

    beforeEach(() => {
      requestMock = jest.fn()
          .mockReturnValue(Promise.resolve([expectedResult]));
    });

    it('It returns promise', () => {
      const setId = '70404-1';
      const result = getRebrickableSet(requestMock)(setId);
      expect(result).to.be.a('Promise');
    });

    it('generates correct call', ()=> {
      const setId = '70404-1';
      return getRebrickableSet(requestMock)(setId).then(function () {
        jexpect(requestMock)
            .toBeCalledWith(expectedRestArgs(setId));
      });
    });

    it('retrives correct value', ()=> {
      const setId = '70404';
      return getRebrickableSet(requestMock)(setId)
        .then(function (result) {
          expect(expectedResult).to.be.equal(result);
        });
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
