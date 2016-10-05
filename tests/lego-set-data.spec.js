const legoSetData = require('../lib/lego-set-data');
const jexpect = expect;
expect = require('chai').expect;

describe('legoSetData', ()=> {
  var legoDataGetter;
  var dataProviders;

  beforeEach(() => {
    dataProviders = {
      foo: jest.fn().mockReturnValue(new Promise((resolve)=> resolve(true))),
      bar: jest.fn().mockReturnValue(new Promise((resolve)=> resolve(false))),
    };
    legoDataGetter = legoSetData.createLegoDataGetter(dataProviders);
  });

  it('creates legoDataGetter', () => {
    expect(legoDataGetter).to.be.a('function');
  });

  describe('legoDataGetter(config)', ()=> {

    it('returns data for each provider', () => {
      var config = {};
      var setId = 'setId';
      return legoDataGetter(config)(setId).then(function (result) {
        expect(result).to.have.property('bar');
        expect(result).to.have.property('foo');

        jexpect(dataProviders.bar)
            .toBeCalledWith('setId');
        jexpect(dataProviders.foo)
            .toBeCalledWith('setId');
      });
    });

    it('returns data for providers ommiting disabled ones', () => {
      var config = { foo: false };
      var setId = 'setId2';
      return legoDataGetter(config)(setId).then(function (result) {

        expect(result).to.have.property('bar');
        expect(result).to.not.have.property('foo');
        jexpect(dataProviders.bar)
            .toBeCalledWith('setId2');
        jexpect(dataProviders.foo.mock.calls.length)
            .toBe(0);
      });
    });

  });

});

