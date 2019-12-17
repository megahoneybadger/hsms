
const {
	DataItem,
	DataMessage,
	Config,
	Message,
	ConnectionMode,
	Connection } = require('./src/hsms')

const conn = new Connection(Config
	.builder
	.ip("127.0.0.1")
	.port(7000)
	.mode(ConnectionMode.Active)
	.build());

conn
	.on("established", p  => console.log( `connection established: ${p.ip}:${p.port}` ))
	.on("dropped", () => console.log(`connection dropped`))
	.on("timeout", (t, m) => console.log( `client t${t}` ) )
	.on( "recv", m => {
		if( m.kind == Message.Type.DataMessage){
			console.log( `client recv ${m.toLongString()}` );

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
	.on("established", p  => server.send( m ))
	.on("timeout", (t, m) => console.log( `server t${t}` ) )
	.on( "recv", m => {
		if( m.kind == Message.Type.DataMessage){
			console.log( `server recv ${m.toLongString()}` );
		}
	} );

	

server.start();
conn.start();



