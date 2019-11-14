var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
var sinon = require('sinon');

const { 
  Message,
  Config,
	ConnectionMode,
	ConnectionState,
	Connection,
  Timers,
  Constants } = require( '../../src/hsms' )

const { 
	NoBuilderError,
	TooManyParamsError,
  InvalidEnumValueError,
  InvalidFormatError } = require( '../../src/utils/errors/custom-errors' )

  
function createConnection( active ){
  const config = Config
    .builder
    .ip( "127.0.0.1" )
    .port( 7000 )
    .device( 12 )
    .mode( active ? ConnectionMode.Active : ConnectionMode.Passive )
    .timers( new Timers( 1, 1, 1, 1, 2, 1 ) )
    .build();

  return new Connection( config );
}

function createConnection2( active ){
  const config = Config
    .builder
    .ip( "127.0.0.1" )
    .port( 7000 )
    .device( 12 )
    .mode( active ? ConnectionMode.Active : ConnectionMode.Passive )
    .timers( new Timers( 1, 1, 1, 1, 2,  10 ) )
    .build();

  return new Connection( config );
}


describe('Communication passive', () => {
  let conn;
  let server;

  before( function(){
    conn = createConnection( true );
    conn.start();

    // server.on( "established", (e) => {
    //   //console.log( "server got a connection" )
    // })

    // server.on( "dropped", (e) => {
    //   //console.log( "server lost a connection" )
    // })
  })
  
  after( function( done ){
    this.timeout(2000);

    setTimeout(function(){
      conn.stop();
      done();
    }, 1000);
  })

  beforeEach(function(  ) {
    this.timeout(2000);

    server = createConnection( false );
  })

  afterEach(function( done ) {
    this.timeout(3000);

    setTimeout(function(){
      server.stop();
      done();
    }, 500);

    delete conn.debug;
  })

  it('should establish connection', function(done) {
    server.on( "established", (e) => {
      done();
    })

    server.start();
  });

  it('should drop connection', function(done) {
    this.timeout(5000);

    server.on( "established", (e) => {
      server.stop();
    })

    server.on( "dropped", (e) => {
      done();
    });

    server.start();
  });

  it('should establish physical connection but not selected', function(done) {
    this.timeout(3000);

    server.on( "timeout", ( t, m ) =>{
      if( 7 === t ){
        done();
      }
    })

    conn.debug = {
      doNotSendSelect: true
    };

    server.start();
  });

  it('should establish connection after a few attempts (recv t7)', function(done) {
    this.timeout(10000);

    var index = 0;

    server.on( "timeout", ( t, m ) =>{
      if( 7 === t ){
        ++index;
        console.log( "got t7" );
      }
      
      if( index > 3 ){
        delete conn.debug;
      }
    })

    server.on( "established", (e) => {
      done();
    })

    conn.debug = {
      doNotSendSelect: true
    };

    server.start();
  });

  it('should send link test req but do not recv reply (t6)', function(done) {
    this.timeout(5000);

    server.on( "timeout", ( t, m ) =>{
      if( 6 === t ){
        done();
      }
    })

    conn.debug = {
      doNotSendLinkTestRsp: true
    };

    server.start();
  });

  it('should send link test req but do not recv reply for a few times (t6)', function(done) {
    this.timeout(30000);

    var index = 0;

    server.on( "timeout", ( t, m ) =>{
      if( 6 === t ){
        ++index;
        console.log( "got t6" );
      }

      if( index > 2 ){
        delete conn.debug;
      }
    })

    server.on( "alive", ( m ) => done());

    conn.debug = {
      doNotSendLinkTestRsp: true
    };

    server.start();
  });



  // it('should reconnect 5 times', function(done) {
  //   this.timeout(10000);
  //   let dropCount = 0;
  //   let estCount = 0;

  //   conn.on( "established", (e) => {
  //     e.should.have.property('ip').equal('127.0.0.1');
  //     e.should.have.property('port').equal(7000 );
  //     ++estCount;

  //     if( estCount < 5 ){
  //       conn.stop();
  //       conn.start();
  //     } else{
  //       expect(estCount).to.equal(5);
  //       expect(dropCount).to.equal(4);
  //       done();
  //     }
  //   })

  //   conn.on( "dropped", (e) => {
  //     ++dropCount;
  //   });

  //   conn.start();
  // });

});