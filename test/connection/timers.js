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

describe('Timers', () => {
  it('should be created with default values', () => {
    const t = new Timers();
   
    t.should.have.property( 't3' ).equal( Timers.default.t3 );
    t.should.have.property( 't5' ).equal( Timers.default.t5 );
    t.should.have.property( 't6' ).equal( Timers.default.t6 );
    t.should.have.property( 't7' ).equal( Timers.default.t7 );
    t.should.have.property( 't8' ).equal( Timers.default.t8 );
    t.should.have.property( 'linkTest' ).equal( Timers.default.linkTest );

  });

  it('should be created with set values(and default if not set ) #1', () => {
    const t = new Timers( 12, 33 );
   
    t.should.have.property( 't3' ).equal( 12 );
    t.should.have.property( 't5' ).equal( 33 );
    t.should.have.property( 't6' ).equal( Timers.default.t6 );
    t.should.have.property( 't7' ).equal( Timers.default.t7 );
    t.should.have.property( 't8' ).equal( Timers.default.t8 );
    t.should.have.property( 'linkTest' ).equal( Timers.default.linkTest );
  });

  it('should be created with set values(and default if not set ) #2', () => {
    const t = new Timers( 12, 33, 0, 25 );
   
    t.should.have.property( 't3' ).equal( 12 );
    t.should.have.property( 't5' ).equal( 33 );
    t.should.have.property( 't6' ).equal( Timers.default.t6 );
    t.should.have.property( 't7' ).equal( 25 );
    t.should.have.property( 't8' ).equal( Timers.default.t8 );
    t.should.have.property( 'linkTest' ).equal( Timers.default.linkTest );
  });

  it('should be created within valid ranges', () => {
    const t = new Timers( 1200, 250, 700, 800, 900, 1000 );
   
    t.should.have.property( 't3' ).equal( 120 );
    t.should.have.property( 't5' ).equal( 240 );
    t.should.have.property( 't6' ).equal( 240 );
    t.should.have.property( 't7' ).equal( 240 );
    t.should.have.property( 't8' ).equal( 120 );
    t.should.have.property( 'linkTest' ).equal( 120 );
  });

  it('should throw an exception if creating with invalid values (t3)', () => {
    expect( () => {
      new Timers( -10 );
    })
    .to.throw( Constants.getErrUShortNotInRange( 't3' ));
  });

  it('should throw an exception if creating with invalid values (t5)', () => {
    expect( () => {
      new Timers( 10, "ads" );
    })
    .to.throw( Constants.getErrUShortNotInRange( 't5' ));
  });

  it('should throw an exception if creating with invalid values (t6)', () => {
    expect( () => {
      new Timers( 10, 43, {t6:234} );
    })
    .to.throw( Constants.getErrUShortNotInRange( 't6' ));
  });

  it('should throw an exception if creating with invalid values (t7)', () => {
    expect( () => {
      new Timers( 10, 43, 243, () => 123 );
    })
    .to.throw( Constants.getErrUShortNotInRange( 't7' ));
  });

  it('should throw an exception if creating with invalid values (t8)', () => {
    expect( () => {
      new Timers( 10, 43, 143, 123, -1 );
    })
    .to.throw( Constants.getErrUShortNotInRange( 't8' ));
  });

  it('should throw an exception if creating with invalid values (lt)', () => {
    expect( () => {
      new Timers( 10, 43, 143, 123, 1, "oops" );
    })
    .to.throw( Constants.getErrUShortNotInRange( 'lt' ));
	});
	
	it('should not allow to modify timer values', () => {
		const t = new Timers( 10, 43, 143, 123, 1, 7 );

		t.t3 = 8776;
		t.t5 = "a";
		t.t6 = () => 1;
		t.t7 = "b";
		t.t8 = 12;
		t.linkTest = -123;


   
    t.should.have.property( 't3' ).equal( 10 );
    t.should.have.property( 't5' ).equal( 43 );
    t.should.have.property( 't6' ).equal( 143 );
    t.should.have.property( 't7' ).equal( 123 );
    t.should.have.property( 't8' ).equal( 1 );
    t.should.have.property( 'linkTest' ).equal( 7 );
	});
	
	it('should not allow to delete timer values', () => {
		const t = new Timers( 10, 43, 143, 123, 1, 7 );

		delete t.t3;
		delete t.t5;
		delete t.t6;
		delete t.t7;
		delete t.t8;
		delete t.linkTest;


   
    t.should.have.property( 't3' ).equal( 10 );
    t.should.have.property( 't5' ).equal( 43 );
    t.should.have.property( 't6' ).equal( 143 );
    t.should.have.property( 't7' ).equal( 123 );
    t.should.have.property( 't8' ).equal( 1 );
    t.should.have.property( 'linkTest' ).equal( 7 );
  });
  
});