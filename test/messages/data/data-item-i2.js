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

describe('Data Item I2', () => {
	it('should be created with a correct value (number)', () => {
		const item = DataItem
			.builder
			.size( 123 )
			.format( ItemFormat.I2 )
			.value( 7224 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 7224 );
		item.should.have.property( 'format' ).equal( ItemFormat.I2 );
	});
	
	it('should be created with a correct value (set value before setting a format)', () => {
		const item = DataItem
			.builder
			.size( 1233 )
			.format( ItemFormat.I2 )
			.value( 7123 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 7123 );
		item.should.have.property( 'format' ).equal( ItemFormat.I2 );
	});

	it('should be created with a correct value (neg number)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.I2 )
			.size( 123 )
			.value( -720 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( -720 );
		item.should.have.property( 'format' ).equal( ItemFormat.I2 );
	});

	it('should be created with a correct value (neg string)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.I2 )
			.value( "-2117" )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( -2117 );
		item.should.have.property( 'format' ).equal( ItemFormat.I2 );
	});

	it('should be created with a correct value (0)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.I2 )
			.value( 0 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'format' ).equal( ItemFormat.I2 );
	});

	it('should be created with correct value (0 as string)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.I2 )
			.value( "0" )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'format' ).equal( ItemFormat.I2 );
	});

	it('should be created with a correct value (single element array)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.I2 )
			.value( [ "-12384" ] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( -12384 );
		item.should.have.property( 'format' ).equal( ItemFormat.I2 );
	});

	it('should be created with a default value', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.I2 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal('');
		item.should.have.property( 'format' ).equal(ItemFormat.I2 );
	});

	it('should be created with a default value via static method', () => {
		const item = DataItem.i2( 'temper' );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal('temper');
		item.should.have.property( 'format' ).equal(ItemFormat.I2 );
	});

	it('should throw an exception if passing an invalid value (null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I2 )
				.value( null )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of nulls)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I2 )
				.value( [null, null] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (undefined via static method)', () => {
		expect( () => {
      DataItem.i2( "humidity", null );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (object)', () => {
    expect( () => {
      DataItem
				.builder
				.value( { name: "error" } )
				.format(ItemFormat.I2 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value before setting a format', () => {
    expect( () => {
      DataItem
				.builder
				.value( 12324345 )
				.format(ItemFormat.I2 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (too big value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I2 )
				.value( 1232434351 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (too small value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I2 )
				.value( -191234 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I2 )
				.value( "123212345" )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (too small string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I2 )
				.value( "-197890" )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should be created with a correct value (single value number array)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.I2 )
			.size( 12312 )
			.name( "pressure" )
			.value( [17123] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 17123 );
		item.should.have.property( 'name' ).equal( "pressure" );
		item.should.have.property( 'format' ).equal(ItemFormat.I2 );
	});

	it('should be created with a correct value (single value number array via static method )', () => {
		const item = DataItem.i2( "pressure", [17123] );
			

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 17123 );
		item.should.have.property( 'name' ).equal( "pressure" );
		item.should.have.property( 'format' ).equal(ItemFormat.I2 );
	});

	it('should be created with a correct value (single value string array)', () => {
		const arr = new Array();
		arr.push( "1312" )

		const item = DataItem
			.builder
			.format(ItemFormat.I2 )
			.value( arr )
			.name( "temp" )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 1312 );
		item.should.have.property( 'name' ).equal( "temp" );
		item.should.have.property( 'format' ).equal(ItemFormat.I2 );
	});

	it('should be created with a correct value (single value string array via static method)', () => {
		const arr = new Array();
		arr.push( "1312" )

		const item = DataItem.i2( "temp", arr );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 1312 );
		item.should.have.property( 'name' ).equal( "temp" );
		item.should.have.property( 'format' ).equal(ItemFormat.I2 );
	});

	it('should be created with a correct value (single value number array with 0)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.I2 )
			.name( "test1" )
			.value( [0] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal( "test1" );
		item.should.have.property( 'format' ).equal(ItemFormat.I2 );
	});

	it('should be created with a correct value (single value number array with 0 via static method)', () => {
		const item = DataItem.i2( "test1", [0] );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal( "test1" );
		item.should.have.property( 'format' ).equal(ItemFormat.I2 );
	});


	it('should throw an exception if passing an invalid value (single value array with null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I2 )
				.value( [null] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with undefined)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I2 )
				.value( [undefined] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array object)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I2 )
				.value( { name: "error" } )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too big value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I2 )
				.value( [1232434351] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too big value via static method)', () => {
    expect( () => {
      DataItem.i2( "test2", [1232434351] );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too small value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I2 )
				.value( [-199078] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too small value via static method)', () => {
    expect( () => {
      DataItem.i2( "test1", [-199078] )
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I2 )
				.value( ["1232234"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too small string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I2 )
				.value( ["-1986556"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should be created with a correct value (array of numbers)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.I2 )
			.size( 123 )
			.name( "pressure" )
			.value( [12354, 181, 9120] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([12354, 181, 9120])
		
		item.should.have.property( 'format' ).equal(ItemFormat.I2 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of numbers via static method)', () => {
		const item = DataItem.i2( 'pressure', 1, [12354, 181, 9120], "13243" )

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([1, 12354, 181, 9120, 13243])
		
		item.should.have.property( 'format' ).equal(ItemFormat.I2 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of strings)', () => {
		const item = DataItem
			.builder
			.name( "pressure" )
			.format(ItemFormat.I2 )
			.value( ["18123", '0x232', "-1231"] )
			.size( 123 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([18123, 0x232, -1231])
		
		item.should.have.property( 'format' ).equal(ItemFormat.I2 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of zeros)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.I2 )
			.size( 123 )
			.name( "pressure" )
			.value( ["0", '0x0', 0] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([0, 0, 0])
		
		item.should.have.property( 'format' ).equal(ItemFormat.I2 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of zeros via static method)', () => {
		const item = DataItem.i2( "pressure", 0, ["0", '0x0', 0], 0  )

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([0, 0, 0, 0, 0])
		
		item.should.have.property( 'format' ).equal(ItemFormat.I2 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});


	it('should throw an exception if passing an invalid value (array with null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I2 )
				.value( [1, 8, null] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array with undefined)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I2 )
				.value( [1, undefined,  8] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of invalid objects)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I2 )
				.value( [ 6412, 211, () => {}, { name: "error 1" } ] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big values)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I2 )
				.value( [11234, 312343, 412, 453 ] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big values via static method)', () => {
    expect( () => {
      DataItem.i2( 'pressure', 11234, 312343, 412, 453 );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too small value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I2 )
				.value( [-1, -6, -192340] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too small value via static method)', () => {
    expect( () => {
      DataItem.i2( "pres", [-1, -6, -192340] );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I2 )
				.value( ["12", "0", "123212"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big string value via static method)', () => {
    expect( () => {
      DataItem.i2( "pres", ["12", "0", "123212"] )
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too small string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I2 )
				.value( [ "-4", "-33122"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too small string value via static method)', () => {
    expect( () => {
      DataItem.i2( "pres", "-4", "-33122" )
    })
    .to.throw( InvalidFormatError );
	});

	it('should be created with correct value via data item static method #1', () => {
		const item = DataItem.numeric( ItemFormat.I2, "humidity", [123] );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 123 );
		item.should.have.property( 'format' ).equal( ItemFormat.I2 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});

	it('should be created with correct value via data item static method #2', () => {
		const item = DataItem.numeric( ItemFormat.I2, "humidity", 123, -6, "7" );

		item.should.not.have.property( 'size' );
		expect(item.value ).to.have.ordered.members([123, -6, 7 ])
		item.should.have.property( 'format' ).equal( ItemFormat.I2 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});

	it('should be created with correct value via data item static method #3', () => {
		const item = DataItem.i2( "humidity", [341, '0xabc'], ["0", "712", "-1212"], 123, 1111, []   );

		item.should.not.have.property( 'size' );
		
		expect(item.value ).to.have.ordered.members([341, 0xabc, 0, 712, -1212, 123, 1111 ])
		item.should.have.property( 'format' ).equal( ItemFormat.I2 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});



	it('encode must return valid binary stream (single value)', () => {
		const m = DataItem.i2( "temp", 1656 );

    const encodedArray = Encoder.encode(m);
		const expectedArray = Buffer.from([0x69, 0x02, 0x06, 0x78  ])

		console.log( encodedArray )
		console.log( expectedArray )
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});

	it('encode must return valid binary stream (array)', () => {
		const m = DataItem.i2( "temp", -870, 1265, "-5431" );

    const encodedArray = Encoder.encode(m);
		const expectedArray = Buffer.from([0x69, 0x06, 0xFC, 0x9A, 0x04, 0xF1, 0xEA, 0xC9 ])
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});

	it('should be equal items #1', () => {
		const itemA = DataItem.i2( "temp", -1213 );
		const itemB = DataItem.i2( "pressure", -1213 );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #2', () => {
		const itemA = DataItem.i2( "temp", 120, [-450, "-130"], 1211 );
		const itemB = DataItem.i2( "pressure", 120, "-450", [-130, 1211] );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #3', () => {
		const itemA = DataItem.i2( "temp", [1212], );
		const itemB = DataItem.i2( "pressure", "1212" );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #4', () => {
		const itemA = DataItem.i2( "temp", [1112, -122, 0], );
		const itemB = DataItem.i2( "pressure", 1112, "-122", [0] );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	
	it('should not be equal items #2', () => {
		const itemA = DataItem.i2( "temp", 1232 );
		const itemB = DataItem.i2( "temp", -1232 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #3', () => {
		const itemA = DataItem.i2( "temp", 12 );
		const itemB = DataItem.i2( "temp", 12, 13 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #4', () => {
		const itemA = DataItem.i2( "temp", [-12, 130, 140] );
		const itemB = DataItem.i2( "temp", -12, 130 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});



	
});