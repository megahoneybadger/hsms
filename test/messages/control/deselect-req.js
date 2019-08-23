var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

const { 
  DeselectReq,
  Message,
  Constants,
  Encoder } = require( '../../../src/hsms' )



describe('Deselect Req', () => {
  let dr;

  beforeEach(function() {
    dr =  new DeselectReq( 1, 2 );
  });

  it('should be created with device and context params', () => {
    dr.should.have.property( 'device' ).equal( 1 );
    dr.should.have.property( 'context' ).equal( 2 );
  });

  it('should be created with device and context params passed as strings', () => {
    dr =  new DeselectReq( "1", "2" );

    dr.should.have.property( 'device' ).equal( 1 );
    dr.should.have.property( 'context' ).equal( 2 );
  });

  it('should not allow to change device and context', () => {
    dr.device = 123;
    dr.context = 'test';

    dr.should.have.property( 'device' ).equal( 1 );
    dr.should.have.property( 'context' ).equal( 2 );
  });

  it('should not allow to delete device and context', () => {
    dr =  new DeselectReq( 11, 22, 55 );

    delete dr.device;
    delete dr.context;

    dr.should.have.property( 'device' ).equal( 11 );
    dr.should.have.property( 'context' ).equal( 22 );
  });

  it('should throw an exception if passing non integer device', () => {
    expect( () => {
      new DeselectReq( () => {}, {} );
    })
    .to.throw( TypeError, Constants.getErrUShortNotInRange( "Device" ) );
  });

  it('should throw an exception if passing negative integer device', () => {
    expect( () => {
      new DeselectReq( -500.77, () => {} );
    })
    .to.throw( TypeError, Constants.getErrUShortNotInRange( "Device" ) );
  });

  it('should throw an exception if passing too big integer device', () => {
    expect( () => {
      new DeselectReq( 456789, 1238712783 );
    })
    .to.throw( TypeError, Constants.getErrUShortNotInRange( "Device" ) );
  });

  it('should throw an exception if passing non integer context', () => {
    expect( () => {
      new DeselectReq( 11, "long string" );
    })
    .to.throw( TypeError, Constants.getErrUIntNotInRange( "Context" ));
  });

  it('should throw an exception if passing negative integer context', () => {
    expect( () => {
      new DeselectReq( "654", -10 );
    })
    .to.throw( TypeError, Constants.getErrUIntNotInRange( "Context" ) );
  });

  it('should throw an exception if passing too big integer context', () => {
    expect( () => {
      new DeselectReq( 65535, 172671261526512 );
    })
    .to.throw( TypeError, Constants.getErrUIntNotInRange( "Context" ));
  });

  it('kind must be SelectReq', () => {
    expect( dr.kind ).to.be.equal( Message.Type.DeselectReq );
  });

  it('encode must return valid binary stream #1', () => {
    const encodedArray = Encoder.encode( dr );

    const expectedArray = Buffer.from( [ 00, 00, 00, 0x0a, 00, 01, 00, 00, 00, 03, 00, 00, 00, 02 ] )
    
    expect( Buffer.compare( encodedArray, expectedArray ) ).equal( 0 );
  });

  it('encode must return valid binary stream #2', () => {
    const dr =  new DeselectReq( 37, 23 );

    const encodedArray = Encoder.encode(dr);
    const expectedArray = Buffer.from( [ 00, 00, 00, 0x0a, 00, 0x25, 00, 00, 00, 03, 00, 00, 00, 0x17 ] )
    
    expect( Buffer.compare( encodedArray, expectedArray ) ).equal( 0 );
  });

  it('encode must return valid binary stream #3', () => {
    const sr =  new DeselectReq( 2781, 37541 );

    const encodedArray = Encoder.encode( sr );
    const expectedArray = Buffer.from( [ 00, 00, 00, 0x0a, 0xa, 0xdd, 00, 00, 00, 03, 00, 00, 0x92, 0xa5 ] )
    
    expect( Buffer.compare( encodedArray, expectedArray ) ).equal( 0 );
  });

  it('must return valid string description', () => {
    expect( dr.toString() ).to.be.equal( 'deselect req' );
  });

  
 
  
});