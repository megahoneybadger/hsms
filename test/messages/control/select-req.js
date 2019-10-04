var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

const {
  SelectReq,
  Message,
  Constants,
  Encoder } = require('./../../../src/hsms')


const {
  NoBuilderError,
  TooManyParamsError } = require('../../../src/utils/errors/custom-errors')

describe('Select Req', () => {
  let sr;

  beforeEach(function () {
    sr = new SelectReq(1, 2);
  });

  it('should be created with device and context params', () => {
    sr.should.have.property('device').equal(1);
    sr.should.have.property('context').equal(2);
  });

  it('should be created with device and context params passed as strings', () => {
    sr = new SelectReq("1", "2");

    sr.should.have.property('device').equal(1);
    sr.should.have.property('context').equal(2);
  });

  it('should not allow to change device and context', () => {
    sr.device = 123;
    sr.context = 'test';

    sr.should.have.property('device').equal(1);
    sr.should.have.property('context').equal(2);
  });

  it('should not allow to delete device and context', () => {
    sr = new SelectReq(11, 22);

    delete sr.device;
    delete sr.context;

    sr.should.have.property('device').equal(11);
    sr.should.have.property('context').equal(22);
  });


  it('should throw an exception if passing non integer device', () => {
    expect(() => {
      const sr = new SelectReq("asd", {});
    })
      .to.throw(TypeError, Constants.getErrUShortNotInRange("Device"));
  });

  it('should throw an exception if passing negative integer device', () => {
    expect(() => {
      const sr = new SelectReq(-5, {});
    })
      .to.throw(TypeError, Constants.getErrUShortNotInRange("Device"));
  });

  it('should throw an exception if passing too big integer device', () => {
    expect(() => {
      const sr = new SelectReq(456789, {});
    })
      .to.throw(TypeError, Constants.getErrUShortNotInRange("Device"));
  });

  it('should throw an exception if passing non integer context', () => {
    expect(() => {
      const sr = new SelectReq(11, "long string");
    })
      .to.throw(TypeError, Constants.getErrUIntNotInRange("Context"));
  });

  it('should throw an exception if passing negative integer context', () => {
    expect(() => {
      const sr = new SelectReq("654", -10);
    })
      .to.throw(TypeError, Constants.getErrUIntNotInRange("Context"));
  });

  it('should throw an exception if passing too big integer context', () => {
    expect(() => {
      const sr = new SelectReq(65535, 172671261526512);
    })
      .to.throw(TypeError, Constants.getErrUIntNotInRange("Context"));
  });

  it('should throw an exception if passing too many params', () => {
    expect(() => {
      const sr = new SelectReq(1, 2, 4, 123);
    })
      .to.throw(TooManyParamsError);
  });

  it('kind must be SelectReq', () => {
    expect(sr.kind).to.be.equal(Message.Type.SelectReq);
  });

  it('encode must return valid binary stream #1', () => {
    const encodedArray = Encoder.encode(sr);
    const expectedArray = Buffer.from([00, 00, 00, 0x0a, 00, 01, 00, 00, 00, 01, 00, 00, 00, 02])

    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
  });

  it('encode must return valid binary stream #2', () => {
    const sr = new SelectReq(37, 23);

    const encodedArray = Encoder.encode(sr);
    const expectedArray = Buffer.from([00, 00, 00, 0x0a, 00, 0x25, 00, 00, 00, 01, 00, 00, 00, 0x17])

    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
  });

  it('encode must return valid binary stream #3', () => {
    const sr = new SelectReq(2781, 37541);

    const encodedArray = Encoder.encode(sr);
    const expectedArray = Buffer.from([00, 00, 00, 0x0a, 0xa, 0xdd, 00, 00, 00, 01, 00, 00, 0x92, 0xa5])

    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
  });

  it('must return valid string description', () => {
    expect(sr.toString()).to.be.equal('select req');
  });

});