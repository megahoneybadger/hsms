var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

const {
  SeparateReq,
  Message,
  Constants,
  Encoder } = require('../../../src/hsms')


const {
  NoBuilderError,
  TooManyParamsError } = require('../../../src/utils/errors/custom-errors')

const separateDevice = 0xFFFF;

describe('Separate Req', () => {
  let sr;

  beforeEach(function () {
    sr = new SeparateReq(1);
  });

  it('should be created with context param', () => {
    sr.should.have.property('device').equal(separateDevice);
    sr.should.have.property('context').equal(1);
  });

  it('should be created with context params passed as strings', () => {
    sr = new SeparateReq("2");

    sr.should.have.property('device').equal(separateDevice);
    sr.should.have.property('context').equal(2);
  });

  it('should not allow to change device and context', () => {
    sr.device = 123;
    sr.context = 'test';

    sr.should.have.property('device').equal(separateDevice);
    sr.should.have.property('context').equal(1);
  });

  it('should not allow to delete device and context', () => {
    sr = new SeparateReq(22);

    delete sr.device;
    delete sr.context;

    sr.should.have.property('device').equal(separateDevice);
    sr.should.have.property('context').equal(22);
  });

  it('should throw an exception if passing non integer context', () => {
    expect(() => {
      new SeparateReq("long string");
    })
      .to.throw(TypeError, Constants.getErrUIntNotInRange("Context"));
  });

  it('should throw an exception if passing negative integer context', () => {
    expect(() => {
      new SeparateReq(-10);
    })
      .to.throw(TypeError, Constants.getErrUIntNotInRange("Context"));
  });

  it('should throw an exception if passing too big integer context', () => {
    expect(() => {
      new SeparateReq(172671261526512);
    })
      .to.throw(TypeError, Constants.getErrUIntNotInRange("Context"));
  });

  it('should throw an exception if passing too many params', () => {
    expect(() => {
      new SeparateReq(1, 2, 4, 123);
    })
      .to.throw(TooManyParamsError);
  });

  it('kind must be SeparateReq', () => {
    expect(sr.kind).to.be.equal(Message.Type.SeparateReq);
  });

  it('encode must return valid binary stream #1', () => {
    const encodedArray = Encoder.encode(sr);
    const expectedArray = Buffer.from([00, 00, 00, 0x0a, 0xFF, 0xFF, 00, 00, 00, 09, 00, 00, 00, 01])

    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
  });

  it('encode must return valid binary stream #2', () => {
    const sr = new SeparateReq(23);

    const encodedArray = Encoder.encode(sr);
    const expectedArray = Buffer.from([00, 00, 00, 0x0a, 0xFF, 0xFF, 00, 00, 00, 09, 00, 00, 00, 0x17])

    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
  });

  it('encode must return valid binary stream #3', () => {
    const sr = new SeparateReq(37541);

    const encodedArray = Encoder.encode(sr);
    const expectedArray = Buffer.from([00, 00, 00, 0x0a, 0xFF, 0xFF, 00, 00, 00, 09, 00, 00, 0x92, 0xa5])

    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
  });

  it('must return valid string description', () => {
    expect(sr.toString()).to.be.equal('separate req');
  });

  it('must be a message without reply', () => {
    expect(sr.isReplyRequired).to.be.equal(false);
  });
});