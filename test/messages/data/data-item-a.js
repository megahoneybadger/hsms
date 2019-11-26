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

describe('Data Item A', () => {
	
	it('should be created with a correct value', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.A )
			.size( 10 )
			.value( "john" )
			.build();

		item.should.have.property( 'size' ).equal( 10 );
		item.should.have.property( 'value' ).equal( "john      " );
		item.should.have.property( 'format' ).equal( ItemFormat.A );
	});

	it('should be created with a correct value via shortcut', () => {
		const item = DataItem.a( '', "john", 10 );
			
		item.should.have.property( 'size' ).equal( 10 );
		item.should.have.property( 'value' ).equal( "john      " );
		item.should.have.property( 'format' ).equal( ItemFormat.A );
	});

	it('should be created with a correct value (set as number)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.A )
			.size( 10 )
			.value( 123 )
			.build();

		item.should.have.property( 'name' ).equal( '' );
		item.should.have.property( 'size' ).equal( 10 );
		item.should.have.property( 'value' ).equal( "123       " );
		item.should.have.property( 'format' ).equal( ItemFormat.A );
	});

	it('should be created with a correct value via shortcut (set as number)', () => {
		const item = DataItem.a( 'age', "123", 10 );
		
		item.should.have.property( 'name' ).equal( 'age' );
		item.should.have.property( 'size' ).equal( 10 );
		item.should.have.property( 'value' ).equal( "123       " );
		item.should.have.property( 'format' ).equal( ItemFormat.A );
	});

	it('should be created with a correct value (set as zero)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.A )
			.size( 10 )
			.value( 0 )
			.build();

		item.should.have.property( 'size' ).equal( 10 );
		item.should.have.property( 'value' ).equal( "          " );
		item.should.have.property( 'format' ).equal( ItemFormat.A );
	});

	it('should be created with a correct value (cut long string)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.A )
			.size( 5 )
			.value( "This is a very long message" )
			.build();

		item.should.have.property( 'size' ).equal( 5 );
		item.should.have.property( 'value' ).equal( "This " );
		item.should.have.property( 'format' ).equal( ItemFormat.A );
	});

	it('should be created with a correct value (empty input string)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.A )
			.size( 5 )
			//.value( "This is a very long message" )
			.build();

		item.should.have.property( 'size' ).equal( 5 );
		item.should.have.property( 'value' ).equal( "     " );
		item.should.have.property( 'format' ).equal( ItemFormat.A );
	});

	it('should be created with a correct value (empty input string and zero size)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.A )
			//.size( 5 )
			//.value( "This is a very long message" )
			.build();

		item.should.have.property( 'size' ).equal( 0 );
		item.should.have.property( 'value' ).equal( '' );
		item.should.have.property( 'format' ).equal( ItemFormat.A );
	});

	it('should be created with a correct value (non-empty input string and zero size)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.A )
			//.size( 5 )
			.value( "This is a very long message" )
			.build();

		item.should.have.property( 'size' ).equal( 0 );
		item.should.have.property( 'value' ).equal( '' );
		item.should.have.property( 'format' ).equal( ItemFormat.A );
	});

	it('should be created with a correct value (empty input string and zero size via shortcut)', () => {
		const item = DataItem.a( "proc", null );

		item.should.have.property( 'size' ).equal( 0 );
		item.should.have.property( 'value' ).equal( '' );
		item.should.have.property( 'format' ).equal( ItemFormat.A );
	});

	it('should be created with a correct value (mix setting size&value order) #1', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.A )
			.value( "This is a very long message" )
			.size( 3 )
			.build();

		item.should.have.property( 'size' ).equal( 3 );
		item.should.have.property( 'value' ).equal( "   " );
		item.should.have.property( 'format' ).equal( ItemFormat.A );
	});

	it('should be created with a correct value (mix setting size&value order) #2', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.A )
			.value( "This is a very long message" )
			.size( 3 )
			.value( "Set again" )
			.build();

		item.should.have.property( 'size' ).equal( 3 );
		item.should.have.property( 'value' ).equal( "Set" );
		item.should.have.property( 'format' ).equal( ItemFormat.A );
	});

	it('should be created with a correct value (mix setting size&value order) #2', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.A )
			.value( "This is a very long message" )
			.size( 3 )
			.value( "Set again" )
			.size( 5 )
			.build();

		item.should.have.property( 'size' ).equal( 5 );
		item.should.have.property( 'value' ).equal( "Set  " );
		item.should.have.property( 'format' ).equal( ItemFormat.A );
	});

	it('should be created with a correct value (single element array)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.A )
			.size( 5 )
			.value( [ "test" ] )
			.build();

		item.should.have.property( 'size' ).equal( 5 );
		item.should.have.property( 'value' ).equal( "test " );
		item.should.have.property( 'format' ).equal( ItemFormat.A );
	});

	it('should be created with a correct value (multiple elements array)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.A )
			.size( 5 )
			.value( [ "test", 11, () => 8 ] )
			.build();

		item.should.have.property( 'size' ).equal( 5 );
		item.should.have.property( 'value' ).equal( "test " );
		item.should.have.property( 'format' ).equal( ItemFormat.A );
	});

	it('should be created with a correct value (single element array via static method)', () => {
		const item = DataItem.a( "", [ "test" ], 5 )

		item.should.have.property( 'name' ).equal( '' );
		item.should.have.property( 'size' ).equal( 5 );
		item.should.have.property( 'value' ).equal( "test " );
		item.should.have.property( 'format' ).equal( ItemFormat.A );
	});

	it('should be created with a correct value (multiple elements array via static method)', () => {
		const item = DataItem.a( "temp", [ "test", "ad" ], 3  )

		item.should.have.property( 'name' ).equal( 'temp' );
		item.should.have.property( 'size' ).equal( 3 );
		item.should.have.property( 'value' ).equal( "tes" );
		item.should.have.property( 'format' ).equal( ItemFormat.A );
	});

	it('should throw an exception if passing an invalid value (object)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.A )
				.size( 12 )
				.value( { name: "error" } )
				.build();
    })
		.to.throw( InvalidFormatError );
	});

	
	it('should throw an exception if passing an invalid value (single value array with undefined)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.A )
				.size( 5 )
				.value( [undefined] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing invalid value before setting a format', () => {
    expect( () => {
      DataItem
				.builder
				.value( "long string" )
				.format( ItemFormat.A )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('encode must return valid binary stream #1', () => {
		const m = DataItem.a( "temp", "hello world !", 10 );

    const encodedArray = Encoder.encode(m);
		const expectedArray = Buffer.from([0x41, 0x0A, 0x68, 0x65, 0x6C, 0x6C, 0x6F, 0x20, 0x77, 0x6F, 0x72, 0x6C  ])
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});

	it('encode must return valid binary stream #2', () => {
		const m = DataItem.a( "temp", "", 5 );

    const encodedArray = Encoder.encode(m);
		const expectedArray = Buffer.from([0x41, 0x05, 0x20, 0x20, 0x20, 0x20, 0x20  ])
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});


	it('encode must return valid binary stream #3', () => {
		const m = DataItem.a( "temp", "start", 15 );

    const encodedArray = Encoder.encode(m);
		const expectedArray = Buffer.from([0x41, 0x0F, 0x73, 0x74, 0x61, 0x72, 0x74,
			 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20 ])
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});




});