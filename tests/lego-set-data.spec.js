const legoSetData = require('../lib/lego-set-data');
const expect = require('chai').expect;

const dataProviders = {
  foo: () => new Promise((resolve)=> resolve(true)),
  bar: () => new Promise((resolve)=> resolve(false)),
};

describe('legoSetData', ()=> {
  var legoDataGetter;

  beforeEach(() => {
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
      });
    });

    it('returns data for providers ommiting disabled ones', () => {
      var config = { foo: false };
      var setId = 'setId';
      return legoDataGetter(config)(setId).then(function (result) {
        expect(result).to.have.property('bar');
        expect(result).to.not.have.property('foo');
      });
    });

  });

});

