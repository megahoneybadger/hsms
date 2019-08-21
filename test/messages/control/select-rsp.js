var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

const { SelectRsp,  Message, Constants } = require( '../../../src/hsms' )

describe('Select Rqp', () => {
  let sr;

  beforeEach(function() {
    sr = new SelectRsp( 1, 2 );
  });

  it('should be created with device and context params', () => {
    sr.should.have.property( 'device' ).equal( 1 );
    sr.should.have.property( 'context' ).equal( 2 );
    sr.should.have.property( 'status' ).equal( 0 );
  });

  it('should be created with device, context and status params', () => {
    sr =  new SelectRsp( 11, 22, 55 );
    sr.should.have.property( 'device' ).equal( 11 );
    sr.should.have.property( 'context' ).equal( 22 );
    sr.should.have.property( 'status' ).equal( 55 );
  });

  it('should be created with device, context and status params passed as strings', () => {
    sr =  new SelectRsp( "1", "2", "3" );

    sr.should.have.property( 'device' ).equal( 1 );
    sr.should.have.property( 'context' ).equal( 2 );
    sr.should.have.property( 'status' ).equal( 3 );
  });

  it('should not allow to change device, context and status', () => {
    sr.device = 123;
    sr.context = 'test';
    sr.status = {};

    sr.should.have.property( 'device' ).equal( 1 );
    sr.should.have.property( 'context' ).equal( 2 );
    sr.should.have.property( 'status' ).equal( 0 );
  });

  it('should not allow to delete device, context and status', () => {
    sr =  new SelectRsp( 11, 22, 55 );

    delete sr.device;
    delete sr.context;
    delete sr.status;

    sr.should.have.property( 'device' ).equal( 11 );
    sr.should.have.property( 'context' ).equal( 22 );
    sr.should.have.property( 'status' ).equal( 55 );
  });

 
  it('should throw an exception if passing non integer device', () => {
    expect( () => {
      const sr =  new SelectRsp( "asd", {} );
    })
    .to.throw( TypeError, Constants.getErrUShortNotInRange( "Device" ) );
  });
  
  it('should throw an exception if passing negative integer device', () => {
    expect( () => {
      const sr =  new SelectRsp( -5, {} );
    })
    .to.throw( TypeError, Constants.getErrUShortNotInRange( "Device" ) );
  });

  it('should throw an exception if passing too big integer device', () => {
    expect( () => {
      const sr =  new SelectRsp( 456789, {} );
    })
    .to.throw( TypeError, Constants.getErrUShortNotInRange( "Device" ) );
  });

  it('should throw an exception if passing non integer context', () => {
    expect( () => {
      const sr =  new SelectRsp( 11, "long string" );
    })
    .to.throw( TypeError, Constants.getErrUIntNotInRange( "Context" ));
  });

  it('should throw an exception if passing negative integer context', () => {
    expect( () => {
      const sr =  new SelectRsp( "654", -10 );
    })
    .to.throw( TypeError, Constants.getErrUIntNotInRange( "Context" ) );
  });

  it('should throw an exception if passing too big integer context', () => {
    expect( () => {
      const sr =  new SelectRsp( 65535, 172671261526512 );
    })
    .to.throw( TypeError, Constants.getErrUIntNotInRange( "Context" ));
  });

  it('should throw an exception if passing negative integer status', () => {
    expect( () => {
      const sr =  new SelectRsp( "654", "123", -10 );
    })
    .to.throw( TypeError, Constants.getErrUByteNotInRange( "Status" ) );
  });

  it('should throw an exception if passing too big integer status', () => {
    expect( () => {
      const sr =  new SelectRsp( 65535, 12122, 1726 );
    })
    .to.throw( TypeError, Constants.getErrUByteNotInRange( "Status" ));
  });

  it('should throw an exception if passing too many params', () => {
    expect( () => {
      const sr =  new SelectRsp( 1,2, 4, 123 );
    })
    .to.throw( TypeError, Constants.TOO_MANY_CONSTRUCT_PARAMS );
  });

  it('kind must be SelectReq', () => {
    expect( sr.kind() ).to.be.equal( Message.Type.SelectRsp );
  });

  it('encode must return valid binary stream #1', () => {
    const encodedArray = sr.encode();
    const expectedArray = Buffer.from( [ 00, 00, 00, 0x0a, 00, 01, 00, 00, 00, 02, 00, 00, 00, 02 ] )

    // console.log( encodedArray );
    // console.log( expectedArray );
    
    expect( Buffer.compare( encodedArray, expectedArray ) ).equal( 0 );
  });

  it('encode must return valid binary stream #2', () => {
    const sr =  new SelectRsp( 37, 23 );

    const encodedArray = sr.encode();
    const expectedArray = Buffer.from( [ 00, 00, 00, 0x0a, 00, 0x25, 00, 00, 00, 02, 00, 00, 00, 0x17 ] )
    
    expect( Buffer.compare( encodedArray, expectedArray ) ).equal( 0 );
  });

  it('encode must return valid binary stream #3', () => {
    const sr =  new SelectRsp( 2781, 37541 );

    const encodedArray = sr.encode();
    const expectedArray = Buffer.from( [ 00, 00, 00, 0x0a, 0xa, 0xdd, 00, 00, 00, 02, 00, 00, 0x92, 0xa5 ] )
    
    expect( Buffer.compare( encodedArray, expectedArray ) ).equal( 0 );
  });

  it('must return valid string description', () => {
    expect( sr.toString() ).to.be.equal( 'select rsp' );
  });
  
});