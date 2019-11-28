
const Encoder = require('./src/coding/encoder');

const {
	Message,
	DataItem,
	DataMessage,
	DeselectReq,
	ItemFormat,
	Timers,
	Config,
	ConnectionMode,
	Connection } = require('./src/hsms')

try {


	let m = DataMessage
		.builder
		.device(1)
		.stream(1)
		.context(98126)
		.replyExpected(false)
		.func(1)
		.items(
			//DataItem.u8( "", 16981289037889134 ),
			DataItem.i8( "", 8007199254740991, 32178918723, -7891273712836 ),
		
		
		)
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
	conn.debug = {
		//doNotSendSelect: true
		//doNotSendLinkTestRsp: true
	};

	var index = 0;

	conn
		.on("dropped", () => {
			console.log(`connection has been dropped`);
		})
		.on("error", (err) => console.log(`encountered error: ${err}`))
		.on("established", (r) => {
			//conn.send(m);

			conn.send( new DeselectReq( ) );
		})
		.on("recv", (m) => {
			console.log(`recv [${m.toString()}]`);
		})



	// const server = new Connection(Config
	// 	.builder
	// 	.ip("127.0.0.1")
	// 	.port(7000)
	// 	.device(12)
	// 	.mode(ConnectionMode.Passive)
	// 	.timers(new Timers(1, 1, 1, 2, 2, 0))
	// 	.build());

	// server.start();
	conn.start();



}
catch (err) {
	console.log(err);
}

console.log("end");
