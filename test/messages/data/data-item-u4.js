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

describe('Data Item U4', () => {
	it('should be created with a correct value (number)', () => {
		const item = DataItem
			.builder
			.size( 123 )
			.format( ItemFormat.U4 )
			.value( 6543000 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 6543000 );
		item.should.have.property( 'format' ).equal( ItemFormat.U4 );
	});

	
	it('should be created with a correct value (0)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.U4 )
			.value( 0 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'format' ).equal( ItemFormat.U4 );
	});

	it('should be created with correct value (0 as string)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.U4 )
			.value( "0" )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'format' ).equal( ItemFormat.U4 );
	});

	it('should be created with a correct value (single element array)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.U4 )
			.value( [ "12354384" ] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 12354384 );
		item.should.have.property( 'format' ).equal( ItemFormat.U4 );
	});

	it('should be created with a default value', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.U4 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal('');
		item.should.have.property( 'format' ).equal(ItemFormat.U4 );
	});

	it('should be created with a default value via static method', () => {
		const item = DataItem.u4( 'temper' );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal('temper');
		item.should.have.property( 'format' ).equal(ItemFormat.U4 );
	});

	it('should throw an exception if passing an invalid value (null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U4 )
				.value( null )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of nulls)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U4 )
				.value( [null, null] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (undefined via static method)', () => {
		expect( () => {
      DataItem.u4( "humidity", null );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (object)', () => {
    expect( () => {
      DataItem
				.builder
				.value( { name: "error" } )
				.format(ItemFormat.U4 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value before setting a format', () => {
    expect( () => {
      DataItem
				.builder
				.value( 12324345 )
				.format(ItemFormat.U4 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (too big value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U4 )
				.value( 4294967296 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing a negative value', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U4 )
				.value( -19 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U4 )
				.value( "4294967297" )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (negative string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U4 )
				.value( "-19" )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should be created with a correct value (single value number array)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.U4 )
			.size( 12 )
			.name( "pressure" )
			.value( [62364512] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 62364512 );
		item.should.have.property( 'name' ).equal( "pressure" );
		item.should.have.property( 'format' ).equal(ItemFormat.U4 );
	});

	it('should be created with a correct value (single value number array via static method )', () => {
		const item = DataItem.u4( "pressure", [4294967294] );
			

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 4294967294 );
		item.should.have.property( 'name' ).equal( "pressure" );
		item.should.have.property( 'format' ).equal(ItemFormat.U4 );
	});

	it('should be created with a correct value (single value string array)', () => {
		const arr = new Array();
		arr.push( "4294967280" )

		const item = DataItem
			.builder
			.format(ItemFormat.U4 )
			.value( arr )
			.name( "temp" )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 4294967280 );
		item.should.have.property( 'name' ).equal( "temp" );
		item.should.have.property( 'format' ).equal(ItemFormat.U4 );
	});

	it('should be created with a correct value (single value string array via static method)', () => {
		const arr = new Array();
		arr.push( "4294967280" )

		const item = DataItem.u4( "temp", arr );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 4294967280 );
		item.should.have.property( 'name' ).equal( "temp" );
		item.should.have.property( 'format' ).equal(ItemFormat.U4 );
	});

	it('should be created with a correct value (single value number array with 0)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.U4 )
			.name( "test1" )
			.value( [0] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal( "test1" );
		item.should.have.property( 'format' ).equal(ItemFormat.U4 );
	});

	it('should be created with a correct value (single value number array with 0 via static method)', () => {
		const item = DataItem.u4( "test1", [0] );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal( "test1" );
		item.should.have.property( 'format' ).equal(ItemFormat.U4 );
	});

	it('should throw an exception if passing an invalid value (single value array with null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U4 )
				.value( [null] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with undefined)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U4 )
				.value( [undefined] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array object)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U4 )
				.value( { name: "error" } )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too big value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U4 )
				.value( [4294967296] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too big value via static method)', () => {
    expect( () => {
      DataItem.u4( "test2", [5294967296] );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with negative value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U4 )
				.value( [-178] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with negative value via static method)', () => {
    expect( () => {
      DataItem.u4( "test1", [-199] )
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U4 )
				.value( ["4394967295"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with negative string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U4 )
				.value( ["-198"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should be created with a correct value (array of numbers)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.U4 )
			.size( 123 )
			.name( "pressure" )
			.value( [61232354, 4294967295, 59120] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([61232354, 4294967295, 59120])
		
		item.should.have.property( 'format' ).equal(ItemFormat.U4 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of numbers via static method)', () => {
		const item = DataItem.u4( 'pressure', 1, [3294967295, 4294967295, 59120], "13243" )

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([1, 3294967295, 4294967295, 59120, 13243])
		
		item.should.have.property( 'format' ).equal(ItemFormat.U4 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});


	it('should be created with a correct value (array of strings)', () => {
		const item = DataItem
			.builder
			.name( "pressure" )
			.format(ItemFormat.U4 )
			.value( ["3294967295", '0x232'] )
			.size( 123 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([3294967295, 0x232])
		
		item.should.have.property( 'format' ).equal(ItemFormat.U4 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of zeros)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.U4 )
			.size( 123 )
			.name( "pressure" )
			.value( ["0", '0x0', 0] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([0, 0, 0])
		
		item.should.have.property( 'format' ).equal(ItemFormat.U4 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of zeros via static method)', () => {
		const item = DataItem.u4( "pressure", 0, ["0", '0x0', 0], 0  )

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([0, 0, 0, 0, 0])
		
		item.should.have.property( 'format' ).equal(ItemFormat.U4 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should throw an exception if passing an invalid value (array with null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U4 )
				.value( [1, 8, null] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array with undefined)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U4 )
				.value( [1, undefined,  8] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of invalid objects)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U4 )
				.value( [ 6412, 211, () => {}, { name: "error 1" } ] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big values)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U4 )
				.value( [11234, 5294967295, 412, 453 ] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big values via static method)', () => {
    expect( () => {
      DataItem.u4( 'pressure', 11234, 4394967295, 412, 453 );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of negative values)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U4 )
				.value( [-1, -6, -19240] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of negative values via static method)', () => {
    expect( () => {
      DataItem.u4( "pres", [-1, -6, -19340] );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U4 )
				.value( ["12", "0", "5294967295"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big string value via static method)', () => {
    expect( () => {
      DataItem.u4( "pres", ["12", "0", "6294967295"] )
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of negative string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U4 )
				.value( [ "-4", "-3122"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of negative string value via static method)', () => {
    expect( () => {
      DataItem.u4( "pres", "-4", "-33122" )
    })
    .to.throw( InvalidFormatError );
	});

	it('should be created with correct value via data item static method #1', () => {
		const item = DataItem.numeric( ItemFormat.U4, "humidity", [4294967290] );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 4294967290 );
		item.should.have.property( 'format' ).equal( ItemFormat.U4 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});

	it('should be created with correct value via data item static method #2', () => {
		const item = DataItem.numeric( ItemFormat.U4, "humidity", 4294967290, 56874, "1294967295" );

		item.should.not.have.property( 'size' );
		expect(item.value ).to.have.ordered.members([4294967290, 56874, 1294967295 ])
		item.should.have.property( 'format' ).equal( ItemFormat.U4 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});

	it('should be created with correct value via data item static method #3', () => {
		const item = DataItem.u4( "humidity", [53341, '0xabc'], ["0", "712", "4294967290"], 123, 1294967295, []   );

		item.should.not.have.property( 'size' );
		
		expect(item.value ).to.have.ordered.members([53341, 0xabc, 0, 712, 4294967290, 123, 1294967295 ])
		item.should.have.property( 'format' ).equal( ItemFormat.U4 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});

	it('encode must return valid binary stream (single value)', () => {
		const m = DataItem.u4( "temp", 1294967295 );

    const encodedArray = Encoder.encode(m);
		const expectedArray = Buffer.from([0xB1, 0x04, 0x4D, 0x2F, 0xA1, 0xFF])
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});

	it('encode must return valid binary stream (array)', () => {
		const m = DataItem.u4( "temp", 1294967295, 1221, 4294967291 );

    const encodedArray = Encoder.encode(m);
		const expectedArray = Buffer.from([0xB1, 0x0C, 0x4D, 0x2F, 0xA1, 0xFF, 0x00, 0x00, 0x04, 0xC5, 0xFF, 0xFF, 0xFF, 0xFB ])
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});

	it('should be equal items #1', () => {
		const itemA = DataItem.u4( "temp", 4294967290 );
		const itemB = DataItem.u4( "pressure", 4294967290 );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #2', () => {
		const itemA = DataItem.u4( "temp", 12341, [4294967290, "132"], 12 );
		const itemB = DataItem.u4( "pressure", 12341, "4294967290", [132, 12] );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #3', () => {
		const itemA = DataItem.u4( "temp", [3294967290], );
		const itemB = DataItem.u4( "pressure", "3294967290" );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #4', () => {
		const itemA = DataItem.u4( "temp", [3294967290, 51243412, 0], );
		const itemB = DataItem.u4( "pressure", 3294967290, "51243412", [0] );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should not be equal items #1', () => {
		const itemA = DataItem.u4( "temp", 1212324 );
		const itemB = DataItem.u4( "temp", 1212325 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #2', () => {
		const itemA = DataItem.u4( "temp", 3294967290 );
		const itemB = DataItem.u4( "temp", 3294967291 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #3', () => {
		const itemA = DataItem.u4( "temp", 12 );
		const itemB = DataItem.u4( "temp", 12, 13 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #4', () => {
		const itemA = DataItem.u4( "temp", [12123, 1378, 9214] );
		const itemB = DataItem.u4( "temp", 12, 13 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

});