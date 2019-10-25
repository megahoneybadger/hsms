var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

const {
  RejectReq,
  Message,
  Constants,
  Encoder } = require('../../../src/hsms')


const {
  NoBuilderError,
  TooManyParamsError } = require('../../../src/utils/errors/custom-errors')

describe('Reject Req', () => {
  let rj;

  beforeEach(function () {
    rj = new RejectReq(1, 2);
  });


});