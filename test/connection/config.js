var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

const { 
  Message,
  Config,
  ConnectionMode,
  Timers,
  Constants } = require( '../../src/hsms' )

const { 
	NoBuilderError,
	TooManyParamsError,
  InvalidEnumValueError,
  InvalidFormatError } = require( '../../src/utils/errors/custom-errors' )

describe('Config', () => {
  
  it('should throw an exception if creating without a builder #1', () => {
    expect( () => {
      new Config();
    })
    .to.throw( NoBuilderError );
  });

  it('should throw an exception if creating without a builder #1', () => {
    expect( () => {
      new Config( 1, {}, "" );
    })
    .to.throw( NoBuilderError );
  });

  it('should throw an exception if passing too many params', () => {
    expect( () => {
      new Config( Config.builder, 1, {}, [], "error" );
    })
    .to.throw( TooManyParamsError );
  });
  
  it('should be created with an active connection mode', () => {
		const conf = Config
			.builder
			.mode( ConnectionMode.Active )
			.build();

    conf.should.have.property( 'mode' ).equal( ConnectionMode.Active );
  });

  it('should be created with an active connection mode (set as a string)', () => {
		const conf = Config
			.builder
			.mode( "Active" )
			.build();

    conf.should.have.property( 'mode' ).equal( ConnectionMode.Active );
  });


  it('should be created with an active connection mode (set as a number)', () => {
		const conf = Config
			.builder
			.mode( 1 )
			.build();

    conf.should.have.property( 'mode' ).equal( ConnectionMode.Active );
  });

  it('should be created with a passive connection mode', () => {
		const conf = Config
			.builder
			.mode( ConnectionMode.Passive )
			.build();

    conf.should.have.property( 'mode' ).equal( ConnectionMode.Passive );
  });

  it('should be created with a passive connection mode (set as a string)', () => {
		const conf = Config
			.builder
			.mode( "Passive" )
			.build();

    conf.should.have.property( 'mode' ).equal( ConnectionMode.Passive );
  });

  it('should be created with a passive connection mode (set as a number)', () => {
		const conf = Config
			.builder
			.mode( 0 )
			.build();

    conf.should.have.property( 'mode' ).equal( ConnectionMode.Passive );
  });

  it('should be created with defuault passive connection mode (if not specified)', () => {
		const conf = Config
			.builder
			.build();

    conf.should.have.property( 'mode' ).equal( ConnectionMode.Passive );
  });

  it('should throw an exception if passing an invalid mode value #1 (incorrect string value)', () => {
    expect( () => {
      Config
			.builder
			.mode( "super bad value" )
			.build();
    })
    .to.throw( InvalidEnumValueError );
  });
  
  it('should not allow to change a mode', () => {
    const conf = Config
			.builder
			.mode( ConnectionMode.Active )
      .build();
      
    conf.mode = ConnectionMode.Passive;

    conf.should.have.property('mode').equal( ConnectionMode.Active );
  });

  it('should not allow to delete a mode', () => {
    const conf = Config
			.builder
			.mode( ConnectionMode.Passive )
      .build();
      
    delete conf.mode;

    conf.should.have.property('mode').equal( ConnectionMode.Passive );
  });

  it('should be created with a valid ip', () => {
		const conf = Config
			.builder
      .mode( ConnectionMode.Active )
      .ip( "127.2.3.1" )
			.build();

    conf.should.have.property( 'mode' ).equal( ConnectionMode.Active );
    conf.should.have.property( 'ip' ).equal( "127.2.3.1" );
  });

  it('should be created with a valid default ip', () => {
		const conf = Config
			.builder
      .mode( "Passive" )
			.build();

    conf.should.have.property( 'mode' ).equal( ConnectionMode.Passive );
    conf.should.have.property( 'ip' ).equal( "127.0.0.1" );
  });

  it('should throw an exception if passing an invalid ip #1', () => {
    expect( () => {
      Config
			.builder
			.ip( "invlid ip" )
			.build();
    })
    .to.throw( InvalidFormatError );
  });

  it('should throw an exception if passing an invalid ip #2', () => {
    expect( () => {
      Config
			.builder
			.ip( { ip:"127.0.0.1" } )
			.build();
    })
    .to.throw( InvalidFormatError );
  });

  it('should throw an exception if passing an invalid ip #3', () => {
    expect( () => {
      Config
			.builder
			.ip( 123465 )
			.build();
    })
    .to.throw( InvalidFormatError );
  });

  it('should not allow to change an ip', () => {
    const conf = Config
			.builder
      .mode( ConnectionMode.Active )
      .ip( "12.45.15.87" )
      .build();
      
    conf.ip = "changed ip";

    conf.should.have.property('mode').equal( ConnectionMode.Active );
    conf.should.have.property('ip').equal( "12.45.15.87" );
  });

  it('should not allow to delete an ip', () => {
    const conf = Config
			.builder
      .mode( ConnectionMode.Active )
      .ip( "12.45.15.87" )
      .build();
      
    delete conf.mode;
    delete conf.ip;

    conf.should.have.property('mode').equal( ConnectionMode.Active );
    conf.should.have.property('ip').equal( "12.45.15.87" );
  });


  it('should be created with a valid port', () => {
		const conf = Config
			.builder
			.port( 5000 )
			.build();

    conf.should.have.property( 'port' ).equal( 5000 );
  });

  it('should be created with a valid default port', () => {
		const conf = Config
			.builder
			.build();

    conf.should.have.property( 'port' ).equal( 8000 );
  });

  it('should not allow to change a port', () => {
    const conf = Config
			.builder
      .port( 7000 )
      .build();
      
    conf.port = "changed ip";

    conf.should.have.property('port').equal( 7000 );
  });

  it('should not allow to delete a port', () => {
    const conf = Config
			.builder
      .port( 7500 )
      .build();
      
    delete conf.port;

    conf.should.have.property('port').equal( 7500 );
  });


  it('should throw an exception if passing an invalid port #1', () => {
    expect( () => {
      Config
			.builder
			.port( -10 )
			.build();
    })
    .to.throw( InvalidFormatError );
  });

  it('should throw an exception if passing an invalid port #2', () => {
    expect( () => {
      Config
			.builder
			.port( 700000 )
			.build();
    })
    .to.throw( InvalidFormatError );
  });

  it('should throw an exception if passing an invalid port #3', () => {
    expect( () => {
      Config
			.builder
			.port( () => 0 )
			.build();
    })
    .to.throw( InvalidFormatError );
  });


  it('should be created with a valid device', () => {
		const conf = Config
			.builder
			.device( 7 )
			.build();

    conf.should.have.property( 'device' ).equal( 7 );
  });

  it('should be created with a valid default device', () => {
		const conf = Config
			.builder
			.build();

    conf.should.have.property( 'device' ).equal( 0 );
  });

  it('should not allow to change a device', () => {
    const conf = Config
			.builder
      .device( 7000 )
      .build();
      
    conf.device = "changed device";

    conf.should.have.property('device').equal( 7000 );
  });

  it('should not allow to delete a device', () => {
    const conf = Config
			.builder
      .device( 7500 )
      .build();
      
    delete conf.device;

    conf.should.have.property('device').equal( 7500 );
  });

  it('should throw an exception if passing an invalid device #1', () => {
    expect( () => {
      Config
			.builder
			.device( -10 )
			.build();
    })
    .to.throw( InvalidFormatError );
  });

  it('should throw an exception if passing an invalid device #2', () => {
    expect( () => {
      Config
			.builder
			.device( 700000 )
			.build();
    })
    .to.throw( InvalidFormatError );
  });

  it('should throw an exception if passing invalid timers', () => {
    expect( () => {
      Config
			.builder
			.timers( () => 'wrong object' )
			.build();
    })
    .to.throw( InvalidFormatError );
  });

  it('should be created with valid default timers', () => {
		const conf = Config
			.builder
			.timers( new Timers() )
			.build();

    conf.should.have.property( 'timers' ).that.has.property( 't3' ).equal( Timers.default.t3 );
    conf.should.have.property( 'timers' ).that.has.property( 't5' ).equal( Timers.default.t5 );
    conf.should.have.property( 'timers' ).that.has.property( 't6' ).equal( Timers.default.t6 );
    conf.should.have.property( 'timers' ).that.has.property( 't7' ).equal( Timers.default.t7 );
    conf.should.have.property( 'timers' ).that.has.property( 't8' ).equal( Timers.default.t8 );
    conf.should.have.property( 'timers' ).that.has.property( 'linkTest' ).equal( Timers.default.linkTest );
	});
	
	it('should be created with valid default timers even if not specified', () => {
		const conf = Config
			.builder
			.build();

    conf.should.have.property( 'timers' ).that.has.property( 't3' ).equal( Timers.default.t3 );
    conf.should.have.property( 'timers' ).that.has.property( 't5' ).equal( Timers.default.t5 );
    conf.should.have.property( 'timers' ).that.has.property( 't6' ).equal( Timers.default.t6 );
    conf.should.have.property( 'timers' ).that.has.property( 't7' ).equal( Timers.default.t7 );
    conf.should.have.property( 'timers' ).that.has.property( 't8' ).equal( Timers.default.t8 );
    conf.should.have.property( 'timers' ).that.has.property( 'linkTest' ).equal( Timers.default.linkTest );
  });


  it('should be created with valid timers', () => {
		const conf = Config
			.builder
			.timers( new Timers(1,2,3,4,5,6) )
			.build();

    conf.should.have.property( 'timers' ).that.has.property( 't3' ).equal( 1 );
    conf.should.have.property( 'timers' ).that.has.property( 't5' ).equal( 2 );
    conf.should.have.property( 'timers' ).that.has.property( 't6' ).equal( 3 );
    conf.should.have.property( 'timers' ).that.has.property( 't7' ).equal( 4 );
    conf.should.have.property( 'timers' ).that.has.property( 't8' ).equal( 5 );
    conf.should.have.property( 'timers' ).that.has.property( 'linkTest' ).equal( 6 );
  });
  
});