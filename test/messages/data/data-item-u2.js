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

describe('Data Item U2', () => {
	it('should be created with a correct value (number)', () => {
		const item = DataItem
			.builder
			.size( 123 )
			.format( ItemFormat.U2 )
			.value( 65000 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 65000 );
		item.should.have.property( 'format' ).equal( ItemFormat.U2 );
	});

	it('should be created with a correct value (set value before setting a format)', () => {
		const item = DataItem
			.builder
			.size( 1233 )
			.value( 5600 )
			.format( ItemFormat.U2 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 5600 );
		item.should.have.property( 'format' ).equal( ItemFormat.U2 );
	});

	it('should be created with a correct value (0)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.U2 )
			.value( 0 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'format' ).equal( ItemFormat.U2 );
	});

	it('should be created with correct value (0 as string)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.U2 )
			.value( "0" )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'format' ).equal( ItemFormat.U2 );
	});

	it('should be created with a correct value (single element array)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.U2 )
			.value( [ "12384" ] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 12384 );
		item.should.have.property( 'format' ).equal( ItemFormat.U2 );
	});

	it('should be created with a default value', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.U2 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal('');
		item.should.have.property( 'format' ).equal(ItemFormat.U2 );
	});

	it('should be created with a default value via static method', () => {
		const item = DataItem.u2( 'temper' );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal('temper');
		item.should.have.property( 'format' ).equal(ItemFormat.U2 );
	});

	it('should throw an exception if passing an invalid value (null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U2 )
				.value( null )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of nulls)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U2 )
				.value( [null, null] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (undefined via static method)', () => {
		expect( () => {
      DataItem.u2( "humidity", null );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (object)', () => {
    expect( () => {
      DataItem
				.builder
				.value( { name: "error" } )
				.format(ItemFormat.U2 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value before setting a format', () => {
    expect( () => {
      DataItem
				.builder
				.value( 12324345 )
				.format(ItemFormat.U2 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (too big value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U2 )
				.value( 70000 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing a negative value', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U2 )
				.value( -19 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U2 )
				.value( "123212345" )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (negative string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U2 )
				.value( "-19" )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should be created with a correct value (single value number array)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.U2 )
			.size( 12 )
			.name( "pressure" )
			.value( [62312] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 62312 );
		item.should.have.property( 'name' ).equal( "pressure" );
		item.should.have.property( 'format' ).equal(ItemFormat.U2 );
	});

	it('should be created with a correct value (single value number array via static method )', () => {
		const item = DataItem.u2( "pressure", [57123] );
			

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 57123 );
		item.should.have.property( 'name' ).equal( "pressure" );
		item.should.have.property( 'format' ).equal(ItemFormat.U2 );
	});

	it('should be created with a correct value (single value string array)', () => {
		const arr = new Array();
		arr.push( "53121" )

		const item = DataItem
			.builder
			.format(ItemFormat.U2 )
			.value( arr )
			.name( "temp" )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 53121 );
		item.should.have.property( 'name' ).equal( "temp" );
		item.should.have.property( 'format' ).equal(ItemFormat.U2 );
	});

	it('should be created with a correct value (single value string array via static method)', () => {
		const arr = new Array();
		arr.push( "61312" )

		const item = DataItem.u2( "temp", arr );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 61312 );
		item.should.have.property( 'name' ).equal( "temp" );
		item.should.have.property( 'format' ).equal(ItemFormat.U2 );
	});

	it('should be created with a correct value (single value number array with 0)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.U2 )
			.name( "test1" )
			.value( [0] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal( "test1" );
		item.should.have.property( 'format' ).equal(ItemFormat.U2 );
	});

	it('should be created with a correct value (single value number array with 0 via static method)', () => {
		const item = DataItem.u2( "test1", [0] );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal( "test1" );
		item.should.have.property( 'format' ).equal(ItemFormat.U2 );
	});

	it('should throw an exception if passing an invalid value (single value array with null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U2 )
				.value( [null] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with undefined)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U2 )
				.value( [undefined] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});


	it('should throw an exception if passing an invalid value (single value array object)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U2 )
				.value( { name: "error" } )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too big value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U2 )
				.value( [1232434351] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too big value via static method)', () => {
    expect( () => {
      DataItem.u2( "test2", [1232434351] );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with negative value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U2 )
				.value( [-178] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with negative value via static method)', () => {
    expect( () => {
      DataItem.u2( "test1", [-199] )
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U2 )
				.value( ["1232234"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with negative string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U2 )
				.value( ["-198"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should be created with a correct value (array of numbers)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.U2 )
			.size( 123 )
			.name( "pressure" )
			.value( [62354, 181, 59120] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([62354, 181, 59120])
		
		item.should.have.property( 'format' ).equal(ItemFormat.U2 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of numbers via static method)', () => {
		const item = DataItem.u2( 'pressure', 1, [62354, 181, 59120], "13243" )

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([1, 62354, 181, 59120, 13243])
		
		item.should.have.property( 'format' ).equal(ItemFormat.U2 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of strings)', () => {
		const item = DataItem
			.builder
			.name( "pressure" )
			.format(ItemFormat.U2 )
			.value( ["58123", '0x232'] )
			.size( 123 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([58123, 0x232])
		
		item.should.have.property( 'format' ).equal(ItemFormat.U2 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of zeros)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.U2 )
			.size( 123 )
			.name( "pressure" )
			.value( ["0", '0x0', 0] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([0, 0, 0])
		
		item.should.have.property( 'format' ).equal(ItemFormat.U2 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of zeros via static method)', () => {
		const item = DataItem.u2( "pressure", 0, ["0", '0x0', 0], 0  )

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([0, 0, 0, 0, 0])
		
		item.should.have.property( 'format' ).equal(ItemFormat.U2 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should throw an exception if passing an invalid value (array with null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U2 )
				.value( [1, 8, null] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array with undefined)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U2 )
				.value( [1, undefined,  8] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of invalid objects)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U2 )
				.value( [ 6412, 211, () => {}, { name: "error 1" } ] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big values)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U2 )
				.value( [11234, 312343, 412, 453 ] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big values via static method)', () => {
    expect( () => {
      DataItem.u2( 'pressure', 11234, 312343, 412, 453 );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of negative values)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U2 )
				.value( [-1, -6, -19240] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of negative values via static method)', () => {
    expect( () => {
      DataItem.u2( "pres", [-1, -6, -19340] );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U2 )
				.value( ["12", "0", "123212"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big string value via static method)', () => {
    expect( () => {
      DataItem.u2( "pres", ["12", "0", "123212"] )
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of negative string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U2 )
				.value( [ "-4", "-3122"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of negative string value via static method)', () => {
    expect( () => {
      DataItem.u2( "pres", "-4", "-33122" )
    })
    .to.throw( InvalidFormatError );
	});

	it('should be created with correct value via data item static method #1', () => {
		const item = DataItem.numeric( ItemFormat.U2, "humidity", [61236] );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 61236 );
		item.should.have.property( 'format' ).equal( ItemFormat.U2 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});

	it('should be created with correct value via data item static method #2', () => {
		const item = DataItem.numeric( ItemFormat.U2, "humidity", 123, 56874, "47817" );

		item.should.not.have.property( 'size' );
		expect(item.value ).to.have.ordered.members([123, 56874, 47817 ])
		item.should.have.property( 'format' ).equal( ItemFormat.U2 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});

	it('should be created with correct value via data item static method #3', () => {
		const item = DataItem.u2( "humidity", [53341, '0xabc'], ["0", "712", "41212"], 123, 1111, []   );

		item.should.not.have.property( 'size' );
		
		expect(item.value ).to.have.ordered.members([53341, 0xabc, 0, 712, 41212, 123, 1111 ])
		item.should.have.property( 'format' ).equal( ItemFormat.U2 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});

	it('encode must return valid binary stream (single value)', () => {
		const m = DataItem.u2( "temp", 54123 );

    const encodedArray = Encoder.encode(m);
		const expectedArray = Buffer.from([0xA9, 0x02, 0xD3, 0x6B ])
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});

	it('encode must return valid binary stream (array)', () => {
		const m = DataItem.u2( "temp", 8734, 1221, 65123 );

    const encodedArray = Encoder.encode(m);
		const expectedArray = Buffer.from([0xA9, 0x06, 0x22, 0x1E, 0x04, 0xC5, 0xFE, 0x63 ])
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});



	it('should be equal items #1', () => {
		const itemA = DataItem.u2( "temp", 12876 );
		const itemB = DataItem.u2( "pressure", 12876 );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #2', () => {
		const itemA = DataItem.u2( "temp", 12341, [45532, "132"], 12 );
		const itemB = DataItem.u2( "pressure", 12341, "45532", [132, 12] );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #3', () => {
		const itemA = DataItem.u2( "temp", [61234], );
		const itemB = DataItem.u2( "pressure", "61234" );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #4', () => {
		const itemA = DataItem.u2( "temp", [11123, 5412, 0], );
		const itemB = DataItem.u2( "pressure", 11123, "5412", [0] );
			
		( itemA.equals( itemB ) ).should.be.true;
	});


	it('should not be equal items #1', () => {
		const itemA = DataItem.u2( "temp", 12 );
		const itemB = DataItem.u1( "temp", 12 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #2', () => {
		const itemA = DataItem.u2( "temp", 12 );
		const itemB = DataItem.u2( "temp", 13 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #3', () => {
		const itemA = DataItem.u2( "temp", 12 );
		const itemB = DataItem.u2( "temp", 12, 13 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #4', () => {
		const itemA = DataItem.u2( "temp", [12123, 1378, 9214] );
		const itemB = DataItem.u2( "temp", 12, 13 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});
	

});