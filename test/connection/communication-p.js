var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

const {
	Message,
	Config,
	ConnectionMode,
	ConnectionState,
	Connection,
	Timers,
	Constants,
	DataMessage,
	DataItem } = require('../../src/hsms')

const {
	NoBuilderError,
	TooManyParamsError,
	InvalidEnumValueError,
	InvalidFormatError,
	InvalidContructorArguments } = require('../../src/utils/errors/custom-errors')


function createConnection(active) {
	const config = Config
		.builder
		.ip("127.0.0.1")
		.port(7000)
		.device(12)
		.mode(active ? ConnectionMode.Active : ConnectionMode.Passive)
		.timers(new Timers(1, 1, 1, 1, 2, 1))
		.build();

	return new Connection(config);
}

function createConnection2(active) {
	const config = Config
		.builder
		.ip("127.0.0.1")
		.port(7000)
		.device(12)
		.mode(active ? ConnectionMode.Active : ConnectionMode.Passive)
		.timers(new Timers(2, 1, 1, 1, 2, 10))
		.build();

	return new Connection(config);
}




describe('Communication passive', () => {
	let conn;
	let server;

	before(function () {
		conn = createConnection(true);
		conn.start();
	})

	after(function (done) {
		this.timeout(2000);

		setTimeout(function () {
			conn.stop();
			done();
		}, 1000);
	})

	beforeEach(function () {
		this.timeout(2000);

		server = createConnection(false);
	})

	afterEach(function (done) {
		this.timeout(3000);

		setTimeout(function () {
			server.stop();
			done();
		}, 500);

		delete conn.debug;
	})


	// it('should raise t3 timeout (no data message reply)', function (done) {
	// 	this.timeout(5000);

	// 	let mToSend = DataMessage
	// 		.builder
	// 		.device(1)
	// 		.stream(1)
	// 		.replyExpected(true)
	// 		.func(1)
	// 		.items(
	// 			DataItem.u1("", 17))
	// 		.build();

	// 	server.on("established", (e) => {
	// 		server.send(mToSend);
	// 	})

	// 	server.on("timeout", (t) => {
	// 		if (3 === t) {
	// 			done();
	// 		}
	// 	})

	// 	server.start();
	// });


	// it('should establish connection', function (done) {
	// 	server.on("established", (e) => {
	// 		done();
	// 	})

	// 	server.start();
	// });

	// it('should reconnect 5 times', function (done) {
	// 	this.timeout(10000);
	// 	let dropCount = 0;
	// 	let estCount = 0;

	// 	server.on("established", (e) => {
	// 		//e.should.have.property('ip').equal('127.0.0.1');
	// 		++estCount;

	// 		if (estCount < 5) {
	// 			server.stop();
	// 			server.start();
	// 		} else {
	// 			expect(estCount).to.equal(5);
	// 			expect(dropCount).to.equal(4);
	// 			done();
	// 		}
	// 	})

	// 	server.on("dropped", (e) => {
	// 		++dropCount;
	// 	});

	// 	server.start();
	// });

	// it('should reconnect 3 times and make sure remote entity is alive', function (done) {
	// 	this.timeout(10000);
	// 	let dropCount = 0;
	// 	let estCount = 0;

	// 	server.on("established", (e) => {
	// 		//e.should.have.property('ip').equal('127.0.0.1');
	// 		++estCount;

	// 		if (estCount < 3) {
	// 			server.stop();
	// 			server.start();
	// 		}
	// 	})

	// 	server.on("dropped", (e) => {
	// 		++dropCount;
	// 	});

	// 	server.on("alive", (e) => {
	// 		done();
	// 	});

	// 	server.start();
	// });

	// it('should drop connection #1', function (done) {
	// 	this.timeout(5000);

	// 	server.on("established", (e) => {
	// 		server.stop();
	// 	})

	// 	server.on("dropped", (e) => {
	// 		done();
	// 	});

	// 	server.start();
	// });

	// it('should drop connection #2', function (done) {
	// 	this.timeout(5000);

	// 	server.on("established", (e) => {
	// 		setTimeout(() => server.stop(), 1000);
	// 	})

	// 	server.on("dropped", (e) => {
	// 		done();
	// 	});

	// 	server.start();
	// });

	// it('should establish physical connection but not selected', function (done) {
	// 	this.timeout(5000);

	// 	server.on("timeout", (t, m) => {
	// 		if (7 === t) {
	// 			done();
	// 		}
	// 	})

	// 	conn.debug = {
	// 		doNotSendSelectReq: true
	// 	};

	// 	server.start();
	// });

	// it('should establish connection after a few attempts (recv t7)', function (done) {
	// 	this.timeout(10000);

	// 	var index = 0;

	// 	server.on("timeout", (t, m) => {
	// 		if (7 === t) {
	// 			++index;
	// 			console.log("got t7");
	// 		}

	// 		if (index > 3) {
	// 			delete conn.debug;
	// 		}
	// 	})

	// 	server.on("established", (e) => {
	// 		done();
	// 	})

	// 	conn.debug = {
	// 		doNotSendSelectReq: true
	// 	};

	// 	server.start();
	// });

	// it('should send link test req but do not recv reply (t6)', function (done) {
	// 	this.timeout(5000);

	// 	server.on("timeout", (t, m) => {
	// 		if (6 === t) {
	// 			done();
	// 		}
	// 	})

	// 	conn.debug = {
	// 		doNotSendLinkTestRsp: true
	// 	};

	// 	server.start();
	// });

	// it('should send link test req but do not recv reply for a few times (t6)', function (done) {
	// 	this.timeout(30000);

	// 	var index = 0;

	// 	server.on("timeout", (t, m) => {
	// 		if (6 === t) {
	// 			++index;
	// 			console.log("got t6");
	// 		}

	// 		if (index > 2) {
	// 			index = 0
	// 			delete conn.debug;
	// 		}
	// 	})

	// 	server.on("alive", (m) => {
	// 		++index;

	// 		if (index > 2) {
	// 			done()
	// 		}
	// 	});

	// 	conn.debug = {
	// 		doNotSendLinkTestRsp: true
	// 	};

	// 	server.start();
	// });



	// it('remote entity should recv our data message (does not expect a reply)', function (done) {
	// 	let mToSend = createDataMessage( 1, 1, 1, false, u1() )

	// 	server.on("established", (e) => {
	// 		console.log("client connected to the server")
	// 		server.send(mToSend);
	// 	})

	// 	conn.on("recv", mRecv => {
	// 		console.log(`client recv the message: ${mRecv.toString()}`);

	// 		if (mRecv.kind == Message.Type.DataMessage) {
	// 			// console.log(JSON.stringify(mToSend));
	// 			// console.log(JSON.stringify(mRecv));
	// 			// TODO
	// 			if (mRecv.equals(mToSend)) {
	// 				done();
	// 			}

	// 		}
	// 	})

	// 	server.start();

	// });

	it('remote entity should recv list of our data messages (server->conn) (does not expect a reply)', function (done) {
		this.timeout( 5000 );

		//let mToSend = createDataMessage( 1, 1, 1, false, u1() )
		let messages = [ ...createDataMessageList( 50 )]

		server.on("established", (e) => {
			console.log("client connected to the server")

			messages.forEach( x => server.send(x) );
		})

		let index = 0

		conn.on("recv", mRecv => {
			//console.log(`client recv the message: ${mRecv.toString()}`);

			if (mRecv.kind == Message.Type.DataMessage) {
				// console.log(JSON.stringify(messages[ index ]));
				// console.log(JSON.stringify(mRecv));
				
				// TODO
				if (mRecv.equals(messages[ index ])) {
					++index;

					if( index == messages.length ){
						done();
					}
				}

			}
		})

		server.start();

	});

	it('remote entity should recv list of our data messages (conn->server) (does not expect a reply)', function (done) {
		this.timeout( 5000 );

		//let mToSend = createDataMessage( 1, 1, 1, false, u1() )
		let messages = [ ...createDataMessageList( 50 )]

		conn.on("established", (e) => {
			console.log("connected to the server")

			messages.forEach( x => conn.send(x) );
		})

		let index = 0

		server.on("recv", mRecv => {
			//console.log(`server recv the message: ${mRecv.toString()}`);

			if (mRecv.kind == Message.Type.DataMessage) {
				// console.log(JSON.stringify(messages[ index ]));
				// console.log(JSON.stringify(mRecv));
				
				// TODO
				if (mRecv.equals(messages[ index ])) {
					++index;

					if( index == messages.length ){
						done();
					}
				}

			}
		})

		server.start();

	});

	it('remote entity should recv list of our data messages with small delays (server->conn) (does not expect a reply)', function (done) {
		
		this.timeout( 5000 );
		//let mToSend = createDataMessage( 1, 1, 1, false, u1() )
		let messages = [ ...createDataMessageList( 100 )]

		server.on("established", (e) => {
			console.log("client connected to the server")

			setTimeout(() => messages.forEach( x => server.send(x) ), getRandomInt( 100, 300 ));
			
		})

		let index = 0

		conn.on("recv", mRecv => {
			//console.log(`client recv the message: ${mRecv.toString()}`);

			if (mRecv.kind == Message.Type.DataMessage) {
				// console.log(JSON.stringify(messages[ index ]));
				// console.log(JSON.stringify(mRecv));
				
				// TODO
				if (mRecv.equals(messages[ index ])) {
					++index;

					if( index == messages.length ){
						done();
					}
				}

			}
		})

		server.start();

	});

	it('remote entity should recv list of our data messages with small delays (conn->server) (does not expect a reply)', function (done) {
		
		this.timeout( 5000 );
		//let mToSend = createDataMessage( 1, 1, 1, false, u1() )
		let messages = [ ...createDataMessageList( 100 )]

		conn.on("established", (e) => {
			console.log("connected to the server")

			setTimeout(() => messages.forEach( x => conn.send(x) ), getRandomInt( 100, 300 ));
			
		})

		let index = 0

		server.on("recv", mRecv => {
			//console.log(`client recv the message: ${mRecv.toString()}`);

			if (mRecv.kind == Message.Type.DataMessage) {
				// console.log(JSON.stringify(messages[ index ]));
				// console.log(JSON.stringify(mRecv));
				
				// TODO
				if (mRecv.equals(messages[ index ])) {
					++index;

					if( index == messages.length ){
						done();
					}
				}

			}
		})

		server.start();

	});

	// it('should not recv a reply from a remote entity (expect a reply but recv t3)', function (done) {
	// 	this.timeout(5000);

	// 	let mToSend = DataMessage
	// 		.builder
	// 		.device(18)
	// 		.stream(11)
	// 		.replyExpected(true)
	// 		.func(17)
	// 		.items(
	// 			DataItem.u1("temperature", 16))
	// 		.build();

	// 	server.on("established", (e) => {
	// 		server.send(mToSend);
	// 	})

	// 	server.on("timeout", (t, m) => {
	// 		if (3 === t) {
	// 			done();
	// 		}
	// 	})

	// 	server.start();
	// });





});

function createDataMessage(d, s, f, re, ...items) {
	return DataMessage
		.builder
		.device(s)
		.stream(s)
		.replyExpected(re)
		.func(f)
		.context( getRandomInt( 0, Constants.MAX_UINT ) )
		.items(
			...items)
		.build();
}

function createDataMessageList(count) {
	var arr = [];

	for( var i = 0; i < count; ++i ){

		var d = getRandomUInt( 100 );
		var s = getRandomUInt( 100 );
		s = ( 0 == s ) ? 1 : s;

		var f = getRandomInt( 1, 100 );
		f+= ( f%2 == 0 ? 1 : 0 );

		var itemCount = getRandomInt( 1, 100 );

		//console.log( `${d} ${s} ${f} ${itemCount}` )

		arr.push( createDataMessage( 1, s, f, false, ...createRandomItems( itemCount ) ) )
	}

	return arr;
}

function createRandomItems(count){
	let arr = [];

	//count = 10;

	for( var i = 0; i < count; ++i ){
		switch( getRandomUInt( 9 ) ){
			case 0:
				arr.push( u1() );
				break;

			case 1:
				arr.push( i1() );
				break;

			case 2:
				arr.push( i2() );
				break;

			case 3:
				arr.push( u2() );
				break;

			case 4:
				arr.push( i4() );
				break;

			case 5:
				arr.push( u4() );
				break;

			case 6:
				arr.push( i8() );
				break;
	
			case 7:
				arr.push( u8() );
				break;


			case 8:
				arr.push( a() );
				break

		}

	}

	

	

	return arr;
}

function u1() {
	return DataItem.u1("", getRandomInt( 0, Constants.MAX_UBYTE));
}

function u2() {
	return DataItem.u2("", getRandomInt( 0, Constants.MAX_USHORT));
}

function u4() {
	return DataItem.u4("", getRandomInt( 0, Constants.MAX_UINT));
}

function u8() {
	return DataItem.u8("", getRandomInt( 0, Constants.MAX_ULONG));
}

function i1() {
	return DataItem.i1("", getRandomInt(Constants.MIN_BYTE, Constants.MAX_BYTE));
}

function i2() {
	return DataItem.i2("", getRandomInt(Constants.MIN_SHORT, Constants.MAX_SHORT));
}


function i4() {
	return DataItem.i4("", getRandomInt(Constants.MIN_INT, Constants.MAX_INT));
}

function i8() {
	return DataItem.i8("", getRandomInt(Constants.MIN_LONG, Constants.MAX_LONG));
}

function a() {
	const max = 300;
	const min = 0;

	const s = getRandomString( getRandomArbitrary( min, max ) );

	const len = getRandomArbitrary( min, max );

	//console.log( "create a: " + len );

	return DataItem.a("", s, len );
}


function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

function getRandomUInt( max ) {
  return getRandomInt(0, max)
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getRandomString(length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		 result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}