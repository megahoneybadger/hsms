
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

	var x = 128 & 139;
	
	let m = DataMessage
		.builder
		.device( 1 )
		.stream( 1 )
		.context( 76122 )
		.replyExpected( false )
		.func( 1 )
		.items(
			DataItem.u1( "", 16 ),
			DataItem.i1( "", -17 ),
			DataItem.u1( "", 161, 211 ),
			DataItem.i1( "", -123, "-45", [ -113, 11 ] ),
			DataItem.u1( "", 200, "210" ),
			// DataItem.u1( "", 124, 8, 221, 7, "11", 0 ),
			// DataItem.u1( "", [193, "16" ] )
			 ) 
		.build();

	// const encodedArray = Encoder.encode(m);
	// console.log( encodedArray );

	const config = Config
		.builder
		.ip( "127.0.0.1" )
		.port( 7000 )
		.device( 12 )
		.mode( ConnectionMode.Active )
		.timers( new Timers( 1, 1, 1, 2, 2, 0 ) )
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
		
		conn.send( m );
	})
	.on( "recv", ( m ) => {
    console.log( `recv [${m.toString()}]` );
  })
	
	conn.start();

	


			
	
}
catch (err) {
	console.log(err);
}

console.log("end");