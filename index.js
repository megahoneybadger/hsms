
const Encoder = require( './src/coding/encoder' );

const { 
	Message,
	DataItem } = require( './src/hsms' )

	//const m = new Message( 0, 1 );
	var builder = DataItem
		.builder
		.name( "fuck" )
		.size( "ffuck" )
		.build()

		//builder.name( "fuck" );

	

	
	console.log( builder.name() );

	var builder = DataItem.builder;

	
	console.log( builder.name() );

	console.log( "end" );