
const Encoder = require('./src/coding/encoder');

const {
	Message,
	DataItem,
	ItemFormat,
	Timers,
	Config,
	ConnectionMode,
	Connection } = require('./src/hsms')

try {

	const config = Config
		.builder
		.ip( "127.0.0.1" )
		.port( 8000 )
		.device( 12 )
		.mode( ConnectionMode.Passive )
		.timers( new Timers( 20, 30 ) )
		.build();

	const conn = new Connection( config );

	console.log( item.toString() );
}
catch (err) {
	console.log(err);
}


//var builder = DataItem.a( "glass-id", "glass1"  )

// const item = DataItem
// 	.builder
// 	.format(ItemFormat.I2)
// 	.size( 2 )
// 	.value( 12345 )
// 	.size( 3 )
// 	.format( ItemFormat.A )
// 	.size( 10 )
// 	.build()

// TODO: do not forget about chains i2>value>i5>value etc.









console.log("end");