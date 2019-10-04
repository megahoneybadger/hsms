
var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

const {
  DeselectRsp,
  Message,
  Constants,
  Encoder } = require('../../../src/hsms')


const {
  NoBuilderError,
  TooManyParamsError } = require('../../../src/utils/errors/custom-errors')

describe('Deselect Rsp', () => {
  let dr;

  beforeEach(function () {
    dr = new DeselectRsp(1, 2);
  });

  it('should be created with device and context params', () => {
    dr.should.have.property('device').equal(1);
    dr.should.have.property('context').equal(2);
    dr.should.have.property('status').equal(0);
  });

  it('should be created with device, context and status params', () => {
    dr = new DeselectRsp(11, 22, 55);
    dr.should.have.property('device').equal(11);
    dr.should.have.property('context').equal(22);
    dr.should.have.property('status').equal(55);
  });

  it('should be created with device, context and status params passed as strings', () => {
    dr = new DeselectRsp("1", "2", "3");

    dr.should.have.property('device').equal(1);
    dr.should.have.property('context').equal(2);
    dr.should.have.property('status').equal(3);
  });

  it('should not allow to change device, context and status', () => {
    dr.device = 123;
    dr.context = 'test';
    dr.status = {};

    dr.should.have.property('device').equal(1);
    dr.should.have.property('context').equal(2);
    dr.should.have.property('status').equal(0);
  });

  it('should not allow to delete device, context and status', () => {
    dr = new DeselectRsp(11, 22, 55);

    delete dr.device;
    delete dr.context;
    delete dr.status;

    dr.should.have.property('device').equal(11);
    dr.should.have.property('context').equal(22);
    dr.should.have.property('status').equal(55);
  });

  it('should throw an exception if passing non integer device', () => {
    expect(() => {
      new DeselectRsp("asd", {});
    })
      .to.throw(TypeError, Constants.getErrUShortNotInRange("Device"));
  });

  it('should throw an exception if passing negative integer device', () => {
    expect(() => {
      new DeselectRsp(-5, {});
    })
      .to.throw(TypeError, Constants.getErrUShortNotInRange("Device"));
  });

  it('should throw an exception if passing too big integer device', () => {
    expect(() => {
      new DeselectRsp(456789, {});
    })
      .to.throw(TypeError, Constants.getErrUShortNotInRange("Device"));
  });

  it('should throw an exception if passing non integer context', () => {
    expect(() => {
      new DeselectRsp(11, "long string");
    })
      .to.throw(TypeError, Constants.getErrUIntNotInRange("Context"));
  });

  it('should throw an exception if passing negative integer context', () => {
    expect(() => {
      new DeselectRsp("654", -10);
    })
      .to.throw(TypeError, Constants.getErrUIntNotInRange("Context"));
  });

  it('should throw an exception if passing too big integer context', () => {
    expect(() => {
      new DeselectRsp(65535, 172671261526512);
    })
      .to.throw(TypeError, Constants.getErrUIntNotInRange("Context"));
  });

  it('should throw an exception if passing negative integer status', () => {
    expect(() => {
      new DeselectRsp("654", "123", -10);
    })
      .to.throw(TypeError, Constants.getErrUByteNotInRange("Status"));
  });


  it('should throw an exception if passing too big integer status', () => {
    expect(() => {
      new DeselectRsp(65535, 12122, 1726);
    })
      .to.throw(TypeError, Constants.getErrUByteNotInRange("Status"));
  });

  it('should throw an exception if passing too many params', () => {
    expect(() => {
      new DeselectRsp(1, 2, 4, 123);
    })
      .to.throw(TooManyParamsError);
  });

  it('kind must be DeselectRsp', () => {
    expect(dr.kind).to.be.equal(Message.Type.DeselectRsp);
  });

  it('must return valid string description', () => {
    expect(dr.toString()).to.be.equal('deselect rsp');
  });

  it('encode must return valid binary stream #1', () => {
    const encodedArray = Encoder.encode(dr);
    const expectedArray = Buffer.from([00, 00, 00, 0x0a, 00, 01, 00, 00, 00, 04, 00, 00, 00, 02])

    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
  });

  it('encode must return valid binary stream #2', () => {
    dr = new DeselectRsp(1, 2, 3);

    const encodedArray = Encoder.encode(dr);
    const expectedArray = Buffer.from([00, 00, 00, 0x0a, 00, 01, 00, 03, 00, 04, 00, 00, 00, 02])

    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
  });

  it('encode must return valid binary stream #2', () => {
    dr = new DeselectRsp(37, 23, 7);

    const encodedArray = Encoder.encode(dr);
    const expectedArray = Buffer.from([00, 00, 00, 0x0a, 00, 0x25, 00, 7, 00, 04, 00, 00, 00, 0x17])

    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
  });

  it('encode must return valid binary stream #3', () => {
    dr = new DeselectRsp(2781, 37541);

    const encodedArray = Encoder.encode(dr);
    const expectedArray = Buffer.from([00, 00, 00, 0x0a, 0xa, 0xdd, 00, 00, 00, 04, 00, 00, 0x92, 0xa5])

    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
  });








});