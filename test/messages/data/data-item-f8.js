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

describe('Data Item F8', () => {
	it('should be created with a correct value (number)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.F8 )
			.size( 123 )
			.value( 7.4523 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 7.4523 );
		item.should.have.property( 'format' ).equal( ItemFormat.F8 );
	});
	
	it('should be created with a correct value (neg number)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.F8 )
			.size( 123 )
			.value( -72.6543 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( -72.6543 );
		item.should.have.property( 'format' ).equal( ItemFormat.F8 );
	});

	it('should be created with correct value (0)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.F8 )
			.value( 0 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'format' ).equal( ItemFormat.F8 );
	});

	it('should be created with a correct value (single element array)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.F8 )
			.value( [ "-12.1" ] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( -12.1 );
		item.should.have.property( 'format' ).equal( ItemFormat.F8 );
	});

	it('should be created with default value', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.F8 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal('');
		item.should.have.property( 'format' ).equal(ItemFormat.F8 );
	});

	it('should be created with a default value via static method', () => {
		const item = DataItem.f8( 'temper' );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal('temper');
		item.should.have.property( 'format' ).equal(ItemFormat.F8 );
	});

	it('should throw an exception if passing an invalid value (null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.F8 )
				.value( null )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (object)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.F8 )
				.value( { name: "error" } )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should convert if passing invalid value before setting a format', () => {
    expect( () => {
      DataItem
				.builder
				.value( 1232543.432 )
				.format( ItemFormat.F8 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should be created with a correct value (single value number array)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.F8 )
			.size( 123 )
			.value( [17.543] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 17.543 );
		item.should.have.property( 'format' ).equal(ItemFormat.F8 );
	});

	it('should be created with a correct value (single value number array via static method )', () => {
		const item = DataItem.f8( "pressure", [17.5] );
			

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 17.5 );
		item.should.have.property( 'name' ).equal( "pressure" );
		item.should.have.property( 'format' ).equal(ItemFormat.F8 );
	});

	it('should be created with a correct value (single value string array)', () => {
		const arr = new Array();
		arr.push( "13.654" )

		const item = DataItem
			.builder
			.format(ItemFormat.F8 )
			.value( arr )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 13.654 );
		item.should.have.property( 'format' ).equal(ItemFormat.F8 );
	});

	it('should be created with a correct value (single value string array via static method)', () => {
		const arr = new Array();
		arr.push( "13.54321" )

		const item = DataItem.f8( "temp", arr );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 13.54321 );
		item.should.have.property( 'name' ).equal( "temp" );
		item.should.have.property( 'format' ).equal(ItemFormat.F8 );
	});

	it('should be created with a correct value (single value number array with 0)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.F8 )
			.value( [0] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'format' ).equal(ItemFormat.F8 );
	});

	it('should be created with a correct value (single value number array with 0 via static method)', () => {
		const item = DataItem.f8( "test1", [0] );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal( "test1" );
		item.should.have.property( 'format' ).equal(ItemFormat.F8 );
	});

	it('should throw an exception if passing an invalid value (single value array with null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.F8 )
				.value( [null] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with undefined)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.F8 )
				.value( [undefined] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array object)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.F8 )
				.value( { name: "error" } )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should be created with a correct value (array of numbers)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.F8 )
			.size( 123 )
			.value( [123.543, 18.786, 90.12] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([123.543, 18.786, 90.12])
		
		item.should.have.property( 'format' ).equal(ItemFormat.F8 );
	});

	it('should be created with a correct value (array of numbers via static method)', () => {
		const item = DataItem.f8( 'pressure', 1.1, [123.09123, 18.4, 91], "13.0" )

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([1.1, 123.09123, 18.4, 91, 13])
		
		item.should.have.property( 'format' ).equal(ItemFormat.F8 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of strings)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.F8 )
			.size( 123 )
			.value( ["78.1", '0', "-12.3"] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([78.1, 0, -12.3])
		
		item.should.have.property( 'format' ).equal(ItemFormat.F8 );
	});

	it('should be created with a correct value (array of zeros)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.F8 )
			.size( 123 )
			.value( ["0", '0x0', 0] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([0, 0, 0])
		
		item.should.have.property( 'format' ).equal(ItemFormat.F8 );
	});

	it('should be created with a correct value (array of zeros via static method)', () => {
		const item = DataItem.f8( "pressure", 0, ["0", '0x0', 0], 0  )

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([0, 0, 0, 0, 0])
		
		item.should.have.property( 'format' ).equal(ItemFormat.F8 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should throw an exception if passing invalid value (array with null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.F8 )
				.value( [1, 8.4, null] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing invalid value (array with undefined)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.F8 )
				.value( [1, undefined,  8.1] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of invalid objects)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.F8 )
				.value( [ 64, 21, () => {}, { name: "error" } ] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	
	it('should be created with correct value via data item static method #1', () => {
		const item = DataItem.numeric( ItemFormat.F8, "humidity", [123.543] );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 123.543 );
		item.should.have.property( 'format' ).equal( ItemFormat.F8 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});

	it('should be created with correct value via data item static method #2', () => {
		const item = DataItem.numeric( ItemFormat.F8, "humidity", 123.1, -6.005, "7" );

		item.should.not.have.property( 'size' );
		expect(item.value ).to.have.ordered.members([123.1, -6.005, 7 ])
		item.should.have.property( 'format' ).equal( ItemFormat.F8 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});

	it('should be created with correct value via data item static method #3', () => {
		const item = DataItem.f8( "humidity", 34, ["0.001", "7.876", "-12"], 123.0008, 1  );

		item.should.not.have.property( 'size' );
		
		expect(item.value ).to.have.ordered.members([34, 0.001, 7.876, -12, 123.0008, 1 ])
		item.should.have.property( 'format' ).equal( ItemFormat.F8 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});


	it('encode must return valid binary stream (single value)', () => {
		const m = DataItem.f8( "temp", -7891723.56773819);

    const encodedArray = Encoder.encode(m);
		const expectedArray = Buffer.from([0x81, 0x08, 0xC1, 0x5E, 0x1A, 0xC2, 0xE4, 0x55, 0xD2, 0x90 ])
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});

	it('encode must return valid binary stream (array)', () => {
		const m = DataItem.f8( "temp", 81237.0987, 1122.345, -90854.56781 );

    const encodedArray = Encoder.encode(m);
		const expectedArray = Buffer.from([
			0x81, 0x18, 0x40, 0xF3, 0xD5, 0x51, 0x94, 0x46, 0x73, 0x82, 0x40,
			0x91, 0x89, 0x61, 0x47, 0xAE, 0x14, 0x7B, 0xC0, 0xF6, 
			0x2E, 0x69, 0x15, 0xBF, 0xF0, 0x45 ])
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});
	
	it('should be equal items #1', () => {
		const itemA = DataItem.f8( "temp", -12.543 );
		const itemB = DataItem.f8( "pressure", -12.543 );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #2', () => {
		const itemA = DataItem.f8( "temp", 12.531, [45.0001, "-13"], 12.098345 );
		const itemB = DataItem.f8( "pressure", 12.531, "45.0001", [-13, 12.098345] );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #3', () => {
		const itemA = DataItem.f8( "temp", [12.543], );
		const itemB = DataItem.f8( "pressure", "12.543" );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #4', () => {
		const itemA = DataItem.f8( "temp", [11.2, -12.987, 0.00001], );
		const itemB = DataItem.f8( "pressure", 11.2, "-12.987", [0.00001] );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should not be equal items #1', () => {
		const itemA = DataItem.f8( "temp", 12 );
		const itemB = DataItem.u2( "temp", 12 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});


	it('should not be equal items #2', () => {
		const itemA = DataItem.f8( "temp", 12.1 );
		const itemB = DataItem.f8( "temp", -12.0 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #3', () => {
		const itemA = DataItem.f8( "temp", 12.1 );
		const itemB = DataItem.f8( "temp", 12.1, 13 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #4', () => {
		const itemA = DataItem.f8( "temp", [121.5, 13, 14] );
		const itemB = DataItem.f8( "temp", 121.5, 13 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

});