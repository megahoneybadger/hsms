
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

	const { 
		
		ExpectedSelectReqError } = require( './src/utils/errors/custom-errors' )

try {

	const item = DataItem
		.builder
		.format( ItemFormat.F4 )
		.value(  '0x23' )
		
		.build();

	let m = DataMessage
		.builder
		.device( 1 )
		.stream( 12 )
		.replyExpected( true )
		.func( 15 )
		.context( 98654126 )
		.items(
			DataItem.f4( "temp", 87.0987, 12.345, 54.56781 )) 
		.build();

	// const encodedArray = Encoder.encode(m);
	// console.log( encodedArray );

	const config = Config
		.builder
		.ip("192.168.154.1")
		//.ip("127.0.0.1")
		.port(7000)
		.device(1)
		.mode(ConnectionMode.Active)
		.timers(new Timers(1, 1, 1, 2, 2, 0))
		.build();

	const conn = new Connection(config);
	// conn.debug = {
	// 	doNotSendSelectReq: true
	// };

	var index = 0;

	conn
		.on("dropped", () => {
			console.log(`client connection has been dropped`);
		})
		// .on( "connected", ( p ) => {
		// 	console.log( `connected: ${p.ip}:${p.port}` );
		// 	conn.send( m )
		// } )
		.on("error", (err) => console.log(`encountered error: ${err}`))
		.on("established", (r) => {
			conn.send(m);
			//console.log( "connection established" )

			//conn.send(new DeselectRsp());
		})
		.on("recv", (m) => {
			console.log(`recv [${m.toString()}]`);
		})
		.on( "timeout", t => console.log( `timeout t${t}` ) );

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
		.on("dropped", () => {
			console.log(`server connection has been dropped`);
		})

	//server.start();
	conn.start();



}
catch (err) {
	console.log(err);
}

console.log("end");
