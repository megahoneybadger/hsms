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

describe('Data Item I4', () => {
	it('should be created with a correct value (number)', () => {
		const item = DataItem
			.builder
			.size( 123 )
			.format( ItemFormat.I4 )
			.value( 7224123 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 7224123 );
		item.should.have.property( 'format' ).equal( ItemFormat.I4 );
	});

	it('should be created with a correct value (set value before setting a format)', () => {
		const item = DataItem
			.builder
			.size( 1233 )
			.format( ItemFormat.I4 )
			.value( -1237123 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( -1237123 );
		item.should.have.property( 'format' ).equal( ItemFormat.I4 );
	});

	it('should be created with a correct value (neg number)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.I4 )
			.size( 123 )
			.value( -7123420 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( -7123420 );
		item.should.have.property( 'format' ).equal( ItemFormat.I4 );
	});

	it('should be created with a correct value (neg string)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.I4 )
			.value( "-212232117" )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( -212232117 );
		item.should.have.property( 'format' ).equal( ItemFormat.I4 );
	});

	it('should be created with a correct value (0)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.I4 )
			.value( 0 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'format' ).equal( ItemFormat.I4 );
	});

	it('should be created with correct value (0 as string)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.I4 )
			.value( "0" )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'format' ).equal( ItemFormat.I4 );
	});

	it('should be created with a correct value (single element array)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.I4 )
			.value( [ "-12384123" ] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( -12384123 );
		item.should.have.property( 'format' ).equal( ItemFormat.I4 );
	});

	it('should be created with a default value', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.I4 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal('');
		item.should.have.property( 'format' ).equal(ItemFormat.I4 );
	});

	it('should be created with a default value via static method', () => {
		const item = DataItem.i4( 'temper' );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal('temper');
		item.should.have.property( 'format' ).equal(ItemFormat.I4 );
	});

	it('should throw an exception if passing an invalid value (null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I4 )
				.value( null )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of nulls)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I4 )
				.value( [null, null] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (undefined via static method)', () => {
		expect( () => {
      DataItem.i4( "humidity", null );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (object)', () => {
    expect( () => {
      DataItem
				.builder
				.value( { name: "error" } )
				.format(ItemFormat.I4 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value before setting a format', () => {
    expect( () => {
      DataItem
				.builder
				.value( 12324345121212 )
				.format(ItemFormat.I4 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (too big value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I4 )
				.value( 2147483648 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (too small value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I4 )
				.value( -2147483649 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I4 )
				.value( "123212345875" )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (too small string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I4 )
				.value( "-19789563290" )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should be created with a correct value (single value number array)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.I4 )
			.size( 12312 )
			.name( "pressure" )
			.value( [1711423] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 1711423 );
		item.should.have.property( 'name' ).equal( "pressure" );
		item.should.have.property( 'format' ).equal(ItemFormat.I4 );
	});

	it('should be created with a correct value (single value number array via static method )', () => {
		const item = DataItem.i4( "pressure", [171251233] );
			

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 171251233 );
		item.should.have.property( 'name' ).equal( "pressure" );
		item.should.have.property( 'format' ).equal(ItemFormat.I4 );
	});

	it('should be created with a correct value (single value string array)', () => {
		const arr = new Array();
		arr.push( "1121312" )

		const item = DataItem
			.builder
			.format(ItemFormat.I4 )
			.value( arr )
			.name( "temp" )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 1121312 );
		item.should.have.property( 'name' ).equal( "temp" );
		item.should.have.property( 'format' ).equal(ItemFormat.I4 );
	});

	it('should be created with a correct value (single value string array via static method)', () => {
		const arr = new Array();
		arr.push( "131224312" )

		const item = DataItem.i4( "temp", arr );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 131224312 );
		item.should.have.property( 'name' ).equal( "temp" );
		item.should.have.property( 'format' ).equal(ItemFormat.I4 );
	});

	it('should be created with a correct value (single value number array with 0)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.I4 )
			.name( "test1" )
			.value( [0] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal( "test1" );
		item.should.have.property( 'format' ).equal(ItemFormat.I4 );
	});

	it('should be created with a correct value (single value number array with 0 via static method)', () => {
		const item = DataItem.i4( "test1", [0] );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal( "test1" );
		item.should.have.property( 'format' ).equal(ItemFormat.I4 );
	});

	it('should throw an exception if passing an invalid value (single value array with null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I4 )
				.value( [null] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with undefined)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I4 )
				.value( [undefined] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array object)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I4 )
				.value( { name: "error" } )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too big value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I4 )
				.value( [123243435118] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too big value via static method)', () => {
    expect( () => {
      DataItem.i4( "test2", [2147483648] );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too small value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I4 )
				.value( [-2147483649] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too small value via static method)', () => {
    expect( () => {
      DataItem.i4( "test1", [-2147483650] )
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I4 )
				.value( ["2147483650"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too small string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I4 )
				.value( ["-2147483649"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should be created with a correct value (array of numbers)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.I4 )
			.size( 123 )
			.name( "pressure" )
			.value( [12354, 143281, -239120] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([12354, 143281, -239120])
		
		item.should.have.property( 'format' ).equal(ItemFormat.I4 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of numbers via static method)', () => {
		const item = DataItem.i4( 'pressure', 1, [123546534, 234181, 989120], "-1213243" )

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([1, 123546534, 234181, 989120, -1213243])
		
		item.should.have.property( 'format' ).equal(ItemFormat.I4 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of strings)', () => {
		const item = DataItem
			.builder
			.name( "pressure" )
			.format(ItemFormat.I4 )
			.value( ["9818123", '0x232', "-121231"] )
			.size( 123 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([9818123, 0x232, -121231])
		
		item.should.have.property( 'format' ).equal(ItemFormat.I4 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of zeros)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.I4 )
			.size( 123 )
			.name( "pressure" )
			.value( ["0", '0x0', 0] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([0, 0, 0])
		
		item.should.have.property( 'format' ).equal(ItemFormat.I4 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of zeros via static method)', () => {
		const item = DataItem.i4( "pressure", 0, ["0", '0x0', 0], 0  )

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([0, 0, 0, 0, 0])
		
		item.should.have.property( 'format' ).equal(ItemFormat.I4 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should throw an exception if passing an invalid value (array with null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I4 )
				.value( [1, 8, null] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array with undefined)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I4 )
				.value( [1, undefined,  8] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of invalid objects)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I4 )
				.value( [ 6412, 211, () => {}, { name: "error 1" } ] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big values)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I4 )
				.value( [11234, 312343, 2147483648, 453 ] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big values via static method)', () => {
    expect( () => {
      DataItem.i4( 'pressure', 11234, 312343, 2147483648, 453 );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too small value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I4 )
				.value( [-1, -6, -2147483649] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too small value via static method)', () => {
    expect( () => {
      DataItem.i4( "pres", [-1, -6, -2147483649] );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I4 )
				.value( ["12", "0", "2147483648"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big string value via static method)', () => {
    expect( () => {
      DataItem.i4( "pres", ["12", "0", "2147483648"] )
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too small string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I4 )
				.value( [ "-4", "-21474836489"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too small string value via static method)', () => {
    expect( () => {
      DataItem.i4( "pres", "-4", "-2147483649" )
    })
    .to.throw( InvalidFormatError );
	});

	it('should be created with correct value via data item static method #1', () => {
		const item = DataItem.numeric( ItemFormat.I4, "humidity", [122312] );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 122312 );
		item.should.have.property( 'format' ).equal( ItemFormat.I4 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});

	it('should be created with correct value via data item static method #2', () => {
		const item = DataItem.numeric( ItemFormat.I4, "humidity", 12876123, -6653234, "7" );

		item.should.not.have.property( 'size' );
		expect(item.value ).to.have.ordered.members([12876123, -6653234, 7 ])
		item.should.have.property( 'format' ).equal( ItemFormat.I4 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});

	it('should be created with correct value via data item static method #3', () => {
		const item = DataItem.i4( "humidity", [341241, '0xabc'], ["0", "712", "-1264312"], 123, 16754111, []   );

		item.should.not.have.property( 'size' );
		
		expect(item.value ).to.have.ordered.members([341241, 0xabc, 0, 712, -1264312, 123, 16754111 ])
		item.should.have.property( 'format' ).equal( ItemFormat.I4 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});

	it('encode must return valid binary stream (single value)', () => {
		const m = DataItem.i4( "temp", 855475 );

    const encodedArray = Encoder.encode(m);
		const expectedArray = Buffer.from([0x71, 0x04, 0x00, 0x0D, 0x0D, 0xB3  ])

		// console.log( encodedArray )
		// console.log( expectedArray )
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});

	it('encode must return valid binary stream (array)', () => {
		const m = DataItem.i4( "temp", -81270, 2147483640, "-2147483630" );

    const encodedArray = Encoder.encode(m);
		const expectedArray = Buffer.from([0x71, 0x0C, 0xFF, 0xFE, 0xC2, 0x8A, 0x7F, 0xFF, 0xFF, 0xF8, 0x80, 0x00, 0x00, 0x12  ])
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});

	it('should be equal items #1', () => {
		const itemA = DataItem.i4( "temp", -1215433 );
		const itemB = DataItem.i4( "pressure", -1215433 );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #2', () => {
		const itemA = DataItem.i4( "temp", 121240, [-45870, "-13320"], 1211 );
		const itemB = DataItem.i4( "pressure", 121240, "-45870", [-13320, 1211] );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #3', () => {
		const itemA = DataItem.i4( "temp", [12112432], );
		const itemB = DataItem.i4( "pressure", "12112432" );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #4', () => {
		const itemA = DataItem.i4( "temp", [11176542, -2147483630, 0], );
		const itemB = DataItem.i4( "pressure", 11176542, "-2147483630", [0] );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should not be equal items #2', () => {
		const itemA = DataItem.i4( "temp", 1232 );
		const itemB = DataItem.i4( "temp", -1232 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #3', () => {
		const itemA = DataItem.i4( "temp", 12 );
		const itemB = DataItem.i4( "temp", 12, 13 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #4', () => {
		const itemA = DataItem.i4( "temp", [-12, 130, 140] );
		const itemB = DataItem.i4( "temp", -12, 130 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});


});