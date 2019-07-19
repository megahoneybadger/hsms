var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

const { ControlMessage } = require( './../../../src/hsms' )

describe('Control Message', () => {
  it('should throw an exception if creating directly', () => {
    expect( () => {
      const m = new ControlMessage( 1, 2 );
    })
    .to.throw( TypeError, "Cannot construct Message instances directly");
  });

  
});