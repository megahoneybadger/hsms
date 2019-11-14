
const Encoder = require('./src/coding/encoder');

const {
	Message,
	DataItem,
	DataMessage,
	ItemFormat,
	Timers,
	Config,
	ConnectionMode,
	Connection } = require('./src/hsms')

try {

	// let m = DataMessage
	// 	.builder
	// 	.device( 1 )
	// 	.stream( 1 )
	// 	.context( 7895654 )
	// 	.replyExpected( false )
	// 	.func( 1 )
	// 	.items(
	// 		DataItem.i1( "", 78 ),
	// 		DataItem.i1( "", 1, 6, 9 ),
	// 		DataItem.i1( "", [ 12, 99 ] )) 
	// 	.build();

	// const encodedArray = Encoder.encode(m);
	// console.log( encodedArray );

	const config = Config
		.builder
		.ip( "127.0.0.1" )
		.port( 7000 )
		.device( 12 )
		.mode( ConnectionMode.Active )
		.timers( new Timers( 1, 1, 1, 2, 2, 1 ) )
		.build();

	const conn = new Connection( config );
	conn.debug = {
		//doNotSendSelect: true
		//doNotSendLinkTestRsp: true
	};

	conn
  .on( "dropped", () => console.log( `connection has been dropped` ) )
  .on( "error", ( err ) => console.log( `encountered error: ${err}` ) )
  .on( "established", ( r ) =>{
		console.log( `established selected connection [${r.ip}:${r.port}]` );
		
		//conn.send( m );
	})
	
	conn.start();


			
	
}
catch (err) {
	console.log(err);
}

console.log("end");