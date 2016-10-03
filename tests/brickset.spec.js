'use strict';

const getBricksetSetData = require('../lib/brickset/getBricksetSetData');

process.env.BRICKSET_PRIVATE_CONFIG = '{ "apiKey" : "apiKey"}';

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
        .mockReturnValue({ then: () => getSetsResult });

    bricksetModuleMock = jest.fn()
      .mockReturnValue(new Promise((resolve)=> resolve({ getSets:
        bricksetGetSetsMock,
    })));
  });

  it('calls bricksetModule with apiKey', () => {
    getBricksetSetData(bricksetModuleMock)('setId');
    jexpect(bricksetModuleMock).toBeCalledWith({ api_key: 'apiKey' });
  });

  it('calls brickset API getSets method', () => {
    getBricksetSetData(bricksetModuleMock)('setId').then(function () {
      jexpect(bricksetModuleMock).toBeCalledWith({ api_key: 'apiKey' });
      jexpect(bricksetGetSetsMock).toBeCalledWith({ setNumber: 'setId-1' });
    });

  });
});

