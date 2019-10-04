
const Encoder = require( './src/coding/encoder' );

const { 
	Message,
	DataItem,
Config } = require( './src/hsms' )

	var builder = Config
		.builder
		.mode( Config.mode.Active )
		.port( "7850" );
		



	console.log( "end" );