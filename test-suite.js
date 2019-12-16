
const {
	DataItem,
	DataMessage,
	Config,
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
	.on("recv", m => console.log( m.toLongString() ))
	.on("timeout", (t, m) => console.log( `t${t}` ) );

let m = DataMessage
	.builder
	.device( 1 )
	.stream( 5 )
	.replyExpected( false)
	.func( 1 )
	.items(
		DataItem.f4( "temperature", 12.1  ),
		DataItem.f8( "pressure", 14.53  ),
		DataItem.a( "description", "this is a long sensor description", 50  )) 
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



