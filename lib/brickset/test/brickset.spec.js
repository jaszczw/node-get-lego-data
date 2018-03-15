'use strict';
require('dotenv').config({silent: true});

const soap = require('soap');
const getBricksetSetData = require('../getBricksetSetData');

describe('getBricksetSetData-integration', function () {
  const expect = require('chai').expect;

  it('calls bricksetData and retrievies sets results', () => {
    return getBricksetSetData(soap)('75101-1')
      .then((result) => {
        expect(result).to.be.a('Object');
        expect(result).to.have.property('number');
        expect(result).to.have.property('setID');
        expect(result).to.have.property('name');
      })
  });
});
