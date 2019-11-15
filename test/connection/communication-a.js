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


describe('Communication active', () => {
  let conn;
  let server;

  before( function(){
    server = createConnection( false );
    server.start();

    server.on( "established", (e) => {
      //console.log( "server got a connection" )
    })

    server.on( "dropped", (e) => {
      //console.log( "server lost a connection" )
    })
  })
  
  after( function( done ){
    this.timeout(2000);

    setTimeout(function(){
      server.stop();
      done();
    }, 1000);
  })

  beforeEach(function(  ) {
    this.timeout(2000);

    conn = createConnection( true );
  })

  afterEach(function( done ) {
    this.timeout(3000);

    setTimeout(function(){
      conn.stop();
      done();
    }, 500);
    
  })

  it('should establish connection', function(done) {
    conn.on( "established", (e) => {
      e.should.have.property('ip').equal('127.0.0.1');
      e.should.have.property('port').equal(7000 );
      conn.stop();  
      done();
    })

    conn.start();
  });

  it('should drop connection #1', function(done) {
    this.timeout(5000);

    conn.on( "established", (e) => {
      e.should.have.property('ip').equal('127.0.0.1');
      e.should.have.property('port').equal(7000 );
      conn.stop();
    })

    conn.on( "dropped", (e) => {
      done();
    });

    conn.start();
  });

  it('should drop connection #2', function(done) {
    this.timeout(5000);

    conn.on( "established", (e) => {
      e.should.have.property('ip').equal('127.0.0.1');
      e.should.have.property('port').equal(7000 );
      setTimeout( () => conn.stop(), 1000 );
    })

    conn.on( "dropped", (e) => {
      done();
    });

    conn.start();
  });

  it('should reconnect 5 times', function(done) {
    this.timeout(10000);
    let dropCount = 0;
    let estCount = 0;

    conn.on( "established", (e) => {
      e.should.have.property('ip').equal('127.0.0.1');
      e.should.have.property('port').equal(7000 );
      ++estCount;

      if( estCount < 5 ){
        conn.stop();
        conn.start();
      } else{
        expect(estCount).to.equal(5);
        expect(dropCount).to.equal(4);
        done();
      }
    })

    conn.on( "dropped", (e) => {
      ++dropCount;
    });

    conn.start();
  });

  it('should reconnect 3 times and make sure remote entity is alive', function(done) {
    this.timeout(10000);
    let dropCount = 0;
    let estCount = 0;

    conn.on( "established", (e) => {
      e.should.have.property('ip').equal('127.0.0.1');
      ++estCount;

      if( estCount < 3 ){
        conn.stop();
        conn.start();
      } 
    })

    conn.on( "dropped", (e) => {
      ++dropCount;
    });

    conn.on( "alive", (e) => {
      done();
    });

    conn.start();
  });

 

  



});