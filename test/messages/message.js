var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

const { Message } = require( './../../src/hsms' )

describe('Message', () => {
  it('should throw an exception if creating directly', () => {
    expect( () => {
      const m = new Message( 1, 2 );
    })
    .to.throw( TypeError, "Cannot construct Message instances directly");
  });

  
});