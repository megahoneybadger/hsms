var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

const { DataItem, Constants } = require( '../../../src/hsms' )

describe('Data Item', () => {
  it('should throw an exception if creating without a builder #1', () => {
    expect( () => {
      const m = new DataItem( 1 );
    })
    .to.throw( TypeError, Constants.CANNOT_CONSTRUCT_WITHOUT_BUILDER );
	});

	it('should throw an exception if creating without a builder #2', () => {
    expect( () => {
      const m = new DataItem();
    })
    .to.throw( TypeError, Constants.CANNOT_CONSTRUCT_WITHOUT_BUILDER );
	});
	
	it('should throw an exception if passing too many params', () => {
    expect( () => {
      const m = new DataItem( DataItem.builder, 1, "error" );
    })
    .to.throw( TypeError, Constants.TOO_MANY_CONSTRUCT_PARAMS );
	});
	
	it('should be created with non-empty name', () => {
		const item = DataItem
			.builder
			.name( "john" )
			.build();

    item.should.have.property( 'name' ).equal( "john" );
    
	});
	
	it('should be created with non-empty name even if a name was not provided', () => {
		const item = DataItem
			.builder
			.build();

    item.should.have.property( 'name' ).equal( "" );
	});
	
	it('should return builder non-empty name with getter', () => {
		const builder = DataItem.builder;

		builder.name( "john" );

    builder.name().should.equal( "john" );
	});
	
	it('should return builder empty name with getter', () => {
		const builder = DataItem.builder;

    builder.name().should.equal( "" );
	});
	
	it('should throw an exception if passing non-string name', () => {
    expect( () => {
      DataItem
				.builder
				.name( 123 )
				.build();
    })
    .to.throw( TypeError, Constants.getErrMustBeString( 'name' ) );
	});

  
});