var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

const { 
	DataItem,
	ItemFormat,
	Constants,
	Encoder } = require( '../../../src/hsms' )

const { 
	NoBuilderError,
	TooManyParamsError,
	InvalidEnumValueError,
  InvalidFormatError } = require( '../../../src/utils/errors/custom-errors' )

describe('Data Item I1', () => {
	it('should be created with a correct value (number)', () => {
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

	it('should be created with a correct value (set value before setting a format)', () => {
		const item = DataItem
			.builder
			.size( 123 )
			.value( 72 )
			.format( ItemFormat.I1 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 72 );
		item.should.have.property( 'format' ).equal( ItemFormat.I1 );
	});

	it('should be created with a correct value (neg number)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.I1 )
			.size( 123 )
			.value( -72 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( -72 );
		item.should.have.property( 'format' ).equal( ItemFormat.I1 );
	});

	it('should be created with a correct value (string)', () => {
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

	it('should be created with a correct value (single element array)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.I1 )
			.value( [ "-12" ] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( -12 );
		item.should.have.property( 'format' ).equal( ItemFormat.I1 );
	});

	it('should be created with default value', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.I1 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal('');
		item.should.have.property( 'format' ).equal(ItemFormat.I1 );
	});

	it('should be created with a default value via static method', () => {
		const item = DataItem.i1( 'temper' );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal('temper');
		item.should.have.property( 'format' ).equal(ItemFormat.I1 );
	});


	it('should throw an exception if passing an invalid value (null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( null )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (object)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( { name: "error" } )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing invalid value before setting a format', () => {
    expect( () => {
      DataItem
				.builder
				.value( 1232 )
				.format( ItemFormat.I1 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (too big value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( 1232434351 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (too small value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( -190 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( "1232" )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (too small string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( "-190" )
				.build();
    })
    .to.throw( InvalidFormatError );
	});


	it('should be created with a correct value (single value number array)', () => {
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


	it('should be created with a correct value (single value number array via static method )', () => {
		const item = DataItem.i1( "pressure", [17] );
			

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 17 );
		item.should.have.property( 'name' ).equal( "pressure" );
		item.should.have.property( 'format' ).equal(ItemFormat.I1 );
	});

	it('should be created with a correct value (single value string array)', () => {
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

	it('should be created with a correct value (single value string array via static method)', () => {
		const arr = new Array();
		arr.push( "13" )

		const item = DataItem.i1( "temp", arr );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 13 );
		item.should.have.property( 'name' ).equal( "temp" );
		item.should.have.property( 'format' ).equal(ItemFormat.I1 );
	});

	it('should be created with a correct value (single value number array with 0)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.I1 )
			.value( [0] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'format' ).equal(ItemFormat.I1 );
	});

	it('should be created with a correct value (single value number array with 0 via static method)', () => {
		const item = DataItem.i1( "test1", [0] );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal( "test1" );
		item.should.have.property( 'format' ).equal(ItemFormat.I1 );
	});


	it('should throw an exception if passing an invalid value (single value array with null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( [null] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with undefined)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( [undefined] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array object)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( { name: "error" } )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too big value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( [1232434351] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too big value via static method)', () => {
    expect( () => {
      DataItem.i1( "test2", [1232434351] );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing invalid value (single value array with too small value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( [-190] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too small value via static method)', () => {
    expect( () => {
      DataItem.i1( "test1", [-199] )
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( ["1232"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too small string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( ["-190"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should be created with a correct value (array of numbers)', () => {
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

	it('should be created with a correct value (array of numbers via static method)', () => {
		const item = DataItem.i1( 'pressure', 1, [123, 18, 91], "13" )

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([1, 123, 18, 91, 13])
		
		item.should.have.property( 'format' ).equal(ItemFormat.I1 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of strings)', () => {
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

	it('should be created with a correct value (array of zeros)', () => {
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

	it('should be created with a correct value (array of zeros via static method)', () => {
		const item = DataItem.i1( "pressure", 0, ["0", '0x0', 0], 0  )

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([0, 0, 0, 0, 0])
		
		item.should.have.property( 'format' ).equal(ItemFormat.I1 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});


  it('should throw an exception if passing invalid value (array with null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( [1, 8, null] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing invalid value (array with undefined)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( [1, undefined,  8] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of invalid objects)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( [ 64, 21, () => {}, { name: "error" } ] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big values)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( [1, 3, 4, 453 ] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too small value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( [-1, -6, -190] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( ["12", "0", "1232"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too small string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I1 )
				.value( [ "-4", "-190"] )
				.build();
    })
    .to.throw( InvalidFormatError );
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
		const item = DataItem.i1( "humidity", 34, ["0", "7", "-12"], 123, 1  );

		item.should.not.have.property( 'size' );
		
		expect(item.value ).to.have.ordered.members([34, 0, 7, -12, 123, 1 ])
		item.should.have.property( 'format' ).equal( ItemFormat.I1 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});

	it('encode must return valid binary stream (single value)', () => {
		const m = DataItem.i1( "temp", 123 );

    const encodedArray = Encoder.encode(m);
		const expectedArray = Buffer.from([0x65, 0x01, 0x7B ])
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});
	
	it('encode must return valid binary stream (array)', () => {
		const m = DataItem.i1( "temp", 87, 12, 54 );

    const encodedArray = Encoder.encode(m);
		const expectedArray = Buffer.from([0x65, 0x03, 0x57, 0x0C, 0x36 ])
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});
	
	it('should be equal items #1', () => {
		const itemA = DataItem.i1( "temp", -12 );
		const itemB = DataItem.i1( "pressure", -12 );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #2', () => {
		const itemA = DataItem.i1( "temp", 12, [45, "-13"], 12 );
		const itemB = DataItem.i1( "pressure", 12, "45", [-13, 12] );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #3', () => {
		const itemA = DataItem.i1( "temp", [12], );
		const itemB = DataItem.i1( "pressure", "12" );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #4', () => {
		const itemA = DataItem.i1( "temp", [11, -12, 0], );
		const itemB = DataItem.i1( "pressure", 11, "-12", [0] );
			
		( itemA.equals( itemB ) ).should.be.true;
	});


	it('should not be equal items #1', () => {
		const itemA = DataItem.i1( "temp", 12 );
		const itemB = DataItem.u2( "temp", 12 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #2', () => {
		const itemA = DataItem.i1( "temp", 12 );
		const itemB = DataItem.i1( "temp", -12 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #3', () => {
		const itemA = DataItem.i1( "temp", 12 );
		const itemB = DataItem.i1( "temp", 12, 13 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #4', () => {
		const itemA = DataItem.i1( "temp", [12, 13, 14] );
		const itemB = DataItem.i1( "temp", 12, 13 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});



});