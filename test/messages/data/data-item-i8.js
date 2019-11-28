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

describe('Data Item I8', () => {

	it('should be created with a correct value (number)', () => {
		const item = DataItem
			.builder
			.size( 123 )
			.format( ItemFormat.I8 )
			.value( 9007199254740990 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 9007199254740990 );
		item.should.have.property( 'format' ).equal( ItemFormat.I8 );
		
	});

	it('should be created with a correct value (set value before setting a format)', () => {
		const item = DataItem
			.builder
			.size( 1233 )
			.format( ItemFormat.I8 )
			.value( -9007199254740990 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( -9007199254740990 );
		item.should.have.property( 'format' ).equal( ItemFormat.I8 );	

	});

	it('should be created with a correct value (neg number)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.I8 )
			.size( 123 )
			.value( -71212323420 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( -71212323420 );
		item.should.have.property( 'format' ).equal( ItemFormat.I8 );
	});

	it('should be created with a correct value (neg string)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.I8 )
			.value( "-212237652117" )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( -212237652117 );
		item.should.have.property( 'format' ).equal( ItemFormat.I8 );
	});

	it('should be created with a correct value (0)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.I8 )
			.value( 0 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'format' ).equal( ItemFormat.I8 );
	});

	it('should be created with correct value (0 as string)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.I8 )
			.value( "0" )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'format' ).equal( ItemFormat.I8 );
	});

	it('should be created with a correct value (single element array)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.I8 )
			.value( [ "-90071992547409" ] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( -90071992547409 );
		item.should.have.property( 'format' ).equal( ItemFormat.I8 );
	});

	it('should be created with a default value', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.I8 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal('');
		item.should.have.property( 'format' ).equal(ItemFormat.I8 );
	});

	it('should be created with a default value via static method', () => {
		const item = DataItem.i8( 'temper' );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal('temper');
		item.should.have.property( 'format' ).equal(ItemFormat.I8 );
	});

	it('should throw an exception if passing an invalid value (null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I8 )
				.value( null )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of nulls)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I8 )
				.value( [null, null] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (undefined via static method)', () => {
		expect( () => {
      DataItem.i8( "humidity", null );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (object)', () => {
    expect( () => {
      DataItem
				.builder
				.value( { name: "error" } )
				.format(ItemFormat.I8 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value before setting a format', () => {
    expect( () => {
      DataItem
				.builder
				.value( 12324321345121212 )
				.format(ItemFormat.I8 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (too big value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I8 )
				.value( 9007199254740992 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (too small value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I8 )
				.value( -9007199254740992 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I8 )
				.value( "9007199254740992213" )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (too small string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I8 )
				.value( "-900719925474099112" )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should be created with a correct value (single value number array)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.I8 )
			.size( 12312 )
			.name( "pressure" )
			.value( [900719925474099] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 900719925474099 );
		item.should.have.property( 'name' ).equal( "pressure" );
		item.should.have.property( 'format' ).equal(ItemFormat.I8 );
	});

	it('should be created with a correct value (single value number array via static method )', () => {
		const item = DataItem.i8( "pressure", [900719925474099] );
			

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 900719925474099 );
		item.should.have.property( 'name' ).equal( "pressure" );
		item.should.have.property( 'format' ).equal(ItemFormat.I8 );
	});

	it('should be created with a correct value (single value string array)', () => {
		const arr = new Array();
		arr.push( "1121321434312" )

		const item = DataItem
			.builder
			.format(ItemFormat.I8 )
			.value( arr )
			.name( "temp" )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 1121321434312 );
		item.should.have.property( 'name' ).equal( "temp" );
		item.should.have.property( 'format' ).equal(ItemFormat.I8 );
	});

	it('should be created with a correct value (single value string array via static method)', () => {
		const arr = new Array();
		arr.push( "1312765456424312" )

		const item = DataItem.i8( "temp", arr );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 1312765456424312 );
		item.should.have.property( 'name' ).equal( "temp" );
		item.should.have.property( 'format' ).equal(ItemFormat.I8 );
	});

	it('should be created with a correct value (single value number array with 0)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.I8 )
			.name( "test1" )
			.value( [0] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal( "test1" );
		item.should.have.property( 'format' ).equal(ItemFormat.I8 );
	});

	it('should be created with a correct value (single value number array with 0 via static method)', () => {
		const item = DataItem.i8( "test1", [0] );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal( "test1" );
		item.should.have.property( 'format' ).equal(ItemFormat.I8 );
	});

	it('should throw an exception if passing an invalid value (single value array with null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I8 )
				.value( [null] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with undefined)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I8 )
				.value( [undefined] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array object)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I8 )
				.value( { name: "error" } )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too big value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I8 )
				.value( [9007199254740992] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too big value via static method)', () => {
    expect( () => {
      DataItem.i8( "test2", [9007199254740994] );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too small value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I8 )
				.value( [-9007199254740994] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too small value via static method)', () => {
    expect( () => {
      DataItem.i8( "test1", [-21474854322343650] )
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I8 )
				.value( ["2147412434214583650"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too small string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I8 )
				.value( ["-21476432143483649"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should be created with a correct value (array of numbers)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.I8 )
			.size( 123 )
			.name( "pressure" )
			.value( [1235412321, 9007199254740991, -9007199254740991] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([1235412321, 9007199254740991, -9007199254740991])
		
		item.should.have.property( 'format' ).equal(ItemFormat.I8 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of numbers via static method)', () => {
		const item = DataItem.i8( 'pressure', 1, [123432234546534, 23445345181, 98923454120], "-1213987667243" )

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([1, 123432234546534, 23445345181, 98923454120, -1213987667243])
		
		item.should.have.property( 'format' ).equal(ItemFormat.I8 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of strings)', () => {
		const item = DataItem
			.builder
			.name( "pressure" )
			.format(ItemFormat.I8 )
			.value( ["9818121123123", '0x23212321', "-121123234231"] )
			.size( 123 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([9818121123123, 0x23212321, -121123234231])
		
		item.should.have.property( 'format' ).equal(ItemFormat.I8 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of zeros)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.I8 )
			.size( 123 )
			.name( "pressure" )
			.value( ["0", '0x0', 0] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([0, 0, 0])
		
		item.should.have.property( 'format' ).equal(ItemFormat.I8 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of zeros via static method)', () => {
		const item = DataItem.i8( "pressure", 0, ["0", '0x0', 0], 0  )

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([0, 0, 0, 0, 0])
		
		item.should.have.property( 'format' ).equal(ItemFormat.I8 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should throw an exception if passing an invalid value (array with null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I8 )
				.value( [1, 8, null] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array with undefined)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I8 )
				.value( [1, undefined,  8] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of invalid objects)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I8 )
				.value( [ 6412, 211, () => {}, { name: "error 1" } ] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big values)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I8 )
				.value( [11234, 312343, 90071992547409912, 453 ] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});


	it('should throw an exception if passing an invalid value (array of too big values via static method)', () => {
    expect( () => {
      DataItem.i8( 'pressure', 11234, 312343, 90071992547409912, 453 );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too small value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I8 )
				.value( [-1, -6, -90071992547409912] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});


	it('should throw an exception if passing an invalid value (array of too small value via static method)', () => {
    expect( () => {
      DataItem.i8( "pres", [-1, -6, -90071992547409911] );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I8 )
				.value( ["12", "0", "90071992547409911"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big string value via static method)', () => {
    expect( () => {
      DataItem.i8( "pres", ["12", "0", "90071992547409911"] )
    })
    .to.throw( InvalidFormatError );
	});


	it('should throw an exception if passing an invalid value (array of too small string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.I8 )
				.value( [ "-4", "-90071992547409911"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too small string value via static method)', () => {
    expect( () => {
      DataItem.i8( "pres", "-4", "-90071992547409911" )
    })
    .to.throw( InvalidFormatError );
	});

	it('should be created with correct value via data item static method #1', () => {
		const item = DataItem.numeric( ItemFormat.I8, "humidity", [900719925474099] );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 900719925474099 );
		item.should.have.property( 'format' ).equal( ItemFormat.I8 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});

	it('should be created with correct value via data item static method #2', () => {
		const item = DataItem.numeric( ItemFormat.I8, "humidity", 900719925474099, -9007199254740, "7" );

		item.should.not.have.property( 'size' );
		expect(item.value ).to.have.ordered.members([900719925474099, -9007199254740, 7 ])
		item.should.have.property( 'format' ).equal( ItemFormat.I8 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});

	it('should be created with correct value via data item static method #3', () => {
		const item = DataItem.i8( "humidity", [341241, '0xabc'], ["0", "712", "-9007199254740991"], 123, 9007199254740991, []   );

		item.should.not.have.property( 'size' );
		
		expect(item.value ).to.have.ordered.members([341241, 0xabc, 0, 712, -9007199254740991, 123, 9007199254740991 ])
		item.should.have.property( 'format' ).equal( ItemFormat.I8 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});

	it('encode must return valid binary stream (single value)', () => {
		const m = DataItem.i8( "temp", 8007199254740991 );

    const encodedArray = Encoder.encode(m);
		const expectedArray = Buffer.from([0x61, 0x08, 0x00, 0x1C, 0x72, 0x81, 0x5B, 0x39, 0x7F, 0xFF ])

		// console.log( encodedArray )
		// console.log( expectedArray )
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});

	it('encode must return valid binary stream (array)', () => {
		const m = DataItem.i8( "temp",  8007199254740991, 32178918723, -7891273712836 );

    const encodedArray = Encoder.encode(m);
		const expectedArray = Buffer.from([
			0x61, 0x18, 0x00, 0x1C, 0x72, 0x81, 0x5B, 0x39, 0x7F, 0xFF,
			0x00, 0x00, 0x00, 0x07, 0x7E, 0x03, 0x55, 0x43, 0xFF, 0xFF, 
			0xF8, 0xD2, 0xAB, 0x6E, 0xFB, 0x3C ])
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});

	it('should be equal items #1', () => {
		const itemA = DataItem.i8( "temp", -7891273712836 );
		const itemB = DataItem.i8( "pressure", -7891273712836 );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #2', () => {
		const itemA = DataItem.i8( "temp", 8007199254740991, [-7891273712836, "-13320"], 1211 );
		const itemB = DataItem.i8( "pressure", 8007199254740991, "-7891273712836", [-13320, 1211] );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #3', () => {
		const itemA = DataItem.i8( "temp", [9007199254740991], );
		const itemB = DataItem.i8( "pressure", "9007199254740991" );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #4', () => {
		const itemA = DataItem.i8( "temp", [9007199254740991, -21474121283630, 0], );
		const itemB = DataItem.i8( "pressure", 9007199254740991, "-21474121283630", [0] );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should not be equal items #2', () => {
		const itemA = DataItem.i8( "temp", 1232 );
		const itemB = DataItem.i8( "temp", -9007199254740991 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #3', () => {
		const itemA = DataItem.i8( "temp", 12 );
		const itemB = DataItem.i8( "temp", 12, 13 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #4', () => {
		const itemA = DataItem.i8( "temp", [-12, 130, 140] );
		const itemB = DataItem.i8( "temp", -12, 130 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});


});