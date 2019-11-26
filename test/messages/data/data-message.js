var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

const { 
	DataItem,
	DataMessage,
	Constants,
	ItemFormat,
	Encoder } = require( '../../../src/hsms' )

const { 
	NoBuilderError,
	TooManyParamsError,
	InvalidEnumValueError,
	InvalidFormatError } = require( '../../../src/utils/errors/custom-errors' )

describe('Data Message', () => {
  it('should throw an exception if creating without a builder #1', () => {
    expect( () => {
      const m = new DataMessage( 1 );
    })
    .to.throw( NoBuilderError );
	});

	it('should throw an exception if creating without a builder #2', () => {
    expect( () => {
      const m = new DataMessage();
    })
    .to.throw( NoBuilderError );
	});

	it('should throw an exception if passing too many params', () => {
    expect( () => {
      const m = new DataMessage( DataMessage.builder, 1, "error" );
    })
    .to.throw( TooManyParamsError );
	});

	it('should be created with correct parameters', () => {
		const message = DataMessage
			.builder
			.device( 1 )
			.context( 2 )
			.stream( 3 )
			.func( 4 )
			.replyExpected( true )
			.description( "this is a desc" )
			.build();

			message.should.have.property( 'device' ).equal( 1 );
			message.should.have.property( 'context' ).equal( 2 );
			message.should.have.property( 'stream' ).equal( 3 );
			message.should.have.property( 'func' ).equal( 4 );
			message.should.have.property( 'replyExpected' ).equal( true );
			message.should.have.property( 'items' ).to.be.instanceof(Array).and.to.be.empty;
			message.should.have.property( 'description' ).equal( "this is a desc" );
	});

	it('should be created with default parameters', () => {
		const message = DataMessage
			.builder
			.build();

			message.should.have.property( 'device' ).equal( 0 );
			message.should.have.property( 'context' ).equal( 0 );
			message.should.have.property( 'stream' ).equal( 0 );
			message.should.have.property( 'func' ).equal( 0 );
			message.should.have.property( 'replyExpected' ).equal( true );
			message.should.have.property( 'description' ).equal( "" );
			message.should.have.property( 'items' ).to.be.instanceof(Array).and.to.be.empty;
	});

	it('should not allow to change the properties', () => {
		const m = DataMessage
			.builder
			.device( 112 )
			.context( 223 )
			.stream( 33 )
			.func( 44 )
			.replyExpected( false )
			.description( "test1" )
			.build();

    m.device = 123;
		m.context = 'test';
		m.stream = 'test';
		m.func = () => "error";
		m.description = [ 1, 2 ];
		m.items = "wrong array value";
		m.replyExpected = 123;

		m.should.have.property( 'device' ).equal( 112 );
		m.should.have.property( 'context' ).equal( 223 );
		m.should.have.property( 'stream' ).equal( 33 );
		m.should.have.property( 'func' ).equal( 44 );
		m.should.have.property( 'description' ).equal( "test1" );
		m.should.have.property( 'replyExpected' ).equal( false );
		m.should.have.property( 'items' ).to.be.instanceof(Array).and.to.be.empty;
	});
	
	it('should not allow to delete the properties', () => {
		const m = DataMessage
			.builder
			.device( 112 )
			.context( 223 )
			.stream( 33 )
			.replyExpected( "error" )
			.func( 44 )
			.description( "test1" )
			.build();

    delete m.device;
		delete m.context;
		delete m.stream;
		delete m.func;
		delete m.description;
		delete m.replyExpected;
		delete m.items;

		m.should.have.property( 'device' ).equal( 112 );
		m.should.have.property( 'context' ).equal( 223 );
		m.should.have.property( 'stream' ).equal( 33 );
		m.should.have.property( 'func' ).equal( 44 );
		m.should.have.property( 'description' ).equal( "test1" );
		m.should.have.property( 'replyExpected' ).equal( false );
		m.should.have.property( 'items' ).to.be.instanceof(Array).and.to.be.empty;
	});
	
	it('should throw an exception if passing non integer context', () => {
    expect(() => {
			DataMessage
				.builder
				.context("long string");
    })
    .to.throw(TypeError, Constants.getErrUIntNotInRange("Context"));
	});
	
	it('should throw an exception if passing negative integer context', () => {
    expect(() => {
			DataMessage
			.builder
			.context(-10);
    })
    .to.throw(TypeError, Constants.getErrUIntNotInRange("Context"));
	});
	
	it('should throw an exception if passing too big integer context', () => {
    expect(() => {
			DataMessage
				.builder
				.context(172671261526512);
    })
    .to.throw(TypeError, Constants.getErrUIntNotInRange("Context"));
	});
	

	it('should throw an exception if passing non integer device', () => {
    expect(() => {
			DataMessage
				.builder
				.device("long string");
    })
    .to.throw(TypeError, Constants.getErrUShortNotInRange("Device"));
	});
	
	it('should throw an exception if passing negative integer device', () => {
    expect(() => {
			DataMessage
			.builder
			.device(-10);
    })
    .to.throw(TypeError, Constants.getErrUShortNotInRange("Device"));
	});
	
	it('should throw an exception if passing too big integer device', () => {
    expect(() => {
			DataMessage
				.builder
				.device(172671261526512);
    })
    .to.throw(TypeError, Constants.getErrUShortNotInRange("Device"));
	});
	

	it('should throw an exception if passing non integer stream', () => {
    expect(() => {
			DataMessage
				.builder
				.stream("long string");
    })
    .to.throw(TypeError, Constants.getErrUByteNotInRange("Stream"));
	});
	
	it('should throw an exception if passing negative integer stream', () => {
    expect(() => {
			DataMessage
			.builder
			.stream(-10);
    })
    .to.throw(TypeError, Constants.getErrUByteNotInRange("Stream"));
	});
	
	it('should throw an exception if passing too big integer stream', () => {
    expect(() => {
			DataMessage
				.builder
				.stream(172671261526512);
    })
    .to.throw(TypeError, Constants.getErrUByteNotInRange("Stream"));
	});
	
	it('should throw an exception if passing non integer func', () => {
    expect(() => {
			DataMessage
				.builder
				.func("long string");
    })
    .to.throw(TypeError, Constants.getErrUByteNotInRange("Func"));
	});
	
	it('should throw an exception if passing negative integer func', () => {
    expect(() => {
			DataMessage
			.builder
			.func(-10);
    })
    .to.throw(TypeError, Constants.getErrUByteNotInRange("Func"));
	});
	
	it('should throw an exception if passing too big integer func', () => {
    expect(() => {
			DataMessage
				.builder
				.func(172671261526512);
    })
    .to.throw(TypeError, Constants.getErrUByteNotInRange("Func"));
	});
	
	it('should throw an exception if passing a non-string description #1', () => {
    expect(() => {
			DataMessage
				.builder
				.description(() => 0);
    })
    .to.throw(InvalidFormatError);
	});
	
	it('should throw an exception if passing a non-string description #2', () => {
    expect(() => {
			DataMessage
				.builder
				.description(123);
    })
    .to.throw(InvalidFormatError);
	});
	
	it('should be created with correct items i1', () => {
		const m = DataMessage
			.builder
			.items( 
				DataItem.i1( "temp", 123 ),
				DataItem.i1( "pressure", 98 ),
				DataItem.i1( "misc", [1,6,9] ) )
			.build();

			m.items[ 0 ].should.have.property( 'name' ).equal( 'temp' );
			m.items[ 0 ].should.have.property( 'format' ).equal( ItemFormat.I1 );
			m.items[ 0 ].should.have.property( 'value' ).equal( 123 );

			m.items[ 1 ].should.have.property( 'name' ).equal( 'pressure' );
			m.items[ 1 ].should.have.property( 'format' ).equal( ItemFormat.I1 );
			m.items[ 1 ].should.have.property( 'value' ).equal( 98 );

			m.items[ 2 ].should.have.property( 'name' ).equal( 'misc' );
			m.items[ 2 ].should.have.property( 'format' ).equal( ItemFormat.I1 );
			m.items[ 2 ].should.have.property( 'value' ).to.have.members( [1,6,9] );
	});



	it('encode must return valid binary stream (i1) #1', () => {
		let m = DataMessage
			.builder
			.device( 1 )
			.stream( 1 )
			.replyExpected( false )
			.func( 1 )
			.items(
				DataItem.i1( "temp", 87, 12, 54 )) 
			.build();

		const encodedArray = Encoder.encode(m);
	
		const expectedArray = Buffer.from([ 0x00, 0x00, 0x00, 0x0f, 
			0x00, 0x01, 0x81, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  
			0x65, 0x03, 0x57, 0x0C, 0x36  ])

		// console.log( encodedArray );
		// console.log( expectedArray );
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});
	
	it('encode must return valid binary stream (i1) #2', () => {
		let m = DataMessage
			.builder
			.device( 1 )
			.stream( 1 )
			.replyExpected( false )
			.func( 1 )
			.items(
				DataItem.i1( "temp", 66 )) 
			.build();

		const encodedArray = Encoder.encode(m);
	
		const expectedArray = Buffer.from([ 0x00, 0x00, 0x00, 0x0d, 
			0x00, 0x01, 0x81, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  
			0x65, 0x01, 0x42 ])

		// console.log( encodedArray );
		// console.log( expectedArray );
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});
	
	it('encode must return valid binary stream (i1) #3', () => {
		let m = DataMessage
			.builder
			.device( 1 )
			.stream( 1 )
			.replyExpected( false )
			.func( 1 )
			.items(
				DataItem.i1( "temp", 66 )) 
			.build();

		const encodedArray = Encoder.encode(m);
	
		const expectedArray = Buffer.from([ 0x00, 0x00, 0x00, 0x0d, 
			0x00, 0x01, 0x81, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  
			0x65, 0x01, 0x42 ])

		// console.log( encodedArray );
		// console.log( expectedArray );
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});
	
	it('encode must return valid binary stream (i1) #4', () => {
		let m = DataMessage
			.builder
			.device( 7 )
			.stream( 3 )
			.context( 7895654 )
			.replyExpected( true )
			.func( 1 )
			.items(
				DataItem.i1( "", 78 ),
				DataItem.i1( "", 1, 6, 9 ),
				DataItem.i1( "", [ 12, 99 ] )) 
			.build();

		const encodedArray = Encoder.encode(m);
	
		const expectedArray = Buffer.from([ 0x00, 0x00, 0x00, 0x16, 
			0x00, 0x07, 0x03, 0x01, 0x00, 0x00, 0x00, 0x78, 0x7A, 0x66,  
			0x65, 0x01, 0x4E, 0x65, 0x03, 0x01, 0x06, 0x09, 0x65, 0x02, 0x0C, 0x63 ])

		// console.log( encodedArray );
		// console.log( expectedArray );
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});
	

	it('encode must return valid binary stream (u1) #1', () => {
		let m = DataMessage
			.builder
			.device( 1 )
			.stream( 1 )
			.context( 456798 )
			.replyExpected( false )
			.func( 1 )
			.items(
				DataItem.u1( "", 212 ),
				DataItem.u1( "", 124, 8, 221, 7, "11", 0 ),
				DataItem.u1( "", [193, "16" ] )) 
			.build();

		const encodedArray = Encoder.encode(m);
	
		const expectedArray = Buffer.from([ 0x00, 0x00, 0x00, 0x19, 
			0x00, 0x01, 0x81, 0x01, 0x00, 0x00, 0x00, 0x06, 0xF8, 0x5E,
			0xA5, 0x01, 0xD4, 0xA5, 0x06, 0x7C, 0x08, 0xDD, 0x07, 0x0B, 0x00, 0xA5, 0x02, 0xC1, 0x10 ])

		// console.log( encodedArray );
		// console.log( expectedArray );
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});

	it('encode must return valid binary stream (u1) #2', () => {
		let m = DataMessage
			.builder
			.device( 11 )
			.stream( 3 )
			.context( 89712 )
			.replyExpected( true )
			.func( 7 )
			.items(
				DataItem.u1( "pressure", 172 )) 
			.build();

		const encodedArray = Encoder.encode(m);
	
		const expectedArray = Buffer.from([ 0x00, 0x00, 0x00, 0x0d, 
			0x00, 0x0B, 0x03, 0x07, 0x00, 0x00, 0x00, 0x01, 0x5E, 0x70,
			0xA5, 0x01, 0xAC ])
                    
		// console.log( encodedArray );
		// console.log( expectedArray );
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});

	it('encode must return valid binary stream (u1) #2', () => {
		let m = DataMessage
			.builder
			.device( 1 )
			.stream( 13 )
			.context( 189712 )
			.replyExpected( false )
			.func( 17 )
			.items(
				DataItem.u1( "", 172 ),
				DataItem.u1( "", 161 ),
				DataItem.u1( "", 123, "45", [ 43, 21 ] )
				) 
			.build();

		const encodedArray = Encoder.encode(m);
	
		const expectedArray = Buffer.from([ 0x00, 0x00, 0x00, 0x16, 
			0x00, 0x01, 0x8D, 0x11, 0x00, 0x00, 0x00, 0x02, 0xE5, 0x10,
			0xA5, 0x01, 0xAC, 0xA5, 0x01, 0xA1, 0xA5, 0x04, 0x7B, 0x2D, 0x2B, 0x15 ])
                    
		// console.log( encodedArray );
		// console.log( expectedArray );
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});

	it('encode must return valid binary stream (u1 + i1)', () => {
		let m = DataMessage
			.builder
			.device( 18 )
			.stream( 11 )
			.context( 76122 )
			.replyExpected( true )
			.func( 17 )
			.items(
				DataItem.u1( "", 16 ),
				DataItem.i1( "", -17 ),
				DataItem.u1( "", 161, 211 ),
				DataItem.i1( "", -123, "-45", [ -113, 11 ] ),
				DataItem.u1( "", 200, "210" )) 
			.build();

		const encodedArray = Encoder.encode(m);
	
		const expectedArray = Buffer.from([ 0x00, 0x00, 0x00, 0x1e, 
			0x00, 0x12, 0x0B, 0x11, 0x00, 0x00, 0x00, 0x01, 0x29, 0x5A,  
			0xA5, 0x01, 0x10, 0x65, 0x01, 0xEF, 0xA5, 0x02, 0xA1,
			0xD3, 0x65, 0x04, 0x85, 0xD3, 0x8F, 0x0B, 0xA5, 0x02, 0xC8, 0xD2
		 ])
                    
		// console.log( encodedArray );
		// console.log( expectedArray );

		
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});



	it('encode must return valid binary stream (u2) #1', () => {
		let m = DataMessage
			.builder
			.device( 1 )
			.stream( 1 )
			.replyExpected( false )
			.func( 1 )
			.context( 98126 )
			.items(
				DataItem.u2( "temp", 18712, 61612, 5124 )) 
			.build();

		const encodedArray = Encoder.encode(m);
	
		const expectedArray = Buffer.from([ 0x00, 0x00, 0x00, 0x12, 
			0x00, 0x01, 0x81, 0x01, 0x00, 0x00, 0x00, 0x01, 0x7F, 0x4E,
			0xA9, 0x06, 0x49, 0x18, 0xF0, 0xAC, 0x14, 0x04   ])

		// console.log( encodedArray );
		// console.log( expectedArray );
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});

	it('encode must return valid binary stream (u2) #1', () => {
		let m = DataMessage
			.builder
			.device( 1 )
			.stream( 1 )
			.replyExpected( false )
			.func( 1 )
			.context( 98126 )
			.items(
				DataItem.u2( "temp", 63451 )) 
			.build();

		const encodedArray = Encoder.encode(m);
	
		const expectedArray = Buffer.from([ 0x00, 0x00, 0x00, 0x0e, 
			0x00, 0x01, 0x81, 0x01, 0x00, 0x00, 0x00, 0x01, 0x7F, 0x4E,
			0xA9, 0x02, 0xF7, 0xDB    ])

	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});
				 
	

	it('encode must return valid binary stream (i2) #1', () => {
		let m = DataMessage
			.builder
			.device( 1 )
			.stream( 1 )
			.replyExpected( false )
			.func( 1 )
			.context( 98126 )
			.items(
				DataItem.i2( "temp", -2134, -8865, 1524 )) 
			.build();

		const encodedArray = Encoder.encode(m);
	
		const expectedArray = Buffer.from([ 0x00, 0x00, 0x00, 0x12, 
			0x00, 0x01, 0x81, 0x01, 0x00, 0x00, 0x00, 0x01, 0x7F, 0x4E,
			0x69, 0x06, 0xF7, 0xAA, 0xDD, 0x5F, 0x05, 0xF4   ])

		// console.log( encodedArray );
		// console.log( expectedArray );
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});

	it('encode must return valid binary stream (i2) #1', () => {
		let m = DataMessage
			.builder
			.device( 1 )
			.stream( 1 )
			.replyExpected( false )
			.func( 1 )
			.context( 98126 )
			.items(
				DataItem.i2( "temp", -21)) 
			.build();

		const encodedArray = Encoder.encode(m);
	
		const expectedArray = Buffer.from([ 0x00, 0x00, 0x00, 0x0e, 
			0x00, 0x01, 0x81, 0x01, 0x00, 0x00, 0x00, 0x01, 0x7F, 0x4E,
			0x69, 0x02, 0xFF, 0xEB   ])

		// console.log( encodedArray );
		// console.log( expectedArray );
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});




	it('encode must return valid binary stream (mixed)', () => {
		let m =  DataMessage
			.builder
			.device( 1 )
			.stream( 1 )
			.context( 98126 )
			.replyExpected( false )
			.func( 1 )
			.items(
				DataItem.u1( "", 16 ),
				DataItem.i1( "", -17 ),
				DataItem.u1( "", 161, 211 ),
				DataItem.i1( "", -123, "-45", [ -113, 11 ] ),
				DataItem.u1( "", 200, "210" ),

				DataItem.u2( "", 28700, "21110" ),
				DataItem.u2( "", 6500 ),

				DataItem.i2( "", -2700, "8541" ),
				DataItem.i2( "", -5124 )

				) 
			.build();

		const encodedArray = Encoder.encode(m);
	
		const expectedArray = Buffer.from([ 0x00, 0x00, 0x00, 0x32, 
			0x00, 0x01, 0x81, 0x01, 0x00, 0x00, 0x00, 0x01, 0x7F, 0x4E ,  
			0xA5, 0x01, 0x10, 0x65, 0x01, 0xEF, 0xA5, 0x02, 0xA1,
			0xD3, 0x65, 0x04, 0x85, 0xD3, 0x8F, 0x0B, 0xA5, 0x02, 0xC8, 0xD2,
			0xA9, 0x04, 0x70, 0x1C, 0x52, 0x76, 0xA9, 0x02, 0x19, 0x64, 0x69,
			0x04, 0xF5, 0x74, 0x21, 0x5D, 0x69, 0x02, 0xEB, 0xFC
		 ])

		 
		 //00 01 81 01 00 00 00 01 7F 4E  
                    
                    
		// console.log( encodedArray );
		// console.log( expectedArray );

		
	
    expect(Buffer.compare(encodedArray, expectedArray)).equal(0);
	});

	//  

});