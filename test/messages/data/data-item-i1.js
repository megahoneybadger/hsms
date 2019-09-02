var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

const { DataItem, ItemFormat, Constants } = require( '../../../src/hsms' )

describe('Data Item I1', () => {
	it('should be created with correct value (number)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.I1 )
			.size( 123 )
			.value( 7 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 7 );
		item.should.have.property( 'format' ).equal( ItemFormat.I1 );
	});

	it('should be created with correct value (string)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.I1 )
			.value( "117" )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 117 );
		item.should.have.property( 'format' ).equal( ItemFormat.I1 );
	});

	it('should be created with correct value (0)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.I1 )
			.value( 0 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'format' ).equal( ItemFormat.I1 );
	});

	it('should be created with undefined value (not set)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.I1 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).to.be.undefined;
		item.should.have.property( 'format' ).equal(ItemFormat.I1 );
	});


	it('should throw an exception if passing invalid value (null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( null )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});

	it('should throw an exception if passing invalid value (object)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( { name: "error" } )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});

	it('should throw an exception if passing invalid value (too big value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( 1232434351 )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});

	it('should throw an exception if passing invalid value (too small value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( -190 )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});

	it('should throw an exception if passing invalid value (too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( "1232" )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});

	it('should throw an exception if passing invalid value (too small string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( "-190" )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});


	it('should be created with correct value (single value number array)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.I1 )
			.size( 123 )
			.value( [17] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 17 );
		item.should.have.property( 'format' ).equal(ItemFormat.I1 );
	});

	it('should be created with correct value (single value string array)', () => {
		const arr = new Array();
		arr.push( "13" )

		const item = DataItem
			.builder
			.format(ItemFormat.I1 )
			.value( arr )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 13 );
		item.should.have.property( 'format' ).equal(ItemFormat.I1 );
	});

	it('should be created with correct value (single value number array with 0)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.I1 )
			.value( [0] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'format' ).equal(ItemFormat.I1 );
	});

	it('should throw an exception if passing invalid value (single value array with null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( [null] )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});

	it('should throw an exception if passing invalid value (single value array with undefined)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( [undefined] )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});

	it('should throw an exception if passing invalid value (single value array object)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( { name: "error" } )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});

	it('should throw an exception if passing invalid value (single value array with too big value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( [1232434351] )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});

	it('should throw an exception if passing invalid value (single value array with too small value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( [-190] )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});

	it('should throw an exception if passing invalid value (single value array with too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( ["1232"] )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});

	it('should throw an exception if passing invalid value (single value array with too small string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( ["-190"] )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});

	it('should be created with correct value (array of numbers)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.I1 )
			.size( 123 )
			.value( [123, 18, 90] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([123, 18, 90])
		
		item.should.have.property( 'format' ).equal(ItemFormat.I1 );
	});

	it('should be created with correct value (array of strings)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.I1 )
			.size( 123 )
			.value( ["78", '0x23', "-123"] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([78, 0x23, -123])
		
		item.should.have.property( 'format' ).equal(ItemFormat.I1 );
	});

	it('should be created with correct value (array of zeros)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.I1 )
			.size( 123 )
			.value( ["0", '0x0', 0] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([0, 0, 0])
		
		item.should.have.property( 'format' ).equal(ItemFormat.I1 );
	});


  it('should throw an exception if passing invalid value (array with null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( [1, 8, null] )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});

	it('should throw an exception if passing invalid value (array with undefined)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( [1, undefined,  8] )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});

	it('should throw an exception if passing invalid value (array of invalid objects)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( [ 64, 21, () => {}, { name: "error" } ] )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});

	it('should throw an exception if passing invalid value (array of too big values)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( [1, 3, 4, 453 ] )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});

	it('should throw an exception if passing invalid value (array of too small value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( [-1, -6, -190] )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});

	it('should throw an exception if passing invalid value (array of too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( ["12", "0", "1232"] )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});

	it('should throw an exception if passing invalid value (array of too small string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( [ "-4", "-190"] )
				.build();
    })
    .to.throw( TypeError, Constants.INVALID_ITEM_VALUE_OR_FORMAT );
	});

	it('should be created with correct value via data item static method #1', () => {
		const item = DataItem.numeric( ItemFormat.I1, "humidity", [123] );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 123 );
		item.should.have.property( 'format' ).equal( ItemFormat.I1 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});

	it('should be created with correct value via data item static method #2', () => {
		const item = DataItem.numeric( ItemFormat.I1, "humidity", 123, -6, "7" );

		item.should.not.have.property( 'size' );
		expect(item.value ).to.have.ordered.members([123, -6, 7 ])
		item.should.have.property( 'format' ).equal( ItemFormat.I1 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});

	it('should be created with correct value via data item static method #3', () => {
		const item = DataItem.i1( "humidity", ["0", "7", "-12"]  );

		item.should.not.have.property( 'size' );
		console.log( item.value );
		expect(item.value ).to.have.ordered.members([0, 7, -12 ])
		item.should.have.property( 'format' ).equal( ItemFormat.I1 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});
});