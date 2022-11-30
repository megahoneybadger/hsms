
const {
	DataItem,
	DataMessage,
	Config,
	Message,
	ConnectionMode,
	Connection, 
	ItemFormat} = require('./src/hsms')

	const item = DataItem
		.builder
		// .size( 123 )
		// .value( false )
		.format( ItemFormat.Bool )
		.value( null )
		.build();

	console.log( item.toString() );

	let m1 = DataMessage
		.builder
		.device( 1 )
		.stream( 1 )
		.func( 71 )
		.replyExpected( true )
		.complete( (m, r, tc) => {
			console.log( `custom message complete handler:` )	
			console.log( `primary message ${m.toLongString()}` )	
			console.log( `reply message ${r.toLongString()}` )	
		} )
		.items(
			DataItem.a( "name", "alice", 10  ),
			DataItem.bool( "funny", true ))
		.build();

	const conn = new Connection(Config
		.builder
		.ip("127.0.0.1")
		.port(8000)
		.mode(ConnectionMode.Active)
		.build());

	// conn
	// 	.on( "recv", m => {
	// 		if( m.kind == Message.Type.DataMessage){
	// 			switch( m.toString() ){
	// 				case "S1F17":
	// 					//console.log( m.toLongString() );

	// 					conn.send( DataMessage
	// 						.builder
	// 						.reply( m )
	// 						.device( 1 )
	// 						.items(
	// 							DataItem.a( "name", "bob", 10  ),
	// 							DataItem.u2( "age", 12 ),
	// 							DataItem.list( "hobbies", 
	// 								DataItem.a( "hobby-1", "basketball", 10  ),
	// 								DataItem.a( "hobby-2", "books", 15  )))
	// 						.build() )
	// 					break;
	// 			}
	// 		}
	// 	} );
	
	// let m1 = DataMessage
	// 	.builder
	// 	.device( 1 )
	// 	.stream( 1 )
	// 	.func( 7 )
	// 	.complete( (m, r, tc) => {
	// 		console.log( `custom message complete handler:` )	
	// 		console.log( `primary message ${m.toLongString()}` )	
	// 		console.log( `reply message ${r.toLongString()}` )	
	// 	} )
	// 	.items(
	// 		//DataItem.a( "name", "alice", 10  ),
	// 		DataItem.bool( "funny", true ))
	// 	.build();


	conn
		.on( "connected", m => {
			console.log( "connected" );
			conn.send( m1 );
		} )
		.on( "timeout", ( c, m ) => {
			console.log( `timeout ${c}` );
			console.log( m.toString() );
		} );
	
	conn.start();