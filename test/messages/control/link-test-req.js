var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

const {
  LinkTestReq,
  Message,
  Constants,
  Encoder } = require('../../../src/hsms')


const {
  NoBuilderError,
  TooManyParamsError } = require('../../../src/utils/errors/custom-errors')

const linkTestDevice = 0xFFFF;

describe('LinkTest Req', () => {
  let ltr;

  beforeEach(function () {
    ltr = new LinkTestReq(1);
  });

  it('should be created with context param', () => {
    ltr.should.have.property('device').equal(linkTestDevice);
    ltr.should.have.property('context').equal(1);
  });

  it('should be created with context params passed as strings', () => {
    ltr = new LinkTestReq("2");

    ltr.should.have.property('device').equal(linkTestDevice);
    ltr.should.have.property('context').equal(2);
  });

  it('should not allow to change device and context', () => {
    ltr.device = 123;
    ltr.context = 'test';

    ltr.should.have.property('device').equal(linkTestDevice);
    ltr.should.have.property('context').equal(1);
  });

  it('should not allow to delete device and context', () => {
    ltr = new LinkTestReq(22);

    delete ltr.device;
    delete ltr.context;

    ltr.should.have.property('device').equal(linkTestDevice);
    ltr.should.have.property('context').equal(22);
  });

  it('should throw an exception if passing non integer context', () => {
    expect(() => {
      new LinkTestReq("long string");
    })
      .to.throw(TypeError, Constants.getErrUIntNotInRange("Context"));
  });

  it('should throw an exception if passing negative integer context', () => {
    expect(() => {
      new LinkTestReq(-10);
    })
      .to.throw(TypeError, Constants.getErrUIntNotInRange("Context"));
  });

  it('should throw an exception if passing too big integer context', () => {
    expect(() => {
      new LinkTestReq(172671261526512);
    })
      .to.throw(TypeError, Constants.getErrUIntNotInRange("Context"));
  });

  it('should throw an exception if passing too many params', () => {
    expect(() => {
      new LinkTestReq(1, 2, 4, 123);
    })
      .to.throw(TooManyParamsError);
  });

  it('kind must be LinkTestReq', () => {
    expect(ltr.kind).to.be.equal(Message.Type.LinkTestReq);
  });

  it('encode must return valid binary stream #1', () => {
    const encodedArray = Encoder.encode(ltr);
    const expectedArray = Buffer.from([00, 00, 00, 0x0a, 0xFF, 0xFF, 00, 00, 00, 05, 00, 00, 00, 01])

    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
  });

  it('encode must return valid binary stream #2', () => {
    const ltr = new LinkTestReq(23);

    const encodedArray = Encoder.encode(ltr);
    const expectedArray = Buffer.from([00, 00, 00, 0x0a, 0xFF, 0xFF, 00, 00, 00, 05, 00, 00, 00, 0x17])

    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
  });

  it('encode must return valid binary stream #3', () => {
    const ltr = new LinkTestReq(37541);

    const encodedArray = Encoder.encode(ltr);
    const expectedArray = Buffer.from([00, 00, 00, 0x0a, 0xFF, 0xFF, 00, 00, 00, 05, 00, 00, 0x92, 0xa5])

    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
  });

  it('must return valid string description', () => {
    expect(ltr.toString()).to.be.equal('linktest req');
  });


});