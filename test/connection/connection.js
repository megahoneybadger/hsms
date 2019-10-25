var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

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

describe('Connection', () => {
  
  it('should be created with valid parameters #1', () => {
		const conn = new Connection(  Config
			.builder
			.ip( "127.5.6.1" )
			.port( 8000 )
			.device( 12 )
			.mode( ConnectionMode.Passive )
			.timers( new Timers( 20, 30 ) )
			.build() );

		const timers = conn.timers;

		conn.should.have.property( 'mode' ).equal( ConnectionMode.Passive );
		conn.should.have.property( 'ip' ).equal( "127.5.6.1" );
		conn.should.have.property( 'port' ).equal( 8000 );
		conn.should.have.property( 'device' ).equal( 12 );

		timers.should.have.property( 't3' ).equal( 20 );
		timers.should.have.property( 't5' ).equal( 30 );
		timers.should.have.property( 't6' ).equal( 5 );
		timers.should.have.property( 't7' ).equal( 10 );
		timers.should.have.property( 't8' ).equal( 5 );
		timers.should.have.property( 'linkTest' ).equal( 0 );
	});
	
	it('should be created with valid parameters #2', () => {
		const conn = new Connection(  Config
			.builder
			
			.port( 7000 )
			//.device( 120 )
			.mode( ConnectionMode.Active )
			.timers( new Timers( 20, 30, 70, 80, 90 ) )
			.build() );

		const timers = conn.timers;

		conn.should.have.property( 'mode' ).equal( ConnectionMode.Active );
		conn.should.have.property( 'ip' ).equal( "127.0.0.1" );
		conn.should.have.property( 'port' ).equal( 7000 );
		conn.should.have.property( 'device' ).equal( 0 );

		timers.should.have.property( 't3' ).equal( 20 );
		timers.should.have.property( 't5' ).equal( 30 );
		timers.should.have.property( 't6' ).equal( 70 );
		timers.should.have.property( 't7' ).equal( 80 );
		timers.should.have.property( 't8' ).equal( 90 );
		timers.should.have.property( 'linkTest' ).equal( 0 );
	});
	
	it('should be created with valid parameters #3', () => {
		const conn = new Connection(  Config
			.builder
			.timers( new Timers() )
			.build() );

		const timers = conn.timers;

		conn.should.have.property( 'mode' ).equal( ConnectionMode.Passive );
		conn.should.have.property( 'ip' ).equal( "127.0.0.1" );
		conn.should.have.property( 'port' ).equal( 8000 );
		conn.should.have.property( 'device' ).equal( 0 );

		timers.should.have.property( 't3' ).equal( Timers.default.t3 );
		timers.should.have.property( 't5' ).equal( Timers.default.t5 );
		timers.should.have.property( 't6' ).equal( Timers.default.t6 );
		timers.should.have.property( 't7' ).equal( Timers.default.t7 );
		timers.should.have.property( 't8' ).equal( Timers.default.t8 );
		timers.should.have.property( 'linkTest' ).equal( Timers.default.linkTest );
	});
	
	it('should not allow to delete properties', () => {
		const conn = new Connection(  Config
			.builder
			.ip( "127.5.6.1" )
			.port( 8000 )
			.device( 12 )
			.mode( ConnectionMode.Passive )
			.timers( new Timers( 20, 30 ) )
			.build() );

		delete conn.mode;
		delete conn.ip;
		delete conn.port;
		delete conn.device;
		delete conn.timers;

		const timers = conn.timers;

		conn.should.have.property( 'mode' ).equal( ConnectionMode.Passive );
		conn.should.have.property( 'ip' ).equal( "127.5.6.1" );
		conn.should.have.property( 'port' ).equal( 8000 );
		conn.should.have.property( 'device' ).equal( 12 );

		timers.should.have.property( 't3' ).equal( 20 );
		timers.should.have.property( 't5' ).equal( 30 );
		timers.should.have.property( 't6' ).equal( 5 );
		timers.should.have.property( 't7' ).equal( 10 );
		timers.should.have.property( 't8' ).equal( 5 );
		timers.should.have.property( 'linkTest' ).equal( 0 );
	});
	
	it('should not allow to modify properties', () => {
		const conn = new Connection(  Config
			.builder
			.ip( "192.5.6.1" )
			.port( 6000 )
			//.device( 12 )
			.mode( ConnectionMode.Active )
			.timers( new Timers( 20, 30, 40 ) )
			.build() );

		conn.mode = ConnectionMode.Passive;
		conn.ip = null;
		conn.port = () => "err";
		conn.device = -1;
		conn.timers = undefined;

		const timers = conn.timers;

		conn.should.have.property( 'mode' ).equal( ConnectionMode.Active );
		conn.should.have.property( 'ip' ).equal( "192.5.6.1" );
		conn.should.have.property( 'port' ).equal( 6000 );
		conn.should.have.property( 'device' ).equal( 0 );

		timers.should.have.property( 't3' ).equal( 20 );
		timers.should.have.property( 't5' ).equal( 30 );
		timers.should.have.property( 't6' ).equal( 40 );
		timers.should.have.property( 't7' ).equal( 10 );
		timers.should.have.property( 't8' ).equal( 5 );
		timers.should.have.property( 'linkTest' ).equal( 0 );
  });


});