const validator = require('./../utils/validation-helper')
const ConnectionState = require('./connection-state')
const Timers = require('./timers')
const Config = require('./config')
const EventEmitter = require('events').EventEmitter;

module.exports = (function () {

	// keep internal properties private
	let _private = new WeakMap();

	const props = (key) => {
		// Initialize if not created
		if (!_private.has(key)) {
			_private.set(key, {});
		}
		// Return private properties object
		return _private.get(key);
	};

  /**
	 * Represents a communication layer for conversation with remote entities.
	*/
	class Connection extends EventEmitter {
		constructor(cp) {
			super();

			if (validator.isUndefined(cp) || !(cp instanceof Config)) {
				throw new TypeError("Cannot construct [Connection] instances without config params");
			}

			let port = cp.port;
			let ip = cp.ip;
			let device = cp.device;
			let mode = cp.mode;

			let t = cp.timers;
			let timers = new Timers(t.t3, t.t5, t.t6, t.t7, t.t8, t.linkTest);

			Object.defineProperty(this, "port", {
				get: function () { return port; },
				enumerable: true,
				configurable: false,
			});

			Object.defineProperty(this, "ip", {
				get: function () { return ip; },
				enumerable: true,
				configurable: false,
			});

			Object.defineProperty(this, "device", {
				get: function () { return device; },
				enumerable: true,
				configurable: false,
			});

			Object.defineProperty(this, "mode", {
				get: function () { return mode; },
				enumerable: true,
				configurable: false,
			});

			Object.defineProperty(this, "timers", {
				get: function () { return timers; },
				enumerable: true,
				configurable: false,
			});

			props(this).run = true;

			props(this).config = cp;

			props(this).trx = new Map();

			props(this).state = ConnectionState.notConnected;

			resetRecv.call(this);

			// setImmediate(() => {
			//   if( this.mode == ConfigParams.Mode.Active ){
			//     connect.call( this );
			//   } else{
			//     listen.call( this );
			//   }});
		}


		/**
		* Sends message to the remoty entity.
		* @param  {} m Message to send.
		*/
		send(m) {
			if (!(m instanceof Message)) {
				TypeError("Argument must be of type [Message]");
			}

			try {
				// if( null != dm && !dm.IsPrimary && dm.Handled )
				// 		return;

				// 	if( m.DeviceId != ushort.MaxValue ) 
				// 	{
				// 		m.DeviceId = _deviceId;
				// 	}

				let buffer = m.encode();
				let socket = props(this).client;

				if (typeof socket != undefined && null != socket && null != buffer) {
					//console.log(`sending ${m.toString()}`);

					if (m.isReplyRequired()) {
						props(this).trx.set(m.context, {
							time: new moment(),
							message: m
						});
					}

					socket.write(buffer);

					setImmediate(() => this.emit("send", m));
				}
			}
			catch (err) {
				console.log(err);
				close.call(this)
			}
		}
	}

	/**
	 *  Tries to establish connection with a remote entity.
	 */
	function connect() {
		if (!props(this).run)
			return;

		// Create a new client socket.
		props(this).client = new net.Socket();

		// In case of errors clean all resources and try to reconnect
		props(this).on('error', (e) => close.call(this));

		// When recv data from a remote entity 
		props(this).on('data', (d) => onRecv.call(this, d));

		props(this).log("connecting...");

		// Start connection attempt
		props(this).client.connect(this.port, this.ip, () => {
			console.log('connected');

			props(this).state = Connection.State.connectedNotSelected;

			if (props(this).t5) {
				// Connection Separation Timeout. Specifies the amount of time which must
				// elapse between successive attempts to connect to a given remote entity.
				// Connection established and we do not need the timeout anymore
				clearTimeout(props(this).t5);
			}

			// Time which a TCP/IP connection can remain in NOT SELECTED state
			// (i.e., no HSMS activity) before it is considered a communications failure.
			// Send 'select request' and begin waiting for the response.
			props(this).t7 = setTimeout(() => onT7Expired.call(this), this.timers.t7);

			this.send(new SelectReq());
		});
	}

	/**
   * Starts listening for remote connections at local entity.
   */
	function listen() {
		if (!props(this).run)
			return;

		let server = new net.Server();
		props(this).server = server;

		server.on('error', (e) => {
			console.log(`server socket error: ${e}`);
			close.call(this)
		});

		server.on('listening', (e) => console.log("listening"));

		server.on('connection', c => onClientConnected.call(this, c));

		server.listen(this.port, this.ip);
	}

	/**
   * Prepares recv block for the next message: resets buffer and counters.
   */
	function resetRecv() {
		props(this).recv = {
			messageLength: 0,
			count: 0,
			buffer: undefined
		}
	}

	return Connection;
})();