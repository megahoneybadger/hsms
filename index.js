
const Encoder = require( './src/coding/encoder' );

const { 
	Message,
	DataItem } = require( './src/hsms' )

	//const m = new Message( 0, 1 );
	var builder = DataItem.i1( "humidity", ["0", "7", "-12"]  );

		//builder.name( "fuck" );

	

	
	
	console.log( "end" );