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

describe('Data Item Bool', () => {
	it('should be created with a correct value (number)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.Bool )
			.size( 123 )
			.value( true )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( true );
		item.should.have.property( 'format' ).equal( ItemFormat.Bool );
	});

	it('should be created with a correct value (set value before setting a format)', () => {
		const item = DataItem
			.builder
			.size( 123 )
			.value( false )
			.format( ItemFormat.Bool )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( false );
		item.should.have.property( 'format' ).equal( ItemFormat.Bool );
	});

	it('should be created with a correct value (string)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.Bool )
			.value( "true" )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( true );
		item.should.have.property( 'format' ).equal( ItemFormat.Bool );
	});

	it('should be created with correct value (1)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.Bool )
			.value( 1 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( true );
		item.should.have.property( 'format' ).equal( ItemFormat.Bool );
	});

	it('should be created with a correct value (single element array)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.Bool )
			.value( [ true ] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( true );
		item.should.have.property( 'format' ).equal( ItemFormat.Bool );
	});

	it('should be created with default value', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.Bool )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( false );
		item.should.have.property( 'name' ).equal('');
		item.should.have.property( 'format' ).equal(ItemFormat.Bool );
	});

	it('should be created with a default value via static method', () => {
		const item = DataItem.bool( 'temper' );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( false );
		item.should.have.property( 'name' ).equal('temper');
		item.should.have.property( 'format' ).equal( ItemFormat.Bool );
	});

	it('should not throw an exception if passing an invalid value (null)', () => {
		const item = DataItem
		.builder
		.format( ItemFormat.Bool )
		.value( null )
		.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( false );
		item.should.have.property( 'name' ).equal('');
		item.should.have.property( 'format' ).equal( ItemFormat.Bool );
	});

	// it('should throw an exception if passing an invalid value (object)', () => {
  //   expect( () => {
  //     DataItem
	// 			.builder
	// 			.format(ItemFormat.Bool )
	// 			.value( { name: "error" } )
	// 			.build();
  //   })
  //   .to.throw( InvalidFormatError );
	// });

	// it('should throw an exception if passing invalid value before setting a format', () => {
  //   expect( () => {
  //     DataItem
	// 			.builder
	// 			.value( -1232 )
	// 			.format( ItemFormat.Bool )
	// 			.build();
  //   })
  //   .to.throw( InvalidFormatError );
	// });

	// it('should throw an exception if passing an invalid value (too big value)', () => {
  //   expect( () => {
  //     DataItem
	// 			.builder
	// 			.format(ItemFormat.Bool )
	// 			.value( 300 )
	// 			.build();
  //   })
  //   .to.throw( InvalidFormatError );
	// });

	// it('should throw an exception if passing an invalid value (negative value)', () => {
  //   expect( () => {
  //     DataItem
	// 			.builder
	// 			.format(ItemFormat.Bool )
	// 			.value( -1 )
	// 			.build();
  //   })
  //   .to.throw( InvalidFormatError );
	// });

	// it('should throw an exception if passing an invalid value (too big string value)', () => {
  //   expect( () => {
  //     DataItem
	// 			.builder
	// 			.format(ItemFormat.Bool )
	// 			.value( "1232" )
	// 			.build();
  //   })
  //   .to.throw( InvalidFormatError );
	// });

	// it('should throw an exception if passing an invalid value (negative string value)', () => {
  //   expect( () => {
  //     DataItem
	// 			.builder
	// 			.format(ItemFormat.Bool )
	// 			.value( "-290" )
	// 			.build();
  //   })
  //   .to.throw( InvalidFormatError );
	// });

	it('should be created with a correct value (single value bool array)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.Bool )
			.size( 223 )
			.value( [true] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( true );
		item.should.have.property( 'format' ).equal(ItemFormat.Bool );
	});

	
	it('should be created with a correct value (single value bool array via static method )', () => {
		const item = DataItem.bool( "pressure", [false] );
		
		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( false );
		item.should.have.property( 'name' ).equal( "pressure" );
		item.should.have.property( 'format' ).equal(ItemFormat.Bool );
	});

	it('should be created with a correct value (single value string array)', () => {
		const arr = new Array();
		arr.push( "true" )

		const item = DataItem
			.builder
			.format( ItemFormat.Bool )
			.value( arr )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( true );
		item.should.have.property( 'format' ).equal( ItemFormat.Bool );
	});

	it('should be created with a correct value (single value string array via static method)', () => {
		const arr = new Array();
		arr.push( "137" )

		const item = DataItem.bool( "temp", arr );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( true );
		item.should.have.property( 'name' ).equal( "temp" );
		item.should.have.property( 'format' ).equal(ItemFormat.Bool );
	});

	it('should be created with a correct value (single value bool array with 0)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.Bool )
			.value( [0] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( false );
		item.should.have.property( 'format' ).equal(ItemFormat.Bool );
	});

	it('should be created with a correct value (single value bool array with 0 via static method)', () => {
		const item = DataItem.bool( "test1", [0] );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( false );
		item.should.have.property( 'name' ).equal( "test1" );
		item.should.have.property( 'format' ).equal(ItemFormat.Bool );
	});

	// it('should throw an exception if passing an invalid value (single value array with null)', () => {
  //   expect( () => {
  //     DataItem
	// 			.builder
	// 			.format(ItemFormat.Bool )
	// 			.value( [null] )
	// 			.build();
  //   })
  //   .to.throw( InvalidFormatError );
	// });

	// it('should throw an exception if passing an invalid value (single value array with undefined)', () => {
  //   expect( () => {
  //     DataItem
	// 			.builder
	// 			.format(ItemFormat.Bool )
	// 			.value( [undefined] )
	// 			.build();
  //   })
  //   .to.throw( InvalidFormatError );
	// });

	// it('should throw an exception if passing an invalid value (single value array object)', () => {
  //   expect( () => {
  //     DataItem
	// 			.builder
	// 			.format(ItemFormat.Bool )
	// 			.value( { name: "error" } )
	// 			.build();
  //   })
  //   .to.throw( InvalidFormatError );
	// });

	// it('should throw an exception if passing an invalid value (single value array with too big value)', () => {
  //   expect( () => {
  //     DataItem
	// 			.builder
	// 			.format(ItemFormat.Bool )
	// 			.value( [300] )
	// 			.build();
  //   })
  //   .to.throw( InvalidFormatError );
	// });

	// it('should throw an exception if passing an invalid value (single value array with too big value via static method)', () => {
  //   expect( () => {
  //     DataItem.i1( "test2", [270] );
  //   })
  //   .to.throw( InvalidFormatError );
	// });

	// it('should throw an exception if passing invalid value (single value array with negative value)', () => {
  //   expect( () => {
  //     DataItem
	// 			.builder
	// 			.format(ItemFormat.Bool )
	// 			.value( [-19] )
	// 			.build();
  //   })
  //   .to.throw( InvalidFormatError );
	// });

	// it('should throw an exception if passing an invalid value (single value array with negative value via static method)', () => {
  //   expect( () => {
  //     DataItem.bool( "test1", [-19] )
  //   })
  //   .to.throw( InvalidFormatError );
	// });

	// it('should throw an exception if passing an invalid value (single value array with too big string value)', () => {
  //   expect( () => {
  //     DataItem
	// 			.builder
	// 			.format(ItemFormat.Bool )
	// 			.value( ["432"] )
	// 			.build();
  //   })
  //   .to.throw( InvalidFormatError );
	// });

	// it('should throw an exception if passing an invalid value (single value array with negative string value)', () => {
  //   expect( () => {
  //     DataItem
	// 			.builder
	// 			.format(ItemFormat.Bool )
	// 			.value( ["-1"] )
	// 			.build();
  //   })
  //   .to.throw( InvalidFormatError );
	// });

	it('should be created with a correct value (array of numbers)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.Bool )
			.size( 123 )
			.value( [true, false, true] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([true, false, true])
		
		item.should.have.property( 'format' ).equal(ItemFormat.Bool );
	});

	it('should be created with a correct value (array of numbers via static method)', () => {
		const item = DataItem.bool( 'pressure', 1, [true, false, false], "13" )

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([true, true, false, false, true])
		
		item.should.have.property( 'format' ).equal(ItemFormat.Bool );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of strings)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.Bool )
			.size( 123 )
			.value( ["78", '0x23', "223"] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([true, true, true])
		
		item.should.have.property( 'format' ).equal(ItemFormat.Bool );
	});

	it('should be created with a correct value (array of zeros)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.Bool )
			.size( 123 )
			.value( [ 0, 0, 0] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([false, false, false])
		
		item.should.have.property( 'format' ).equal(ItemFormat.Bool );
	});

	it('should be created with a correct value (array of zeros via static method)', () => {
		const item = DataItem.bool( "pressure", 0, [ 0, 0, 0], 0  )

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([false, false, false, false, false])
		
		item.should.have.property( 'format' ).equal(ItemFormat.Bool );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	// it('should throw an exception if passing invalid value (array with null)', () => {
  //   expect( () => {
  //     DataItem
	// 			.builder
	// 			.format(ItemFormat.Bool )
	// 			.value( [1, 8, null] )
	// 			.build();
  //   })
  //   .to.throw( InvalidFormatError );
	// });

	// it('should throw an exception if passing invalid value (array with undefined)', () => {
  //   expect( () => {
  //     DataItem
	// 			.builder
	// 			.format(ItemFormat.Bool )
	// 			.value( [1, undefined,  8] )
	// 			.build();
  //   })
  //   .to.throw( InvalidFormatError );
	// });

	// it('should throw an exception if passing an invalid value (array of invalid objects)', () => {
  //   expect( () => {
  //     DataItem
	// 			.builder
	// 			.format(ItemFormat.Bool )
	// 			.value( [ 64, 21, () => {}, { name: "error" } ] )
	// 			.build();
  //   })
  //   .to.throw( InvalidFormatError );
	// });

	// it('should throw an exception if passing an invalid value (array of too big values)', () => {
  //   expect( () => {
  //     DataItem
	// 			.builder
	// 			.format(ItemFormat.Bool )
	// 			.value( [1, 3, -4, 453 ] )
	// 			.build();
  //   })
  //   .to.throw( InvalidFormatError );
	// });

	// it('should throw an exception if passing an invalid value (array of negative values)', () => {
  //   expect( () => {
  //     DataItem
	// 			.builder
	// 			.format(ItemFormat.Bool )
	// 			.value( [-1, -6, -1] )
	// 			.build();
  //   })
  //   .to.throw( InvalidFormatError );
	// });

	// it('should throw an exception if passing an invalid value (array of too big string value)', () => {
  //   expect( () => {
  //     DataItem
	// 			.builder
	// 			.format(ItemFormat.Bool )
	// 			.value( ["12", "0", "300"] )
	// 			.build();
  //   })
  //   .to.throw( InvalidFormatError );
	// });

	// it('should throw an exception if passing an invalid value (array of negative string values)', () => {
  //   expect( () => {
  //     DataItem
	// 			.builder
	// 			.format(ItemFormat.Bool )
	// 			.value( [ "-4", "-19"] )
	// 			.build();
  //   })
  //   .to.throw( InvalidFormatError );
	// });

	// it('should be created with correct value via data item static method #1', () => {
	// 	const item = DataItem.numeric( ItemFormat.Bool, "humidity", [223] );

	// 	item.should.not.have.property( 'size' );
	// 	item.should.have.property( 'value' ).equal( 223 );
	// 	item.should.have.property( 'format' ).equal( ItemFormat.Bool );
	// 	item.should.have.property( 'name' ).equal( "humidity" );
	// });

	// it('should be created with correct value via data item static method #2', () => {
	// 	const item = DataItem.numeric( ItemFormat.Bool, "humidity", 223, 6, "17" );

	// 	item.should.not.have.property( 'size' );
	// 	expect(item.value ).to.have.ordered.members([223, 6, 17 ])
	// 	item.should.have.property( 'format' ).equal( ItemFormat.Bool );
	// 	item.should.have.property( 'name' ).equal( "humidity" );
	// });

	// it('should be created with correct value via data item static method #3', () => {
	// 	const item = DataItem.bool( "humidity", 34, ["0", "7", "222"], 123, 1  );

	// 	item.should.not.have.property( 'size' );
		
	// 	expect(item.value ).to.have.ordered.members([34, 0, 7, 222, 123, 1 ])
	// 	item.should.have.property( 'format' ).equal( ItemFormat.Bool );
	// 	item.should.have.property( 'name' ).equal( "humidity" );
	// });

	// //
	
	it('encode must return valid binary stream (single value)', () => {
		const m = DataItem.bool( "temp", true );

    const encodedArray = Encoder.encode(m);
		const expectedArray = Buffer.from([0x25, 0x01, 0x01 ])

		// console.log( encodedArray );
		// console.log( expectedArray );
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});

	it('encode must return valid binary stream (array)', () => {
		const m = DataItem.bool( "temp", false, true, false, true, true );

    const encodedArray = Encoder.encode(m);
		const expectedArray = Buffer.from([0x25, 0x05, 0x00, 0x01,  0x00, 0x01, 0x01 ])
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
  });

	it('should be equal items #1', () => {
		const itemA = DataItem.bool( "temp", true );
		const itemB = DataItem.bool( "pressure", true );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #2', () => {
		const itemA = DataItem.bool( "temp", true, [false, true], 12 );
		const itemB = DataItem.bool( "pressure", true, false, [true, true] );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #3', () => {
		const itemA = DataItem.bool( "temp", [false], );
		const itemB = DataItem.bool( "pressure", false );
			
		( itemA.equals( itemB ) ).should.be.true;
	});



	it('should not be equal items #1', () => {
		const itemA = DataItem.i1( "temp", 122 );
		const itemB = DataItem.bool( "temp", 122 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #2', () => {
		const itemA = DataItem.bool( "temp", false );
		const itemB = DataItem.bool( "temp", true );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #2', () => {
		const itemA = DataItem.bool( "temp", true );
		const itemB = DataItem.bool( "temp", true, false );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #4', () => {
		const itemA = DataItem.bool( "temp", [true, false, true] );
		const itemB = DataItem.bool( "temp", true, true );
			
		( itemA.equals( itemB ) ).should.be.false;
	});


	//
});