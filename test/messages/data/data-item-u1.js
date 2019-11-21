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

describe('Data Item U1', () => {
	it('should be created with a correct value (number)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.U1 )
			.size( 123 )
			.value( 217 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 217 );
		item.should.have.property( 'format' ).equal( ItemFormat.U1 );
	});

	it('should be created with a correct value (set value before setting a format)', () => {
		const item = DataItem
			.builder
			.size( 123 )
			.value( 172 )
			.format( ItemFormat.U1 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 172 );
		item.should.have.property( 'format' ).equal( ItemFormat.U1 );
	});

	it('should be created with a correct value (string)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.U1 )
			.value( "217" )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 217 );
		item.should.have.property( 'format' ).equal( ItemFormat.U1 );
	});

	it('should be created with correct value (0)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.U1 )
			.value( 0 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'format' ).equal( ItemFormat.U1 );
	});

	it('should be created with a correct value (single element array)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.U1 )
			.value( [ "212" ] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 212 );
		item.should.have.property( 'format' ).equal( ItemFormat.U1 );
	});

	it('should be created with default value', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.U1 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal('');
		item.should.have.property( 'format' ).equal(ItemFormat.U1 );
	});

	it('should be created with a default value via static method', () => {
		const item = DataItem.u1( 'temper' );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal('temper');
		item.should.have.property( 'format' ).equal( ItemFormat.U1 );
	});

	it('should throw an exception if passing an invalid value (null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U1 )
				.value( null )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (object)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U1 )
				.value( { name: "error" } )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing invalid value before setting a format', () => {
    expect( () => {
      DataItem
				.builder
				.value( -1232 )
				.format( ItemFormat.U1 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (too big value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U1 )
				.value( 300 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (negative value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U1 )
				.value( -1 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U1 )
				.value( "1232" )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (negative string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U1 )
				.value( "-290" )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should be created with a correct value (single value number array)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.U1 )
			.size( 223 )
			.value( [217] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 217 );
		item.should.have.property( 'format' ).equal(ItemFormat.U1 );
	});

	
	it('should be created with a correct value (single value number array via static method )', () => {
		const item = DataItem.u1( "pressure", [177] );
		
		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 177 );
		item.should.have.property( 'name' ).equal( "pressure" );
		item.should.have.property( 'format' ).equal(ItemFormat.U1 );
	});

	it('should be created with a correct value (single value string array)', () => {
		const arr = new Array();
		arr.push( "163" )

		const item = DataItem
			.builder
			.format(ItemFormat.U1 )
			.value( arr )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 163 );
		item.should.have.property( 'format' ).equal(ItemFormat.U1 );
	});

	it('should be created with a correct value (single value string array via static method)', () => {
		const arr = new Array();
		arr.push( "137" )

		const item = DataItem.u1( "temp", arr );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 137 );
		item.should.have.property( 'name' ).equal( "temp" );
		item.should.have.property( 'format' ).equal(ItemFormat.U1 );
	});

	it('should be created with a correct value (single value number array with 0)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.U1 )
			.value( [0] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'format' ).equal(ItemFormat.U1 );
	});

	it('should be created with a correct value (single value number array with 0 via static method)', () => {
		const item = DataItem.u1( "test1", [0] );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal( "test1" );
		item.should.have.property( 'format' ).equal(ItemFormat.U1 );
	});

	it('should throw an exception if passing an invalid value (single value array with null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U1 )
				.value( [null] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with undefined)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U1 )
				.value( [undefined] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array object)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U1 )
				.value( { name: "error" } )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too big value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U1 )
				.value( [300] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too big value via static method)', () => {
    expect( () => {
      DataItem.i1( "test2", [270] );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing invalid value (single value array with negative value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U1 )
				.value( [-19] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with negative value via static method)', () => {
    expect( () => {
      DataItem.u1( "test1", [-19] )
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U1 )
				.value( ["432"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with negative string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U1 )
				.value( ["-1"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should be created with a correct value (array of numbers)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.U1 )
			.size( 123 )
			.value( [223, 218, 190] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([223, 218, 190])
		
		item.should.have.property( 'format' ).equal(ItemFormat.U1 );
	});

	it('should be created with a correct value (array of numbers via static method)', () => {
		const item = DataItem.u1( 'pressure', 1, [223, 218, 191], "13" )

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([1, 223, 218, 191, 13])
		
		item.should.have.property( 'format' ).equal(ItemFormat.U1 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of strings)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.U1 )
			.size( 123 )
			.value( ["78", '0x23', "223"] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([78, 0x23, 223])
		
		item.should.have.property( 'format' ).equal(ItemFormat.U1 );
	});

	it('should be created with a correct value (array of zeros)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.U1 )
			.size( 123 )
			.value( ["0", '0x0', 0] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([0, 0, 0])
		
		item.should.have.property( 'format' ).equal(ItemFormat.U1 );
	});

	it('should be created with a correct value (array of zeros via static method)', () => {
		const item = DataItem.u1( "pressure", 0, ["0", '0x0', 0], 0  )

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([0, 0, 0, 0, 0])
		
		item.should.have.property( 'format' ).equal(ItemFormat.U1 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should throw an exception if passing invalid value (array with null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U1 )
				.value( [1, 8, null] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing invalid value (array with undefined)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U1 )
				.value( [1, undefined,  8] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of invalid objects)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U1 )
				.value( [ 64, 21, () => {}, { name: "error" } ] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big values)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U1 )
				.value( [1, 3, -4, 453 ] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of negative values)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U1 )
				.value( [-1, -6, -1] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U1 )
				.value( ["12", "0", "300"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of negative string values)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U1 )
				.value( [ "-4", "-19"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should be created with correct value via data item static method #1', () => {
		const item = DataItem.numeric( ItemFormat.U1, "humidity", [223] );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 223 );
		item.should.have.property( 'format' ).equal( ItemFormat.U1 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});

	it('should be created with correct value via data item static method #2', () => {
		const item = DataItem.numeric( ItemFormat.U1, "humidity", 223, 6, "17" );

		item.should.not.have.property( 'size' );
		expect(item.value ).to.have.ordered.members([223, 6, 17 ])
		item.should.have.property( 'format' ).equal( ItemFormat.U1 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});

	it('should be created with correct value via data item static method #3', () => {
		const item = DataItem.u1( "humidity", 34, ["0", "7", "222"], 123, 1  );

		item.should.not.have.property( 'size' );
		
		expect(item.value ).to.have.ordered.members([34, 0, 7, 222, 123, 1 ])
		item.should.have.property( 'format' ).equal( ItemFormat.U1 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});

	//
	
	it('encode must return valid binary stream (single value)', () => {
		const m = DataItem.u1( "temp", 212 );

    const encodedArray = Encoder.encode(m);
		const expectedArray = Buffer.from([0xA5, 0x01, 0xD4 ])

		// console.log( encodedArray );
		// console.log( expectedArray );
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});

	it('encode must return valid binary stream (array)', () => {
		const m = DataItem.u1( "temp",124, 8, 221, 7, "11", 0 );

    const encodedArray = Encoder.encode(m);
		const expectedArray = Buffer.from([0xA5, 0x06, 0x7C, 0x08, 0xDD, 0x07, 0x0B, 0x00 ])

		// console.log( encodedArray );
		// console.log( expectedArray );
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
  });

	it('should be equal items #1', () => {
		const itemA = DataItem.u1( "temp", 212 );
		const itemB = DataItem.u1( "pressure", 212 );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #2', () => {
		const itemA = DataItem.u1( "temp", 121, [145, "123"], 12, [12, 78, 90] );
		const itemB = DataItem.u1( "pressure", 121, "145", [123, 12], 12, [78], "90" );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #3', () => {
		const itemA = DataItem.u1( "temp", [128], );
		const itemB = DataItem.u1( "pressure", "128" );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #4', () => {
		const itemA = DataItem.u1( "temp", [11, 12, 0], );
		const itemB = DataItem.u1( "pressure", 11, "12", [0] );
			
		( itemA.equals( itemB ) ).should.be.true;
	});


	it('should not be equal items #1', () => {
		const itemA = DataItem.i1( "temp", 122 );
		const itemB = DataItem.u1( "temp", 122 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #2', () => {
		const itemA = DataItem.u1( "temp", 13 );
		const itemB = DataItem.u1( "temp", 12 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #2', () => {
		const itemA = DataItem.u1( "temp", 12 );
		const itemB = DataItem.u1( "temp", 12, 13 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #4', () => {
		const itemA = DataItem.u1( "temp", [12, 13, 14] );
		const itemB = DataItem.u1( "temp", 12, 13 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});


	//
});