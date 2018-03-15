'use strict';
const getOr = require('lodash/fp/getOr');
const head = require('lodash/fp/head');
const flow = require('lodash/fp/flow');
const utils = require("../utils");

const bricksetWSDL = 'https://brickset.com/api/v2.asmx?WSDL';

const apiKey = process.env.BRICKSET_APIKEY;
const fields = {
  apiKey:null,
  userHash:null,
  query:null,
  theme:null,
  subtheme:null,
  setNumber:null,
  year:null,
  owned:null,
  wanted:null,
  orderBy:null,
  pageSize:null,
  pageNumber:null,
  userName:null,
};

module.exports = (soap) => (setId) => {
  return soap.createClientAsync(bricksetWSDL).then((client) => {
    client.setEndpoint(bricksetWSDL);

    return client.getSetsAsync(Object.assign({}, fields, {
      apiKey,
      setNumber: utils.geSetIdWithVersion(setId)
    })).then(flow(
      getOr([], ['getSetsResult', 'sets']),
      head
    ));
  });
};

module.exports.apiKey = apiKey;
