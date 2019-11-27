
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



	let m = DataMessage
		.builder
		.device(1)
		.stream(1)
		.context(98126)
		.replyExpected(false)
		.func(1)
		.items(
			DataItem.u1( "", 16 ),
			DataItem.i1( "", -17 ),
			DataItem.u1( "", 161, 211 ),
			DataItem.i1( "", -123, "-45", [ -113, 11 ] ),
			DataItem.u1( "", 200, "210" ),

			DataItem.u2( "", 28700, "21110" ),
			DataItem.u2( "", 6500 ),

			DataItem.i2( "", -2700, "8541" ),
			DataItem.i2( "", -5124 ),

			DataItem.i4( "", -2147483600, "1147483647" ),
			DataItem.i4( "", -6712645 ),

			DataItem.u4( "", 4294967295, "5321231" ),
			DataItem.u4( "", 4294967267 ),
		
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
			conn.send(m);
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
