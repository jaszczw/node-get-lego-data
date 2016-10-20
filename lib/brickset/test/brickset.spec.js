'use strict';

process.env.BRICKSET_APIKEY = 'apiKey';
const getBricksetSetData = require('../getBricksetSetData');

describe('getBricksetSetData', function () {
  var jexpect = expect,
      bricksetModuleMock,
      bricksetGetSetsMock;

  expect = require('chai').expect;

  beforeEach(() => {
    let getSetsResult = {
      getSetsResult: { sets: ['fetchedSetData'] },
    };

    bricksetGetSetsMock = jest.fn()
        .mockReturnValue(Promise.resolve(getSetsResult));

    bricksetModuleMock = jest.fn()
      .mockReturnValue(Promise.resolve({ getSets:
        bricksetGetSetsMock,
    }));
  });

  it('calls bricksetModule with apiKey', () => {
    return getBricksetSetData(bricksetModuleMock)('setId').then(function () {
      jexpect(bricksetModuleMock).toBeCalledWith({ api_key: 'apiKey' });
    });
  });

  it('calls brickset API getSets method', () => {
    return getBricksetSetData(bricksetModuleMock)('setId')
      .then(function (result) {
        jexpect(bricksetModuleMock).toBeCalledWith({ api_key: 'apiKey' });
        jexpect(bricksetGetSetsMock).toBeCalledWith({ setNumber: 'setId-1', userHash: null });
        expect(result).to.equal('fetchedSetData');
      });
  });

  it('calls brickset API with userName and password', () => {
    return getBricksetSetData(bricksetModuleMock)('setId', { username: 'test', password: 'pwd' })
      .then(function () {
        jexpect(bricksetModuleMock)
          .toBeCalledWith({
            api_key: 'apiKey',
            username: 'test',
            password: 'pwd',
          });
        jexpect(bricksetGetSetsMock)
          .toBeCalledWith({
            setNumber: 'setId-1',
          });
      });
  });

  it('calls brickset API with userHash', () => {
    return getBricksetSetData(bricksetModuleMock)('setId', { userHash: 'abc' })
      .then(function () {
        jexpect(bricksetModuleMock)
          .toBeCalledWith({
            api_key: 'apiKey',
            userHash: 'abc',
          });
        jexpect(bricksetGetSetsMock)
          .toBeCalledWith({
            setNumber: 'setId-1'
          });
      });
  });
});
