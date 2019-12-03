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

describe('Data Message Equality', () => {
 

	it('should be equal #1', () => {
		let m1 = DataMessage
			.builder
			.device( 1 )
			.stream( 1 )
			.replyExpected( false )
			.func( 1 )
			.items(
				DataItem.i1( "temp", 87, 12, 54 )) 
			.build();

		let m2 = DataMessage
			.builder
			.device( 1 )
			.stream( 1 )
			.replyExpected( false )
			.func( 1 )
			.items(
				DataItem.i1( "temp", 87, 12, 54 )) 
			.build();

			( m1.equals( m2 ) ).should.be.true;
	});

	it('should be equal #2', () => {
		let m1 = DataMessage
			.builder
			.device( 1 )
			.stream( 1 )
			.replyExpected( false )
			.func( 1 )
			.items(
				DataItem.i1( "temp1", -87, "12", 54 ),
				DataItem.i1( "temp2", [32, -78, "0", 121, -76] ),

				DataItem.u1( "temp3", 200 ),
				DataItem.u1( "temp4", [200, 100, 0 ] ),

				DataItem.i2( "temp3", -200, "3211" ),
				DataItem.i2( "temp4", "200", "100", [0 ] ),

				DataItem.u2( "temp3", [62100, "32611"] ),
				DataItem.u2( "temp4", [21200], [17600, "10" ] ),

				DataItem.i4( "temp5", -2112320, 2147483640 ),
				DataItem.i4( "temp6", [200, 2147483630, 0 ] ),

				DataItem.i8( "temp5", -21321123412320, 543147483640 ),
				DataItem.i8( "temp9", [5431474321483640] ),
				
				DataItem.u4( "temp3", 6210012, 4294967290 ),
				DataItem.u4( "temp4", [2121234200, 3294967295, 10 ] ),

				DataItem.u8( "temp3", 9007199254740991, 429342324967290 ),
				DataItem.u8( "", [54374321483640] ) ) 
			.build();

		let m2 = DataMessage
			.builder
			.device( 1 )
			.stream( 1 )
			.replyExpected( false )
			.func( 1 )
			.items(
				DataItem.i1( "error", "-87", ["12", 54] ),
				DataItem.i1( "pressure", 32, "-78", "0", [121, -76] ),

				DataItem.u1( "temp3", 200 ),
				DataItem.u1( "temp4", "200", "100", [0 ] ),

				DataItem.i2( "temp3", -200, "3211" ),
				DataItem.i2( "temp4", "200", "100", [0 ] ),

				DataItem.u2( "temp3", [62100, "32611"] ),
				DataItem.u2( "temp4", [21200], [17600, "10" ] ),

				DataItem.i4( "temp5", -2112320, 2147483640 ),
				DataItem.i4( "temp6", [200, 2147483630, 0 ] ),

				DataItem.i8( "", -21321123412320, 543147483640 ),
				DataItem.i8( "", [5431474321483640] ),
				
				DataItem.u4( "temp3", 6210012, 4294967290 ),
				DataItem.u4( "temp4", [2121234200, 3294967295, 10 ] ),

				
				DataItem.u8( "temp3", 9007199254740991, 429342324967290 ),
				DataItem.u8( "", [54374321483640] ) ) 
				
				
			.build();

			( m1.equals( m2 ) ).should.be.true;
	});



	  
                    

	//  

	it('should not be equal (device)', () => {
		let m1 = DataMessage
			.builder
			.device( 1 )
			.stream( 1 )
			.replyExpected( false )
			.func( 1 )
			.items(
				DataItem.i1( "temp", 87, 12, 54 )) 
			.build();

		let m2 = DataMessage
			.builder
			.device( 2 )
			.stream( 1 )
			.replyExpected( false )
			.func( 1 )
			.items(
				DataItem.i1( "temp", 87, 12, 54 )) 
			.build();

			( m1.equals( m2 ) ).should.be.false;
	});

	it('should not be equal (stream)', () => {
		let m1 = DataMessage
			.builder
			.device( 1 )
			.stream( 2 )
			.replyExpected( false )
			.func( 1 )
			.items(
				DataItem.i1( "temp", 87, 12, 54 )) 
			.build();

		let m2 = DataMessage
			.builder
			.device( 1 )
			.stream( 1 )
			.replyExpected( false )
			.func( 1 )
			.items(
				DataItem.i1( "temp", 87, 12, 54 )) 
			.build();

			( m1.equals( m2 ) ).should.be.false;
	});

	it('should not be equal (func)', () => {
		let m1 = DataMessage
			.builder
			.device( 1 )
			.stream( 21 )
			.replyExpected( false )
			.func( 1 )
			.items(
				DataItem.i1( "temp", 87, 12, 54 )) 
			.build();

		let m2 = DataMessage
			.builder
			.device( 1 )
			.stream( 21 )
			.replyExpected( false )
			.func( 11 )
			.items(
				DataItem.i1( "temp", 87, 12, 54 )) 
			.build();

			( m1.equals( m2 ) ).should.be.false;
	});

	it('should not be equal (fureplyExpectednc)', () => {
		let m1 = DataMessage
			.builder
			.device( 1 )
			.stream( 21 )
			.replyExpected( true )
			.func( 1 )
			.items(
				DataItem.i1( "temp", 87, 12, 54 )) 
			.build();

		let m2 = DataMessage
			.builder
			.device( 1 )
			.stream( 21 )
			.replyExpected( false )
			.func( 1 )
			.items(
				DataItem.i1( "temp", 87, 12, 54 )) 
			.build();

			( m1.equals( m2 ) ).should.be.false;
	});

	it('should not be equal (items #1)', () => {
		let m1 = DataMessage
			.builder
			.device( 1 )
			.stream( 21 )
			.replyExpected( false )
			.func( 1 )
			.items(
				DataItem.i1( "temp", 87 )) 
			.build();

		let m2 = DataMessage
			.builder
			.device( 1 )
			.stream( 21 )
			.replyExpected( false )
			.func( 1 )
			.items(
				DataItem.i1( "temp", 88 )) 
			.build();

			( m1.equals( m2 ) ).should.be.false;
	});

	it('should not be equal (items #1)', () => {
		let m1 = DataMessage
			.builder
			.device( 1 )
			.stream( 21 )
			.replyExpected( false )
			.func( 1 )
			.items(
				DataItem.i1( "temp", 88 )) 
			.build();

		let m2 = DataMessage
			.builder
			.device( 1 )
			.stream( 21 )
			.replyExpected( false )
			.func( 1 )
			.items(
				DataItem.u1( "temp", 88 )) 
			.build();

			( m1.equals( m2 ) ).should.be.false;
	});

});