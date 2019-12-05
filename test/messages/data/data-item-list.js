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

describe('Data Item List', () => {
	it('should be created with correct items', () => {
		const item = DataItem.list( "room",
				DataItem.f4( "temp", 12.1  ),
				DataItem.f8( "hum", 0.137289, 432.32 ),
			 );

		item.should.not.have.property( 'size' );
		
		item.should.have.property( 'format' ).equal( ItemFormat.List );
		item.should.have.property( 'name' ).equal( 'room' );

		expect( item.value ).to.have.length( 2 );  
		item.value[ 0 ].should.have.property( 'format' ).equal( ItemFormat.F4 );  
		item.value[ 1 ].should.have.property( 'value' ).to.have.members( [0.137289, 432.32] );  

		item.value[ 0 ].should.have.property( 'value' ).equal( 12.1 );  
		item.value[ 1 ].should.have.property( 'format' ).equal( ItemFormat.F8 );  
		
	});

	it('should be created with only one correct item', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.List )
			.size( 123 )
			
			.value( 
				DataItem.f4( "temp", 12.1  ),
				DataItem.f8( "hum", 0.137289, 432.32 ),
			)
			.build();

		item.should.not.have.property( 'size' );
		
		item.should.have.property( 'format' ).equal( ItemFormat.List );
		item.should.have.property( 'name' ).equal( '' );

		expect( item.value ).to.have.length( 1 );  
		item.value[ 0 ].should.have.property( 'format' ).equal( ItemFormat.F4 );  
		item.value[ 0 ].should.have.property( 'value' ).equal( 12.1 );  
	});

	it('should be created with correct items (deep list)', () => {
		const item = DataItem.list( "room",
				DataItem.f4( "temp", 12.1  ),
				DataItem.f8( "hum", 0.137289, 432.32 ),

				DataItem.list( "extra-space",
					DataItem.a( "name", "john", 10  ),
					DataItem.a( "surname", "smith", 10  ) )
			 );

		delete item.value;
		item.value = "error";

		item.should.not.have.property( 'size' );
		
		item.should.have.property( 'format' ).equal( ItemFormat.List );
		item.should.have.property( 'name' ).equal( 'room' );

		expect( item.value ).to.have.length( 3 );  
		item.value[ 0 ].should.have.property( 'format' ).equal( ItemFormat.F4 );  
		item.value[ 1 ].should.have.property( 'value' ).to.have.members( [0.137289, 432.32] );  

		item.value[ 0 ].should.have.property( 'value' ).equal( 12.1 );  
		item.value[ 1 ].should.have.property( 'format' ).equal( ItemFormat.F8 );  
		
		const sublist = item.value[ 2 ].value;
		expect( sublist ).to.have.length( 2 );  

		sublist[ 0 ].should.have.property( 'format' ).equal( ItemFormat.A );  
		sublist[ 0 ].should.have.property( 'size' ).equal( 10 );  
		sublist[ 0 ].should.have.property( 'value' ).equal( 'john      ' );  

		sublist[ 1 ].should.have.property( 'format' ).equal( ItemFormat.A );  
		sublist[ 1 ].should.have.property( 'size' ).equal( 10 );  
		sublist[ 1 ].should.have.property( 'value' ).equal( 'smith     ' );  
		
	});

	it('should be created with correct items (empty list)', () => {
		const item = DataItem.list( "room" );
		
		item.should.not.have.property( 'size' );
		
		expect( item.value ).to.have.length( 0 );  
	});

	it('should be equal items #1', () => {
		const itemA = DataItem.list( "temp" );
		const itemB = DataItem.list( "pressure" );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #2', () => {
		const itemA = DataItem.list( "temp",
			DataItem.i2( "a", 121  ) );

		const itemB = DataItem.list( "pressure",
			DataItem.i2( "b", 121  ) );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #3', () => {
		const itemA = DataItem
			.builder
			.format( ItemFormat.List )
			.size( 123 )
			
			.value( 
				DataItem.f4( "temp", 12.1  ),
				DataItem.f8( "hum", 0.137289, 432.32 ),
			)
			.build();


		const itemB = DataItem.list( "pressure",
			DataItem.f4( "temp", 12.1  ));
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #4', () => {
		const itemA = DataItem.list( "temp",
			DataItem.i2( "", 121  ),
			DataItem.i4( "", 121231234  ),
			DataItem.i8( "", -786  ),
			DataItem.list( ""));


		const itemB = DataItem.list( "pressure",
			DataItem.i2( "", 121  ),
			DataItem.i4( "", 121231234  ),
			DataItem.i8( "", -786  ),
			DataItem.list( ""));
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #5', () => {
		const itemA = DataItem.list( "temp",
			DataItem.i2( "", 121  ),
			DataItem.i4( "", 121231234  ),
			DataItem.i8( "", -786  ),
			DataItem.a( "", "very long string", 5  ),
			DataItem.f4( "", 5432.98  ),

			DataItem.list( "",
				DataItem.u8( "", 1897  ),
				DataItem.i1( "", 12  )));


		const itemB = DataItem.list( "pressure",
			DataItem.i2( "", 121  ),
			DataItem.i4( "", 121231234  ),
			DataItem.i8( "", -786  ),
			DataItem.a( "", "very long string", 5  ),
			DataItem.f4( "", 5432.98  ),
			DataItem.list( "",
				DataItem.u8( "", 1897  ),
				DataItem.i1( "", 12  )));
			
		( itemA.equals( itemB ) ).should.be.true;
	});

});