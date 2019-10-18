
var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

const {
  LinkTestRsp,
  Message,
  Constants,
	Encoder } = require('../../../src/hsms')
	



const {
  NoBuilderError,
  TooManyParamsError } = require('../../../src/utils/errors/custom-errors')

describe('LinkTest Rsp', () => {
  let ltr;

  beforeEach(function () {
    ltr = new LinkTestRsp( 2 );
  });

	it('should be created with a context', () => {
    ltr.should.have.property('device').equal(LinkTestRsp.ST_DEVICE);
    ltr.should.have.property('context').equal(2);
	});
	
	it('should be created with a context passed as string', () => {
    ltr = new LinkTestRsp( "3");

    ltr.should.have.property('device').equal(LinkTestRsp.ST_DEVICE);
    ltr.should.have.property('context').equal(3);
	});
	
	it('should not allow to change device and context', () => {
    ltr.device = 123;
    ltr.context = 'test';

    ltr.should.have.property('device').equal(LinkTestRsp.ST_DEVICE);
    ltr.should.have.property('context').equal(2);
	});
	
	it('should not allow to delete device and context', () => {
    ltr = new LinkTestRsp(22);

    delete ltr.device;
    delete ltr.context;
    delete ltr.status;

    ltr.should.have.property('device').equal(LinkTestRsp.ST_DEVICE);
    ltr.should.have.property('context').equal(22);
	});
	
	it('should throw an exception if passing non integer context', () => {
    expect(() => {
      new LinkTestRsp( "long string");
    })
    .to.throw(TypeError, Constants.getErrUIntNotInRange("Context"));
	});
	
	it('should throw an exception if passing a negative integer context', () => {
    expect(() => {
      new LinkTestRsp( -10 );
    })
      .to.throw(TypeError, Constants.getErrUIntNotInRange("Context"));
	});
	
	it('should throw an exception if passing too big integer context', () => {
    expect(() => {
      new LinkTestRsp(172671261526512);
    })
    .to.throw(TypeError, Constants.getErrUIntNotInRange("Context"));
  });

	it('should throw an exception if passing too many params', () => {
    expect(() => {
      new LinkTestRsp(1, 2);
    })
      .to.throw(TooManyParamsError);
	});
	
	it('kind must be LinkTestRsp', () => {
    expect(ltr.kind).to.be.equal(Message.Type.LinkTestRsp);
	});
	
	it('must return valid string description', () => {
    expect(ltr.toString()).to.be.equal('linktest rsp');
	});
	
	it('encode must return valid binary stream #1', () => {
    const encodedArray = Encoder.encode(ltr);
    const expectedArray = Buffer.from([00, 00, 00, 0x0a, 0xFF, 0xFF, 00, 00, 00, 06, 00, 00, 00, 02])

    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});
	
	it('encode must return valid binary stream #2', () => {
    dr = new LinkTestRsp(3);

    const encodedArray = Encoder.encode(dr);
    const expectedArray = Buffer.from([00, 00, 00, 0x0a, 0xFF, 0xFF, 00, 00, 00, 06, 00, 00, 00, 03])

    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});
	
	it('encode must return valid binary stream #4', () => {
    dr = new LinkTestRsp(37541);

    const encodedArray = Encoder.encode(dr);
    const expectedArray = Buffer.from([00, 00, 00, 0x0a, 0xFF, 0xFF, 00, 00, 00, 06, 00, 00, 0x92, 0xa5])

    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
  });



});