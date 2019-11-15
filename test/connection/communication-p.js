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
  Constants,
  DataMessage,
  DataItem } = require( '../../src/hsms' )

const { 
	NoBuilderError,
	TooManyParamsError,
  InvalidEnumValueError,
  InvalidFormatError,
  InvalidContructorArguments } = require( '../../src/utils/errors/custom-errors' )

  
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
    .timers( new Timers( 2, 1, 1, 1, 2,  10 ) )
    .build();

  return new Connection( config );
}




describe('Communication passive', () => {
  let conn;
  let server;

  before( function(){
    conn = createConnection( true );
    conn.start();
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

  it('remote entity should recv our data message', function(done) {
    let mToSend = DataMessage
      .builder
      .device( 18 )
      .stream( 11 )
      .replyExpected( false )
      .func( 17 )
      .items(
        DataItem.u1( "", 16 )) 
      .build();

    server.on( "established", (e) => {
      console.log( "client connected to the server" )
      server.send( mToSend );
    })

    conn.on( "recv", m => {
      console.log( `client recv the message: ${m.toString()}` );

      if( m.toString() == `S11F17` ){
        // console.log( JSON.stringify(mToSend) );
        // console.log( JSON.stringify(m) );
        // TODO
        if( m.equals( mToSend ) ){
          done();
        }

      }
    })

    server.start();

  });

  it('should raise t3 timeout (no data message reply)', function(done) {
    this.timeout(5000);

    let mToSend = DataMessage
      .builder
      .device( 1 )
      .stream( 1 )
      .replyExpected( true )
      .func( 1 )
      .items(
        DataItem.u1( "", 17 )) 
      .build();

    server.on( "established", (e) => {
      server.send( mToSend );
    })

    server.on( "timeout", (t) => {
      if( 3 === t ){
        done();
      }
    })

    server.start();
  });


  it('should establish connection', function(done) {
    server.on( "established", (e) => {
      done();
    })

    server.start();
  });

  it('should reconnect 5 times', function(done) {
    this.timeout(10000);
    let dropCount = 0;
    let estCount = 0;

    server.on( "established", (e) => {
      e.should.have.property('ip').equal('127.0.0.1');
      ++estCount;

      if( estCount < 5 ){
        server.stop();
        server.start();
      } else{
        expect(estCount).to.equal(5);
        expect(dropCount).to.equal(4);
        done();
      }
    })

    server.on( "dropped", (e) => {
      ++dropCount;
    });

    server.start();
  });

  it('should reconnect 3 times and make sure remote entity is alive', function(done) {
    this.timeout(10000);
    let dropCount = 0;
    let estCount = 0;

    server.on( "established", (e) => {
      e.should.have.property('ip').equal('127.0.0.1');
      ++estCount;

      if( estCount < 3 ){
        server.stop();
        server.start();
      } 
    })

    server.on( "dropped", (e) => {
      ++dropCount;
    });

    server.on( "alive", (e) => {
      done();
    });

    server.start();
  });

  it('should drop connection #1', function(done) {
    this.timeout(5000);

    server.on( "established", (e) => {
      server.stop();
    })

    server.on( "dropped", (e) => {
      done();
    });

    server.start();
  });

  it('should drop connection #2', function(done) {
    this.timeout(5000);

    server.on( "established", (e) => {
      setTimeout( () => server.stop(), 1000 );
    })

    server.on( "dropped", (e) => {
      done();
    });

    server.start();
  });

  it('should establish physical connection but not selected', function(done) {
    this.timeout(5000);

    server.on( "timeout", ( t, m ) =>{
      if( 7 === t ){
        done();
      }
    })

    conn.debug = {
      doNotSendSelectReq: true
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
      doNotSendSelectReq: true
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
        index = 0
        delete conn.debug;
      }
    })

    server.on( "alive", ( m ) => {
      ++index;

      if( index > 2 ){
        done()
      }
    });

    conn.debug = {
      doNotSendLinkTestRsp: true
    };

    server.start();
  });



  

});