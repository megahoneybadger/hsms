
const {
	DataItem,
	DataMessage,
	Config,
	Message,
	ConnectionMode,
	Connection } = require('./src/hsms')

	const m1 = DataMessage
			.builder
			.device( 112 )
			.context( 223 )
			.stream( 33 )
			.complete( () => console.log( "complete handler" ) )
			.func( 44 )
			.description( "test1" )
			.build();


	const conn = new Connection(Config
		.builder
		.ip("127.0.0.1")
		.port(7000)
		.mode(ConnectionMode.Active)
		.build());
	
	conn
		.on( "recv", m => {
			if( m.kind == Message.Type.DataMessage){
				switch( m.toString() ){
					case "S1F1":
						conn.send( DataMessage
							.builder
							.reply( m )
							.items(
								DataItem.a( "name", "bob", 10  ),
								DataItem.u2( "age", 12 ),
								DataItem.list( "hobbies", 
									DataItem.a( "hobby-1", "basketball", 10  ),
									DataItem.a( "hobby-2", "books", 15  )))
							.build() )
						break;
				}
			}
		} );
	
	let m = DataMessage
		.builder
		.device( 1 )
		.stream( 1 )
		.func( 1 )
		.complete( (m, r, tc) => {
			console.log( `custom message complete handler:` )	
			console.log( `primary message ${m.toLongString()}` )	
			console.log( `reply message ${r.toLongString()}` )	
		} )
		.items(
			DataItem.a( "name", "alice", 10  ),
			DataItem.u2( "age", 10 ))
		.build();
	
	const server = new Connection(Config
		.builder
		.ip("127.0.0.1")
		.port(7000)
		.mode(ConnectionMode.Passive)
		.build());
	
	server
		.on("established", p  => server.send( m ));
	
	server.start();
	conn.start();