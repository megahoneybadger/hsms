
const Encoder = require('./src/coding/encoder');

const {
	Message,
	DataItem,
	ItemFormat,
	Timers,
	Config } = require('./src/hsms')

try {
	var timers = new Timers( 10, 43, 123243, () => 123 );

	console.log( timers.toString() );
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