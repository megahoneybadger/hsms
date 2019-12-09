
const Encoder = require('./src/coding/encoder');

const {
	Message,
	DataItem,
	DataMessage,
	DeselectReq,
	DeselectRsp,
	SelectReq,
	RejectReq,
	SelectRsp,
	
	LinkTestRsp,
	ItemFormat,
	SeparateReq,
	Timers,
	Config,
	ConnectionMode,
	Connection } = require('./src/hsms')

	//https://zellwk.com/blog/publish-to-npm/

	const { 
		
		ExpectedSelectReqError } = require( './src/utils/errors/custom-errors' )

try {
	const a1 = DataItem.a( "item-name-9", "very long string", 5 );
	const a2 = DataItem.a( "item-name-10", "short", 10 );
	

	console.log( a1.toString() );
	console.log( a1.name );
	console.log( a1.format );
	console.log( a1.value );
	console.log( a1.size );

	console.log( a2.toString() );
	console.log( a2.name );
	console.log( a2.format );
	console.log( a2.value );
	console.log( a2.size );

	var list = DataItem.list( "list-1",
		DataItem.a( "item-name-9", "very long string", 5 ),
		DataItem.i2( "item-name-3", 12  ),
		DataItem.list( "child-1",
			DataItem.u2( "age", 12  ),
			DataItem.a( "name", "John Smith", 30  ) )
	 );

	 console.log( list.toString() );
	 console.log( list.name );
	 console.log( list.format );
	 console.log( list.value );
	 

	const item = DataItem
		.builder
		.format( ItemFormat.List )
		.size( 123 )
		.value( 
			DataItem.f4( "temp", 12.1  ),
			DataItem.f8( "hum", 0.137289, 432.32 ),
		)
		.build();



	let m = DataMessage
		.builder
		.device( 1 )
		.stream( 12 )
		.replyExpected( true )
		.func( 15 )
		.context( 98654126 )
		.items(
			// DataItem.f4( "temp", 12.1  ),
			// DataItem.f8( "temp", 14.53  ),
			item ) 
		.build();

	// const encodedArray = Encoder.encode(m);
	// console.log( encodedArray );

	

	const config = Config
		.builder
		//.ip("192.168.154.1")
		.ip("127.0.0.1")
		.port(7000)
		//.device(1)
		.mode(ConnectionMode.Active)
		.timers(new Timers(1, 1, 1, 2, 2, 0))
		.build();

	const conn = new Connection(config);
	// conn.debug = {
	// 	doNotSendSelectReq: true
	// };

	var index = 0;

	conn
		.on("established", p  => console.log( `connection established: ${p.ip}:${p.port}` ))
		.on("dropped", () => console.log(`connection dropped`))
		.on("recv", m => console.log( m.toString() ))
		.on("timeout", (t, m) => console.log( `t${t}` ) );

	//setTimeout( () => , 200 );


	const server = new Connection(Config
		.builder
		.ip("127.0.0.1")
		.port(7000)
		.device(12)
		.mode(ConnectionMode.Passive)
		.timers(new Timers(1, 1, 1, 12, 2, 0))
		.build());

	server
		.on("established", () => {
			setTimeout( () => server.send( m ), 1000);
		} )
		.on("dropped", () => {
			console.log(`server connection has been dropped`);
		})
		.on("recv", (m) => {
			console.log(`s recv [${m.toString()}]`);
		})

	server.start();
	conn.start();



}
catch (err) {
	console.log(err);
}



