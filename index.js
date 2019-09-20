
const Encoder = require( './src/coding/encoder' );

const { 
	Message,
	DataItem,
	ItemFormat } = require( './src/hsms' )

	// try{
		
	// }
	// catch( err ){
	// 	console.log( err );
	// }

	const item = DataItem
			.builder
			.size( 1233 )
			.format( ItemFormat.I2 )
			.value( 7123, 781 )
			.build();





	


	//var y = val.for

		//builder.name( "fuck" );

	

	
	
	console.log( "end" );