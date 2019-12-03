var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

const { 
  Message,
  Config,
	ConnectionMode,
	ConnectionState,
	Connection,
	SelectReq,
	SelectRsp,
	DeselectReq,
	DeselectRsp,
	RejectReq,
	SeparateReq,
	LinkTestRsp,
	DataMessage,
	DataItem,
  Timers,
  Constants } = require( '../../src/hsms' )

const { 
	NoBuilderError,
	TooManyParamsError,
  InvalidEnumValueError,
	InvalidFormatError,
	ExpectedSelectReqError,
	BadSelectRspCodeError } = require( '../../src/utils/errors/custom-errors' )

  
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
		
		delete server.debug;

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
			
			console.log( 'active conn established' );

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
			console.log( 'active conn dropped' );
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
	
	it('should reply with select rsp error code if recv extra select req', function(done) {
    this.timeout(10000);
    let count = 0;

    conn.on( "established", (e) => {
			conn.send( new SelectReq() )
			++count;
		})

		conn.on( "error", m => {
			if( m instanceof BadSelectRspCodeError && 3 == count ){
				conn.stop();
				done();
			}
		} )
	
    conn.start();
  });

	it('should refuse all messages before becoming selected', function(done) {
    this.timeout(10000);
		
		conn.debug = {
			doNotSendSelectReq: true
		};

		conn.start();

		conn.on( "connected", p => conn.send( DataMessage
			.builder
			.device(1)
			.stream(1)
			.context(98126)
			.replyExpected(false)
			.func(1)
			.items(
				DataItem.i8( "", 8007199254740991, 32178918723, -7891273712836 ))
			.build() ) )
		
		server.on( "error", e => {
			if( e instanceof ExpectedSelectReqError ){
				delete conn.debug;
			}
		});

		conn.on( "established", p => done() ) ;

	});

	it('should refuse garbage select rsp', function(done) {
    //this.timeout(10000);

		conn.start();
		let rsp = new SelectRsp( 1, Message.generateContext(), 12 )

		conn.on( "established", p => conn.send( rsp ) )
		
		conn.on( "recv", e => {
			if( e instanceof RejectReq && e.context == rsp.context ){
				done()
			}
		});
	});
	
	it('should refuse garbage replies', function(done) {
    this.timeout(10000);

		conn.start();

		const m = DataMessage
			.builder
			.device(1)
			.stream(1)
			.context(98126)
			.replyExpected(false)
			.func(2) /*!!!*/
			.items(
				DataItem.i8( "", 8007199254740991, 32178918723, -7891273712836 ))
			.build();

		conn.on( "established", p => {
			console.log( 'established' )
			conn.send( m )
		} )
		
		conn.on( "recv", e => {
			if( e instanceof RejectReq && e.context == m.context ){
				done()
			}
		});
	});

	it('should refuse garbage link test replies', function(done) {
    this.timeout(10000);
	
		conn.start();

		const lt = new LinkTestRsp( Message.generateContext() );

		conn.on( "established", p => conn.send( lt ))
		
		conn.on( "recv", e => {
			if( e instanceof RejectReq && e.context == lt.context ){
				done()
			}
		});

		

	});

	it('should separate', function(done) {
    this.timeout(10000);
	
		conn.start();
		let count = 0;

		conn.on( "established", p => {
			console.log( "established" )
			conn.send( new SeparateReq() );
			++count;
		})
		
		conn.on( "dropped", (e) => {
			console.log( "dropped" )
			if( 5 == count ){
				done();
			}
    })

		

	});

	it('should not reply to a deselect req (T6)', function(done) {
    this.timeout(3000);
		
		server.debug = {
			doNotSendDeselectRsp: true
		};

		conn.start();

		conn.on( "established", p => conn.send( new DeselectReq() ) )
		
		conn.on("timeout", (t) => {
			console.log( "timeout" );
			if (6 === t) {
				done();
			}
		})
	});

	
	it('should reply to a deselect req', function(done) {
		this.timeout(5000);
		let dropped = false;
		let deselectRsp = false;

		conn.start();

		conn.on( "established", p => {
			if( deselectRsp ){
				done();
			} else{
				console.log( "sending deselect" )
				conn.send( new DeselectReq() )
			}
		} )
		
		conn.on( "dropped", (e) => dropped = true )

		conn.on( "recv", m => {
			if( m instanceof DeselectRsp ){
				deselectRsp = true;
			}
		} )

		
	});

	it('should refuse garbage deselect rsp', function(done) {
    this.timeout(3000);
	
		conn.start();

		const dr = new DeselectRsp( 1, Message.generateContext() );

		conn.on( "established", p => conn.send( dr ))
		
		conn.on( "recv", m => {
			if( m instanceof RejectReq && m.context == dr.context ){
				done()
			}
		});

		

	});

	

 

});