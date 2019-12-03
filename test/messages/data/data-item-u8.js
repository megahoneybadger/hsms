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

describe('Data Item U8', () => {
	it('should be created with a correct value (number)', () => {
		const item = DataItem
			.builder
			.size( 123 )
			.format( ItemFormat.U8 )
			.value( 9007199254740991 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 9007199254740991 );
		item.should.have.property( 'format' ).equal( ItemFormat.U8 );
	});

	it('should be created with a correct value (0)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.U8 )
			.value( 0 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'format' ).equal( ItemFormat.U8 );
	});

	it('should be created with a correct value (single element array)', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.U8 )
			.value( [ "12355433454384" ] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 12355433454384 );
		item.should.have.property( 'format' ).equal( ItemFormat.U8 );
	});

	it('should be created with a default value', () => {
		const item = DataItem
			.builder
			.format( ItemFormat.U8 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal('');
		item.should.have.property( 'format' ).equal(ItemFormat.U8 );
	});

	it('should be created with a default value via static method', () => {
		const item = DataItem.u8( 'temper' );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal('temper');
		item.should.have.property( 'format' ).equal(ItemFormat.U8 );
	});

	it('should throw an exception if passing an invalid value (null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U8 )
				.value( null )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of nulls)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U8 )
				.value( [null, null] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (undefined via static method)', () => {
		expect( () => {
      DataItem.u8( "humidity", null );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (object)', () => {
    expect( () => {
      DataItem
				.builder
				.value( { name: "error" } )
				.format(ItemFormat.U8 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value before setting a format', () => {
    expect( () => {
      DataItem
				.builder
				.value( 12324341231 )
				.format(ItemFormat.U8 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (too big value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U8 )
				.value( 9007199254740992 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing a negative value', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U8 )
				.value( -19 )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U8 )
				.value( "90071992547409931" )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (negative string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U8 )
				.value( "-19" )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should be created with a correct value (single value number array)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.U8 )
			.size( 12 )
			.name( "pressure" )
			.value( [Number.MAX_SAFE_INTEGER] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( Number.MAX_SAFE_INTEGER );
		item.should.have.property( 'name' ).equal( "pressure" );
		item.should.have.property( 'format' ).equal(ItemFormat.U8 );
	});

	it('should be created with a correct value (single value number array via static method )', () => {
		const item = DataItem.u8( "pressure", [42949123267294] );
			

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 42949123267294 );
		item.should.have.property( 'name' ).equal( "pressure" );
		item.should.have.property( 'format' ).equal(ItemFormat.U8 );
	});

	it('should be created with a correct value (single value string array)', () => {
		const arr = new Array();
		arr.push( "900719925474099" )

		const item = DataItem
			.builder
			.format(ItemFormat.U8 )
			.value( arr )
			.name( "temp" )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 900719925474099 );
		item.should.have.property( 'name' ).equal( "temp" );
		item.should.have.property( 'format' ).equal(ItemFormat.U8 );
	});

	it('should be created with a correct value (single value string array via static method)', () => {
		const arr = new Array();
		arr.push( "4294965347280" )

		const item = DataItem.u8( "temp", arr );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 4294965347280 );
		item.should.have.property( 'name' ).equal( "temp" );
		item.should.have.property( 'format' ).equal(ItemFormat.U8 );
	});

	it('should be created with a correct value (single value number array with 0)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.U8 )
			.name( "test1" )
			.value( [0] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal( "test1" );
		item.should.have.property( 'format' ).equal(ItemFormat.U8 );
	});

	it('should be created with a correct value (single value number array with 0 via static method)', () => {
		const item = DataItem.u8( "test1", [0] );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 0 );
		item.should.have.property( 'name' ).equal( "test1" );
		item.should.have.property( 'format' ).equal(ItemFormat.U8 );
	});

	it('should throw an exception if passing an invalid value (single value array with null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U8 )
				.value( [null] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with undefined)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U8 )
				.value( [undefined] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array object)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U8 )
				.value( { name: "error" } )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too big value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U8 )
				.value( [90071992547409912] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too big value via static method)', () => {
    expect( () => {
      DataItem.u8( "test2", [19007199254740991] );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with negative value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U8 )
				.value( [-178] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with negative value via static method)', () => {
    expect( () => {
      DataItem.u8( "test1", [-199] )
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U8 )
				.value( ["900719925474099121"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (single value array with negative string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U8 )
				.value( ["-198"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should be created with a correct value (array of numbers)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.U8 )
			.size( 123 )
			.name( "pressure" )
			.value( [61236432342354, 429496756567295, 523249120] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([61236432342354, 429496756567295, 523249120])
		
		item.should.have.property( 'format' ).equal(ItemFormat.U8 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of numbers via static method)', () => {
		const item = DataItem.u8( 'pressure', 1, [329493124367295, 4294943267295, 59120], "13223454343" )

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([1, 329493124367295, 4294943267295, 59120, 13223454343])
		
		item.should.have.property( 'format' ).equal(ItemFormat.U8 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of strings)', () => {
		const item = DataItem
			.builder
			.name( "pressure" )
			.format(ItemFormat.U8 )
			.value( ["3294932167295", '0x21212332'] )
			.size( 123 )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([3294932167295, 0x21212332])
		
		item.should.have.property( 'format' ).equal(ItemFormat.U8 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of zeros)', () => {
		const item = DataItem
			.builder
			.format(ItemFormat.U8 )
			.size( 123 )
			.name( "pressure" )
			.value( ["0", '0x0', 0] )
			.build();

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([0, 0, 0])
		
		item.should.have.property( 'format' ).equal(ItemFormat.U8 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should be created with a correct value (array of zeros via static method)', () => {
		const item = DataItem.u8( "pressure", 0, ["0", '0x0', 0], 0  )

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' );

		expect(item.value ).to.have.ordered.members([0, 0, 0, 0, 0])
		
		item.should.have.property( 'format' ).equal(ItemFormat.U8 );
		item.should.have.property( 'name' ).equal( "pressure" );
	});

	it('should throw an exception if passing an invalid value (array with null)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U8 )
				.value( [1, 8, null] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array with undefined)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U8 )
				.value( [1, undefined,  8] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of invalid objects)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U8 )
				.value( [ 6412, 211, () => {}, { name: "error 1" } ] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big values)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U8 )
				.value( [11234, 90071992547409911, 412, 453 ] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big values via static method)', () => {
    expect( () => {
      DataItem.u8( 'pressure', 11234, 19007199254740991, 412, 453 );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of negative values)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U8 )
				.value( [-1, -6, -19240] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of negative values via static method)', () => {
    expect( () => {
      DataItem.u8( "pres", [-1, -6, -19340] );
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U8 )
				.value( ["12", "0", "19007199254740991"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of too big string value via static method)', () => {
    expect( () => {
      DataItem.u8( "pres", ["12", "0", "190071992547409912"] )
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of negative string value)', () => {
    expect( () => {
      DataItem
				.builder
				.format(ItemFormat.U8 )
				.value( [ "-4", "-3122"] )
				.build();
    })
    .to.throw( InvalidFormatError );
	});

	it('should throw an exception if passing an invalid value (array of negative string value via static method)', () => {
    expect( () => {
      DataItem.u8( "pres", "-4", "-33122" )
    })
    .to.throw( InvalidFormatError );
	});

	it('should be created with correct value via data item static method #1', () => {
		const item = DataItem.numeric( ItemFormat.U8, "humidity", [42949121367290] );

		item.should.not.have.property( 'size' );
		item.should.have.property( 'value' ).equal( 42949121367290 );
		item.should.have.property( 'format' ).equal( ItemFormat.U8 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});

	it('should be created with correct value via data item static method #2', () => {
		const item = DataItem.numeric( ItemFormat.U8, "humidity", 429123214967290, 56874, "129421967295" );

		item.should.not.have.property( 'size' );
		expect(item.value ).to.have.ordered.members([429123214967290, 56874, 129421967295 ])
		item.should.have.property( 'format' ).equal( ItemFormat.U8 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});

	it('should be created with correct value via data item static method #3', () => {
		const item = DataItem.u8( "humidity", [53341, '0xabc'], ["0", "712", "4294967290"], 123, 9007199254740991, []   );

		item.should.not.have.property( 'size' );
		
		expect(item.value ).to.have.ordered.members([53341, 0xabc, 0, 712, 4294967290, 123, 9007199254740991 ])
		item.should.have.property( 'format' ).equal( ItemFormat.U8 );
		item.should.have.property( 'name' ).equal( "humidity" );
	});

	it('encode must return valid binary stream (single value)', () => {
		const m = DataItem.u8( "temp", 8007199254740991 );

    const encodedArray = Encoder.encode(m);
		const expectedArray = Buffer.from([0xA1, 0x08, 0x00, 0x1C, 0x72, 0x81, 0x5B, 0x39, 0x7F, 0xFF ])
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});

	it('encode must return valid binary stream (array)', () => {
		const m = DataItem.u8( "temp", 8007199254740991, 9007199254740991, 23121343425 );

    const encodedArray = Encoder.encode(m);
		const expectedArray = Buffer.from([
			0xA1, 0x18, 0x00, 0x1C, 0x72, 0x81, 0x5B, 0x39, 0x7F, 0xFF, 
			0x00, 0x1F, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x00, 0x00, 
			0x00, 0x05, 0x62, 0x23, 0xB3, 0xC1  ])
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});

	it('should be equal items #1', () => {
		const itemA = DataItem.u8( "temp", 4294967290 );
		const itemB = DataItem.u8( "pressure", 4294967290 );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #2', () => {
		const itemA = DataItem.u8( "temp", 12341, [9007199254740991, "132"], 12 );
		const itemB = DataItem.u8( "pressure", 12341, "9007199254740991", [132, 12] );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #3', () => {
		const itemA = DataItem.u8( "temp", [32992167290], );
		const itemB = DataItem.u8( "pressure", "32992167290" );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should be equal items #4', () => {
		const itemA = DataItem.u8( "temp", [32949364567290, 512897643412, 0], );
		const itemB = DataItem.u8( "pressure", 32949364567290, "512897643412", [0] );
			
		( itemA.equals( itemB ) ).should.be.true;
	});

	it('should not be equal items #1', () => {
		const itemA = DataItem.u8( "temp", 1212324 );
		const itemB = DataItem.u8( "temp", 1212325 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #2', () => {
		const itemA = DataItem.u8( "temp", 3294967290 );
		const itemB = DataItem.u8( "temp", 3294967291 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #3', () => {
		const itemA = DataItem.u8( "temp", 12 );
		const itemB = DataItem.u8( "temp", 12, 13 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});

	it('should not be equal items #4', () => {
		const itemA = DataItem.u8( "temp", [12123, 1378, 9214] );
		const itemB = DataItem.u8( "temp", 12, 13 );
			
		( itemA.equals( itemB ) ).should.be.false;
	});











});