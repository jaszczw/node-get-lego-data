const legoSetData = require('../lib/lego-set-data');
const jexpect = expect;
expect = require('chai').expect;

describe('legoSetData', ()=> {
  var legoDataGetter;
  var dataProviders;
  var config;

  beforeEach(() => {
    dataProviders = {
      foo: jest.fn().mockReturnValue(Promise.resolve('fooReturnValue')),
      bar: jest.fn().mockReturnValue('barReturnValue'),
      fooBar: jest.fn().mockReturnValue(Promise.resolve()),
      throwingProvider: jest.fn().mockReturnValue(Promise.reject('error')),
    };
    legoDataGetter = legoSetData.createLegoDataGetter(dataProviders);
    config = { throwingProvider: false };
  });

  it('creates legoDataGetter', () => {
    expect(legoDataGetter).to.be.a('function');
  });

  describe('legoDataGetter(config)', ()=> {

    it('returns data for each valid provider', () => {
      var setId = 'setId';
      return legoDataGetter(config)(setId).then(function (result) {
        expect(result).to.have.property('bar');
        expect(result).to.have.property('foo');
        expect(result.foo).to.equal('fooReturnValue');
        expect(result.bar).to.equal('barReturnValue');

        jexpect(dataProviders.bar)
            .toBeCalledWith('setId');
        jexpect(dataProviders.foo)
            .toBeCalledWith('setId');
      });
    });

    it('returns data for providers ommiting disabled ones', () => {
      config = { foo: false, throwingProvider: false };
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

    it('returns data only for providers that returns correct value', () => {
      var setId = 'setId';
      return legoDataGetter(config)(setId).then(function (result) {
        jexpect(dataProviders.fooBar)
            .toBeCalledWith('setId');

        expect(result).to.not.have.property('fooBar');
      });
    });

    it('resolves correctly even if some providers throw', () => {
      var setId = 'setId';
      return legoDataGetter()(setId).then(function (result) {
        jexpect(dataProviders.throwingProvider)
            .toBeCalledWith('setId');
        jexpect(dataProviders.foo)
            .toBeCalledWith('setId');

        expect(result).to.not.have.property('throwingProvider');
        expect(result).to.have.property('foo');

        expect(result.foo).to.equal('fooReturnValue');
      });
    });

  });

});

