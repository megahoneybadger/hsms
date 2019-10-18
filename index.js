
const Encoder = require('./src/coding/encoder');

const {
	Message,
	DataItem,
	ItemFormat,
	Config } = require('./src/hsms')

//var builder = DataItem.a( "glass-id", "glass1"  )



let item

try {
	item =  DataItem
	.builder
	.format( ItemFormat.A )
	.size( 5 )
	.value( [undefined] )
	.build();

}
catch (err) {
	console.log(err);
}


// TODO: do not forget about chains i2>value>i5>value etc.









console.log("end");