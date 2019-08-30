var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

const { DataItem, Constants } = require( '../../../src/hsms' )

describe('Data Item', () => {
  it('should throw an exception if creating without a builder #1', () => {
    expect( () => {
      const m = new DataItem( 1 );
    })
    .to.throw( TypeError, Constants.CANNOT_CONSTRUCT_WITHOUT_BUILDER );
	});

	it('should throw an exception if creating without a builder #2', () => {
    expect( () => {
      const m = new DataItem();
    })
    .to.throw( TypeError, Constants.CANNOT_CONSTRUCT_WITHOUT_BUILDER );
	});
	
	it('should throw an exception if passing too many params', () => {
    expect( () => {
      const m = new DataItem( DataItem.builder, 1, "error" );
    })
    .to.throw( TypeError, Constants.TOO_MANY_CONSTRUCT_PARAMS );
	});
	
	it('should be created with non-empty name', () => {
		const item = DataItem
			.builder
			.name( "john" )
			.build();

    item.should.have.property( 'name' ).equal( "john" );
    
	});
	
	it('should be created with non-empty name even if a name was not provided', () => {
		const item = DataItem
			.builder
			.build();

    item.should.have.property( 'name' ).equal( "" );
	});
	
	it('should return builder non-empty name with getter', () => {
		const builder = DataItem.builder;

		builder.name( "john" );

    builder.name().should.equal( "john" );
	});
	
	it('should return builder empty name with getter', () => {
		const builder = DataItem.builder;

    builder.name().should.equal( "" );
	});
	
	it('should throw an exception if passing non-string name', () => {
    expect( () => {
      DataItem
				.builder
				.name( 123 )
				.build();
    })
    .to.throw( TypeError, Constants.getErrMustBeString( 'name' ) );
	});

	it('should throw an exception if passing invalid format value #1 (incorrect string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format( "super bad value" )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ENUM_VALUE );
	});

	it('should throw an exception if passing invalid format value #2 (not existing number value)', () => {
    expect( () => {
      DataItem
				.builder
				.format( 1000 )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ENUM_VALUE );
	});

	it('should throw an exception if passing invalid format value #3 (null)', () => {
    expect( () => {
      DataItem
				.builder
				.format( null )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ENUM_VALUE );
	});

	it('should throw an exception if passing invalid format value #4 (case sensitive string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format( "f4" )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ENUM_VALUE );
	});

	it('should be created with non-empty format even if a format was not provided', () => {
		const item = DataItem
			.builder
			.build();

		item.should.have.property( 'format' ).equal( DataItem.format.I2 );
		item.should.have.property( 'name' ).equal( '' );
	});

	it('should be created with correct format #1', () => {
		const item = DataItem
			.builder
			.format( DataItem.format.U4 )
			.name( "item #1" )
			.build();

		item.should.have.property( 'format' ).equal( DataItem.format.U4 );
		item.should.have.property( 'name' ).equal( 'item #1' );
	});

	it('should be created with correct format even is passing number', () => {
		const item = DataItem
			.builder
			.format( 100 )
			.build();

		item.should.have.property( 'format' ).equal( DataItem.format.I1 );
	});

	it('should be created with correct format even is passing string', () => {
		const item = DataItem
			.builder
			.format( "F4" )
			.build();

		item.should.have.property( 'format' ).equal( DataItem.format.F4 );
	});

	it('should be created with correct format and empty size', () => {
		const item = DataItem
			.builder
			.format( "F4" )
			.build();

		item.should.have.property( 'format' ).equal( DataItem.format.F4 );
		item.should.not.have.property( 'size' );
	});

	it('should throw an exception if passing invalid size (string value)', () => {
    expect( () => {
      DataItem
				.builder
				.size( "wrong value" )
				.build();
    })
    .to.throw( TypeError, Constants.getErrUShortNotInRange( "Size" ) );
	});

	it('should throw an exception if passing invalid size (negative value)', () => {
    expect( () => {
      DataItem
				.builder
				.size( -50 )
				.build();
    })
    .to.throw( TypeError, Constants.getErrUShortNotInRange( "Size" ) );
	});

	it('should throw an exception if passing invalid size (too big value)', () => {
    expect( () => {
      DataItem
				.builder
				.size( 500000 )
				.build();
    })
    .to.throw( TypeError, Constants.getErrUShortNotInRange( "Size" ) );
	});

	it('should be created with undefined size #1', () => {
		const item = DataItem
			.builder
			.format( "F8" )
			.size( 555 )
			.build();

		item.should.not.have.property( 'size' );
	});

	it('should be created with undefined size #2', () => {
		const item = DataItem
			.builder
			.format( DataItem.format.I2 )
			.size( "555" )
			.build();

		item.should.not.have.property( 'size' );
	});

	it('should be created with undefined size #3', () => {
		const item = DataItem
			.builder
			.format( DataItem.format.I4 )
			.size( 0 )
			.build();

		item.should.not.have.property( 'size' );
	});

	it('should be created with undefined size #4', () => {
		const item = DataItem
			.builder
			.size( 110 )
			.build();

		item.should.not.have.property( 'size' );
	});

	it('should be created with undefined size #5', () => {
		const item = DataItem
			.builder
			.format( "A" )
			.size( 110 )
			.format( "I2" )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'format' ).equal( DataItem.format.I2 );
	});

	it('should be created with correct size #1', () => {
		const item = DataItem
			.builder
			.format( DataItem.format.A )
			.size( 10 )
			.build();

		item.should.have.property( 'size' ).equal( 10 );
	});

	it('should be created with correct size #2', () => {
		const item = DataItem
			.builder
			.format( DataItem.format.Bin )
			.size( "0" )
			.build();

		item.should.have.property( 'size' ).equal( 0 );
	});

	it('should be created with correct size #2', () => {
		const item = DataItem
			.builder
			.format( DataItem.format.A )
			.size( "5423" )
			.build();

		item.should.have.property( 'size' ).equal( 5423 );
	});

	it('should be created with correct value I1 (number)', () => {
		const item = DataItem
			.builder
			.format( DataItem.format.I1 )
			.size( 123 )
			.value( 7 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 7 );
		item.should.have.property( 'format' ).equal( DataItem.format.I1 );
	});

	it('should be created with correct value I1 (string)', () => {
		const item = DataItem
			.builder
			.format( DataItem.format.I1 )
			.value( "117" )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 117 );
		item.should.have.property( 'format' ).equal( DataItem.format.I1 );
	});

	it('should be created with correct value I1 (0)', () => {
		const item = DataItem
			.builder
			.format( DataItem.format.I1 )
			.value( 0 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'format' ).equal( DataItem.format.I1 );
	});

	it('should be created with undefined value I1 (not set)', () => {
		const item = DataItem
			.builder
			.format( DataItem.format.I1 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).to.be.undefined;
		item.should.have.property( 'format' ).equal( DataItem.format.I1 );
	});


	it('should throw an exception if passing invalid I1 value (null)', () => {
    expect( () => {
      DataItem
				.builder
				.format( DataItem.format.I1 )
				.value( null )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});

	it('should throw an exception if passing invalid I1 value (object)', () => {
    expect( () => {
      DataItem
				.builder
				.format( DataItem.format.I1 )
				.value( { name: "error" } )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});

	it('should throw an exception if passing invalid I1 value (to big value)', () => {
    expect( () => {
      DataItem
				.builder
				.format( DataItem.format.I1 )
				.value( 1232434351 )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});

	it('should throw an exception if passing invalid I1 value (to small value)', () => {
    expect( () => {
      DataItem
				.builder
				.format( DataItem.format.I1 )
				.value( -190 )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});

	it('should throw an exception if passing invalid I1 value (to big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format( DataItem.format.I1 )
				.value( "1232" )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});

	it('should throw an exception if passing invalid I1 value (to small string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format( DataItem.format.I1 )
				.value( "-190" )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});




  
});