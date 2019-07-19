var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

const { SelectReq, Message } = require( './../../../src/hsms' )

describe('Select Req', () => {
  let sr;

  beforeEach(function() {
    sr =  new SelectReq( 1, 2 );
  });

  it('should be created with device and context params', () => {
    sr.should.have.property( 'device' ).equal( 1 );
    sr.should.have.property( 'context' ).equal( 2 );
  });

  it('kind must be SelectReq', () => {
    expect( sr.kind() ).to.be.equal( Message.Type.SelectReq );
  });

  it('encode must return valid binary stream', () => {
    expect( sr.encode() ).to.be.equal( 'test' );
  });

  it('must return valid string description', () => {
    expect( sr.toString() ).to.be.equal( 'select req' );
  });

  it('encode must return valid binary stream', () => {
    expect( sr.encode() ).to.be.equal( 'test' );
  });
  
});