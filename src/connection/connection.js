const validator = require('./../utils/validation-helper')
const ConnectionState = require('./connection-state')
const ConnectionMode = require('./connection-mode')
const Timers = require('./timers')
const Config = require('./config')
const EventEmitter = require('events').EventEmitter;
const net = require('net');
const Message = require('../messages/message');
const SelectReq = require('../messages/control/select-req');
const SelectRsp = require('../messages/control/select-rsp');
const LinkTestReq = require('../messages/control/link-test-req');
const LinkTestRsp = require('../messages/control/link-test-rsp');
const RejectReq = require('../messages/control/reject-req');
const SeparateReq = require('../messages/control/separate-req');
const Encoder = require('../coding/encoder')
const Decoder = require('../coding/decoder')

const moment = require("moment");
const ByteBuffer = require('bytebuffer')

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

			props(this).run = false;

			props(this).config = cp;

			props(this).trx = new Map();

			props(this).state = ConnectionState.notConnected;

			resetRecv.call(this);


		}

		/**
		 * Activates connection:
		 * - in active mode starts connecting to a remote entity
		 * - in passive mode starts listening for incoming connections
		 */
		start() {
			if (props(this).run) {
				return;
			}

			props(this).run = true;

			setImmediate(() => {
				if (this.mode == ConnectionMode.Active) {
					connect.call(this);
				} else {
					listen.call(this);
				}
			});

			console.log( `started [${this.mode}]` );
		}

		/**
		 * Deactivates connection and close the socket.
		 */
		stop() {
			if (!props(this).run) {
				return;
			}

			props(this).run = false;

			this.send( new SeparateReq( 0 ) );

			console.log( `stopped [${this.mode}]` );

			close.call(this)
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
				let buffer = Encoder.encode(m);
				let socket = props(this).client;

				if (socket && buffer) {
					//console.log(`sending ${m.toString()}`);

					if (m.isReplyRequired) {
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

		console.log( "connecting" );

		// Create a new client socket.
		props(this).client = new net.Socket();

		// In case of errors clean all resources and try to reconnect.
		props(this).client.on('error', e => close.call(this));

		// When recv data from a remote entity 
		props(this).client.on('data', d => onRecv.call(this, d));

		// Start connection attempt
		props(this).client.connect(this.port, this.ip, () => {
			props(this).state = ConnectionState.connectedNotSelected;

			if (props(this).t5) {
				// Connection Separation Timeout. Specifies the amount of time which must
				// elapse between successive attempts to connect to a given remote entity.
				// Connection established and we do not need the timeout anymore
				clearTimeout(props(this).t5);
			}

			// Time which a TCP/IP connection can remain in NOT SELECTED state
			// (i.e., no HSMS activity) before it is considered a communications failure.
			// Send 'select request' and begin waiting for the response.
			props(this).t7 = setTimeout(() => onT7Expired.call(this), this.timers.t7 * 1000);

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
   * Handles connection of a remote client.
   * @param  {} client
   * Client socket.
   */
  function onClientConnected( client ){
    if( !props(this).run )
      return;

    props(this).client = client;

    // stop listening for another clients
    props(this).server.close();

    props(this).client.on( 'error', (e) => close.call(this));

    props(this).client.on('data', (d) => onRecv.call(this, d));

    props(this).state = ConnectionState.connectedNotSelected;

    // Time which a TCP/IP connection can remain in NOT
    // SELECTED state (i.e., no HSMS activity) before it is
    // considered a communications failure.
    props(this).t7 = setTimeout(() => onT7Expired.call(this), 1000 * this.timers.t7);
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

	/**
 * Receives data from remote entity.
 * @param  {} data Input binary buffer.
 */
	function onRecv(data) {
		try {
			// After recv next chunk of data stop t8 timer
			if (props(this).t8) {
				clearTimeout(props(this).t8);
			}

			let recv = props(this).recv;

			// data may contain more or less data than needed to construct current message
			let toReadNow = 0;

			// used when we read begining of the message, otherwise 0 
			let headerLen = 0;

			if (0 == recv.messageLength) {
				// when recv first chunk of a long message read its size
				recv.messageLength = ByteBuffer.wrap(data).readUint32();

				// data may contain more or less data than needed to construct current message
				toReadNow = Math.min(data.length - 4, recv.messageLength);
				headerLen = 4;

				recv.buffur = ByteBuffer.wrap(data.slice(headerLen, headerLen + toReadNow));
				recv.count = 0;
			} else {
				// data may contain more or less data than needed to construct current message
				toReadNow = Math.min(data.length, recv.messageLength - recv.count);

				// append tail to existing buffer if message is too big for a single event
				recv.buffur = recv.buffur.append(data.slice(0, toReadNow), recv.count);
			}

			// keep tracking how much data already has been recv
			recv.count += toReadNow;

			if (recv.messageLength == recv.count) {
				// if read the whole message and ready to construct it

				// build message from its binary buffer
				let m = Decoder.decode(recv.buffur);

				setImmediate(() => this.emit("recv", m));

				handleRecv.call(this, m);

				// get ready for the next message: reset buffur and counters
				resetRecv.call(this);

				if (data.length != toReadNow + headerLen) {
					// if data contains header of another/next message restart the procedure // setNextTick ??
					onRecv(data.slice(headerLen + toReadNow));
				}
			} else {
				// if message is too long start t8 timeout for the next chunk.
				// if timeout expires earlier than we get the next chunk -> disconnection.
				props(this).t8 = setTimeout(() => onT8Expired.call(this), 1000 * this.timers.t8);
			}
		}
		catch (err) {
			setImmediate(() => this.emit("error", err));

			// if anything happens reset recv buffer and disconnect 
			close.call(this);
		}

	}

	/**
 * Handles recv message: checks logical validity, closes open transactons etc. 
 * @param  {} m 
 * Incoming message
 */
	function handleRecv(m) {
		try {

			// Always check 'selected' status:
			// first recv message must be SelectReq|Rsp depending on current mode.
			// This check can cause disconnection.
			checkSelect.call(this, m);

			switch (m.kind) {
				case Message.Type.SelectReq:
					handleSelectReq.call(this, m);
					break;

				case Message.Type.SelectRsp:
					handleSelectRsp.call(this, m);
					break;

				case Message.Type.DeselectReq:
					handleDeselectReq.call(this, m);
					break;

				case Message.Type.DeselectRsp:
					handleDeselectRsp.call(this, m);
					break;

				case Message.Type.LinkTestReq:
					this.send(new LinkTestRsp(m.context));
					break;

				case Message.Type.LinkTestRsp:
					handleLinkTestRsp.call(this, m);
					break;

				case Message.Type.DataMessage:
					handleDataMessage.call(this, m);
					break;

				case Message.Type.SeparateReq:
					close.call( this );
					break;

				case Message.Type.RejectReq:
					break;
			}
		}

		finally {
			closeTrx.call(this, m);
		}
	}

	/**
 * Inspects whether first recv message 
 * (when connection is 'not selected') is SelectReq|Rsp
 * @param  {} m
 * Message to inspect.
 */
	function checkSelect(m) {
		// if( ConnectionState.connectedNotSelected !== props(this).state ) 
		//   return;

		// let bShouldCloseConnection =
		//   ( this.Mode == ConfigParams.Mode.Active && m.kind() != Message.Type.SelectRsp) ||
		//   ( this.Mode == ConfigParams.Mode.Passive && m.kind() != Message.Type.SelectReq );

		// if (bShouldCloseConnection) {
		//   throw new TypeError("expected selected message")
		// }
	}

	  /**
   * Handles select request.
   * @param  {} m
	 *  Incoming message.
   */
  function handleSelectReq( m ){
    if( ConnectionState.connectedSelected === props(this).state ){
      // if connection already entered SELECTED state respond with err code
      this.send( new SelectRsp( m.device, m.context, 1/*already selected*/ ) )
    } else{
      // connection enters SELECTED state
      props(this).state = ConnectionState.connectedSelected;

      // clear NOT-CONNECTED timeout
      clearTimeout(props(this).t7);

      // prepare to send linktest message if it's a nonzero value 
      if( this.timers.linkTest > 0 ) { 
        props(this).linkTest = setTimeout(() =>
          onLinkTestExpired.call(this), 1000 * this.timers.linkTest);
      }

      // send select response with 0 code
      this.send( new SelectRsp( m.device, m.context, 0/*ok*/ ) )

      setImmediate( () => this.emit( "established", {
        ip: props( this ).client.remoteAddress,
        port: props( this ).client.remotePort
      } ) ); 
    }
  }

	/**
   * Handles select response.
   * @param  {} m
	 *  Incoming message.
   */
	function handleSelectRsp(m) {
		let hasOpenTrx = props(this).trx.has(m.context);

		if (!hasOpenTrx) {
			this.send(new RejectReq(m, 3 /*TransactionNotOpen*/));
		}
		else if (0 != m.status) {
			throw new TypeError("bad select.rsp status code");
		} else {
			props(this).state = ConnectionState.connectedSelected;

			clearTimeout(props(this).t7);

			props(this).linkTest = setTimeout(() =>
				onLinkTestExpired.call(this), 1000 * this.timers.linkTest);

			const client = props(this).client;

			setImmediate(() => this.emit("established", {
				ip: client ? client.remoteAddress : undefined,
				port: client ? client.remotePort : undefined,
			}));

			props(this).t36 = setTimeout(() => onT36Expired.call(this), 1000);
		}
		// else if( null == t )
		// {
		// 	Send( new RejectReq( m, RejectReq.Code.TransactionNotOpen ) ); 
		// }
	}

	/**
	 *  Handles link test response.
	 */
	function handleLinkTestRsp() {
    //console.log("handleLinkTestRsp");
  }

	/**
	 *  Fires when t3 or t6 timeout expires.
	*/
	function onT36Expired() {
    if( !props(this).run )
      return;

    try{
      let list = [];
      let now = new moment();
      let commFailure = false;
      let dictTrx = props(this).trx;
      
      const t3 = moment.duration({ seconds: this.timers.t3 }).seconds();
      const t6 = moment.duration({ seconds: this.timers.t6 }).seconds();

      dictTrx.forEach( ( value, key, map ) => {
        let m = value.message;
        var elapsedSecs = moment.duration(now.diff( value.time )).seconds();

        if( Message.Type.DataMessage == m.kind ){
          if( t3 <= elapsedSecs ){
            list.push( value )
          }
        } else {
          if( t6 <= elapsedSecs ){
            commFailure = true;
            list.push( value );
          }
        }
      })

      for( let t of list ){
        dictTrx.delete( t.message.context );
				let tcode = ( Message.Type.DataMessage == t.message.kind ) ? 3 : 6;
				
        setImmediate( () => this.emit( "timeout", tcode, t.message ));

        if( t.message.complete ){
          setImmediate( () => this.emit( "trx-complete", t.message, undefined, tcode ));
        }
      }

      if( commFailure ){
        close.call( this );
      }
     
    }
    finally{
      props(this).t36 = setTimeout( () => onT36Expired.call( this ), 1000 );
    }
  }

	/**
	 * Fires when t8 timeout expires.
	 */
  function onT7Expired() {
    setImmediate( () => this.emit( "timeout", 7 ));
    setImmediate( () => close.call(this) );
	}
	
	/**
	 * Fires when t8 timeout expires.
	 */
	function onT8Expired() {
    setImmediate( () => this.emit( "timeout", 8 ));
    setImmediate( () => close.call( this ) );
  }

	/**
	 * Fires when link test expires.
	 */
  function onLinkTestExpired() {
    if (!props(this).run || this.timers.linkTest == 0 )
      return;

    this.send(new LinkTestReq());

    props(this).linkTest = setTimeout(() =>
      onLinkTestExpired.call(this), 1000 * this.timers.linkTest)
  }

	 /**
   * Closes existing connection and resets internal resources (buffers, timers etc.)
   * If connection is not disposed (run === true) tries to reconnect (in active mode) 
   * or start listening for new clients (in passive mode). 
   */
  function close() {
    // 	Fire( ConnectionEventArgs.Dropped( /*_socket.RemoteEndPoint as IPEndPoint*/null ));
    setImmediate( () => this.emit( "dropped" ));

    if( props(this).client ){
      props(this).client.destroy();
      props(this).client = undefined;
    }

    if( props(this).server ){
      props(this).server.close();
      props(this).server = undefined;
    }
    
    props(this).state = ConnectionState.notConnected;
    props(this).trx.clear();
    resetRecv.call(this);
    

    // var t5FireTime = _bRun ?  _timeouts.T5 * 1000 : Timeout.Infinite;
    //  _timerT5ConnectSeparationTimeout.Change( t5FireTime, Timeout.Infinite );
    if (props(this).run) {
			if( this.mode == ConnectionMode.Passive ){
				// ?! I think we should start listening immediately
				setImmediate( () => listen.call( this ) );
			} else{
				props(this).t5 = setTimeout(() =>
					connect.call( this ), 1000 * this.timers.t5 );
			}
    }

    if (props(this).t36) {
      clearTimeout(props(this).t36);
    }

    if (props(this).t7) {
      clearTimeout(props(this).t7);
    }

    if (props(this).t8) {
      clearTimeout(props(this).t8);
    }

    if (props(this).linkTest) {
      clearTimeout(props(this).linkTest);
    }
	}
	
	/**
   * Closes open transaction.
   * @param  {} m Sent message: connection stores message's context as a transaction key.
   */
  function closeTrx(m) {
    if (m.isPrimary)
      return;

    let t = props(this).trx.get(m.context);

    props(this).trx.delete(m.context);

    let canFireTrxComplete = ( t && t.message.isPrimary );

    let fireCustomComplete = 
      ( canFireTrxComplete ) &&
      ( t.message.complete );

    if( canFireTrxComplete ){
      setImmediate( () => this.emit( "trx-complete", t.message, m ));
    }

    if( fireCustomComplete ){
      setImmediate( () => t.message.complete( t.message, m ) );
    }
  }

	return Connection;
})();
