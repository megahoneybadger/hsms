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
    .timers( new Timers( 10, 1, 30, 40, 10, 10 ) )
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
    
  })

  it('should establish connection', function(done) {
    server.on( "established", (e) => {
      done();
    })

    server.start();
  });

  // it('should drop connection', function(done) {
  //   this.timeout(5000);

  //   server.on( "established", (e) => {
  //     server.stop();
  //   })

  //   server.on( "dropped", (e) => {
  //     done();
  //   });

  //   server.start();
  // });

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