

![](https://www.semi.org/themes/custom/semi/logo.svg)

[![Build Status](https://api.travis-ci.com/megahoneybadger/hsms.svg?branch=master)](https://travis-ci.com/megahoneybadger/hsms) [![Coverage Status](https://coveralls.io/repos/github/megahoneybadger/hsms/badge.svg?branch=master)](https://coveralls.io/github/megahoneybadger/hsms?branch=master)


#### What is HSMS ?
SEMI E37 High-Speed SECS Message Services (HSMS) is the primary SEMI SECS/GEM transport protocol standard used. HSMS defines a TCP/IP based Ethernet connection used by GEM for host/equipment communication. It is intended as an alternative to SEMI E4 (SECS-I) for applications where higher speed communication is needed and the facilitated hardware setup is convenient.

#### What HSMS Driver Can Do ?
The driver can do every that the standard requires: defines message exchange procedures for using the TCP/IP network protocol.

- Establishing a communication link between entities using a TCP/IP connection procedure
- Developing and maintaining the protocol conventions necessary for exchanging SECS messages between entities
- Sending and receiving data using TCP/IP 
- Recognizing error conditions
- Ending communications formally to confirm both parties no longer need the TCP/IP connection
- Breaking the communications link logically without any physical disconnect from the network medium
- Testing the communications link for the purpose of connection integrity
- Rejecting connection attempts from incompatible subsidiary standards

In addition, the SEMI E37 standard describes special considerations, such as network timeouts, and handling multiple connections, which should be taken into account in a TCP/IP implementation.


#### Getting started
    	
Assuming you’ve already installed [Node.js](https://nodejs.org/), create a directory to hold your application, and make that your working directory.
```sh
$ mkdir my-hsms
$ cd my-hsms
```
Use the  `npm init`  command to create a  `package.json`  file for your application. For more information on how  `package.json`  works, see  [Specifics of npm’s package.json handling](https://docs.npmjs.com/files/package.json).

```sh
$ npm init
```
This command prompts you for a number of things, such as the name and version of your application. For now, you can simply hit RETURN to accept all of them.

Now install HSMS driver in the  `my-hsms`  directory and save it in the dependencies list. For example:

```sh
$ npm i hsms-driver
```
Let's assume that you have a remote HSMS entity waiting for incoming connections (if you do not just follow the instructions below)

Now open index.js file and enter the following code:

	const {
		Config,
		ConnectionMode,
		Connection } = require('hsms-driver')

    const config = Config
    	.builder
    	.ip("192.168.0.1" /*enter the address of a remote HSMS entity*/ ) 
    	.port(7000 /*enter the port it's listening at*/) 
    	.mode(ConnectionMode.Active)
    	.build();
    
    const conn = new Connection(config);
    
	conn
		.on("dropped", () => console.log(`connection dropped`)	)
		.on("established", p => console.log( "connection established" )	)
	
	conn.start();
	
This app is trying to connect to a remote HSMS entity which is listening  at IP 192.168.0.1 on port 7000. After establishing a connection driver raises "established" event.  

In case if you do not have a working HSMS entity you can use a loopback address and two connection objects:

  	const {
		Config,
		ConnectionMode,
		Connection } = require('hsms-driver')
		
    const connA = new Connection(Config
    	.builder
    	.ip("127.0.0.1")
    	.port(7000)
    	.mode(ConnectionMode.Active)
    	.build());
    	
   	const connP = new Connection(Config
    	.builder
    	.ip("127.0.0.1")
    	.port(7000)
    	.mode(ConnectionMode.Passive)
    	.build());
    
	connA 
		.on("dropped", () => console.log(`connection dropped`)	)
		.on("established", p => console.log( "connection established" )	)
    
	connP 
		.on("dropped", () => console.log(`client connected`)	)
		.on("established", p => console.log( "client disconnected" )	)
	
	connA.start();
	connP.start();

In this case the app creates both active and passive connections and make them connect to each other.

#### Usage
The engine of HSMS message exchange is a connection object. In order to create a new connection we should provide proper configuration. 

#### Config
To create a new configuration we should export a config object and set a few required properties.

 	const {
		Config,
		ConnectionMode } = require('hsms-driver')
		
First of all we should specify connection mode: active or passive. The passive mode is used when the local entity listens for and accepts a connect procedure initiated by the remote entity. The active mode is used when the connect  procedure is initiated by the local entity.

Here is the example of the configuration for an active connection:

	Config
		.builder
		.mode(ConnectionMode.Active)
		.ip("127.0.0.1"/*IP of a passive remote entity*/)
		.port(7000 /*port of a passive remote entity*/)
		.build();
And this is for the passive one:

	Config
		.builder
		.mode(ConnectionMode.Passive)
		.ip("127.0.0.1"/*IP a local entity should bind to*/)
		.port(7000 /*port a local entity should listen at*/)
		.build();
		
In addition, we may specify our device code (also known as system bytes):

	Config
		.builder
		// other properties omitted for brevity
		.device(1 /*this number depends on your situation*/)
		.build();
			
The final thing you may want to specify is control timers. The point is HSMS specification uses a set of internal timers to manage its own state machine. We can tune some aspects by setting proper values. 

Export a required object:
	

	const {
		Config,
		ConnectionMode,
		Timers } = require('hsms-driver')
		
and create a new instance the following way (every timeout value is set in seconds):

	Config
		.builder
		// other properties omitted for brevity
		.timers(new Timers(
			1/*t3*/,
			1/*t5*/,
			1/*t6*/,
			12/*t7*/,
			2/*t8*/,
			0/*linked test*/))
		.build()

Here is a brief explanation of of every timer:

 - T3 (Reply timeout)
Reply timeout. Specifies maximum amount of time an entity expecting a reply message will wait for that reply.
 - T5 (Connection Separation Timeout)
Specifies the amount of time which must elapse between successive attempts to connect to a given remote entity.
 - T6 (Control Transaction Timeout)
Specifies the time which a control transaction may remain open before it is considered a communications failure. Similar to t3 but for control messages.
 - T7 (Not Selected Timeout)
Time which a TCP/IP connection can remain in NOT SELECTED state (i.e., no HSMS activity) before it is considered a communications failure.
 - T8 
Maximum time between successive bytes of a single HSMS message which may expire before it is considered a communications failure.
- Linked Test 
Time between link test messages.

If timeout values are not set or timer object is not set itself default timeout values will be used. For example:

	Config
		.builder
		// other properties omitted for brevity
		.timers(new Timers())
		.build()
In this case timeout values will be the following:

|  Timeout | Duration (secs.)  |
| ------------ | ------------ |
|  T3 | 45  |
|  T5 | 10  |
|  T6 | 5    |
|  T7 | 10   |
|  T8 | 5  |
|  LT | 0 (*if value is zero driver does not send link test request)  |


And here is a final sample for connection configuration:

    const {
    	Config,
    	ConnectionMode,
     	Timers } = require('hsms-driver')


	const connActive = Config
		.builder
		.ip("192.168.154.1")
		.port(7000)
		.device(1)
		// timers not set -> driver will use default values
		.mode(ConnectionMode.Active)
		.build());
		
	const connPassive = Config
		.builder
		.ip("192.168.154.1")
		.port(7000)
		// device not set -> driver will use 0
		.timers(new Timers(12, 20, 1, 2, 2, 10))
		.mode(ConnectionMode.Passive)
		.build());
		
#### Connection
The next step is to create a connection object:

	const conn = new Connection(config);

Connection object supports a few events which are important for the message exchange:
- *established*
Physical connection has been established and the driver entered the selected state. This event means that we are ready for HSMS message exchange.
- *dropped*
Connection has been dropped and the driver entered not connected state.
- *recv*
New message has been received.
- *timeout*
Driver fired a control timeout (e.g. connection did not receive a reply).
- *error*
Error occured when handling a message.

Here is the example:

	conn
		.on("established", p  => console.log( `connection established: ${p.ip}:${p.port}` ))
		.on("dropped", () => console.log(`connection dropped`))
		.on("recv", m => console.log(`${m.toString()}`))
		
	
#### Data Items
The main exchange unit within HSMS universe is a message. But every message consists of building blocks called data items. Every data item represents a value (or array of values) and data type. The driver supports the following types:

| Data Type | Description   |
| ------------ | ------------ |
|I1  | 1 byte integer (signed)  |
| I2  |  2 byte integer (signed) |
| I4  | 4 byte integer (signed)  |
| I8  | 8 byte integer (signed)  |
| U1  | 1 byte integer (unsigned)  |
|  U2 | 2 byte integer (unsigned)  |
|  U4 | 4 byte integer (unsigned)  |
|  U8 | 8 byte integer (signed) |
|  F4 |  4 byte floating point |
|  F8 |  8 byte floating point |
|  A | ASCII   |
|  List | list  |

 Every data item has the following properties:

 - **name** 
Gets data item's name.
 - **format**
Gets data item's format.
 - **value**
Gets data item's value. In case or array returns an array of values. In case of a list returns an array of sub data items.
 - **size**
Gets data item's size if exists. Most data items do not support the size: only strings and binary items has this property. If a given string value is shorter than the size it will be padded with spaces and vice versa if it is longer it will be trimmed.

To create a new data item the driver uses a builder pattern. Every data item is an immutable object: all properties are read-only and if you need to change anything you should create a new item. 

First of  all, to start working with items, you need to add the required types:

	const {
		Config,
		ConnectionMode,
	 	Timers,
	 	DataItem, // +++,
	 	ItemFormat // +++ } = require('hsms-driver')
	 
After that you can simply add items you need as shown below:

(I1) 1 byte integer (signed):

	const i1 = DataItem.i1( "item-name-1", 12  );
	const i1arr = DataItem.i1( "item-name-2", 12, 121, -8, "7"  );
	
	console.log( i1.toString() ); // I1 item-name-1 [12]
	console.log( i1.name ); // item-name-1
	console.log( i1.format ); // 100 or ItemFormat.I1
	console.log( i1.value ); // 12

	console.log( i1arr.toString() ); // I1<4> item-name-2 [12,121,-8,7]
	console.log( i1arr.name ); // item-name-2
	console.log( i1arr.format ); // 100 or ItemFormat.I1
	console.log( i1arr.value ); // Array(4) [12, 121, -8, 7]
	
(U1) 1 byte integer (unsigned):


	const u1 = DataItem.u1( "u-item-name-1", 128  );
	const u1arr = DataItem.u1( "u-item-name-2", 12, 121, 250  );
	
	console.log( u1.toString() );// U1 u-item-name-1 [128]
	console.log( u1.name ); // u-item-name-1
	console.log( u1.format ); // 164 or ItemFormat.U1
	console.log( u1.value ); // 128
	
	console.log( u1arr.toString() ); // U1<3> u-item-name-2 [12,121,250]
	console.log( u1arr.name ); // u-item-name-2
	console.log( u1arr.format ); // 164 or ItemFormat.U1
	console.log( u1arr.value ); // Array(3) [12, 121, 250]
	
(I2) 2 byte integer (signed):
	
	const i2 = DataItem.i2( "item-name-3", 12  );
	const i2arr = DataItem.i2( "item-name-4", 12, 121, -8, "7"  );

	console.log( i2.toString() ); // I2 item-name-3 [12]
	console.log( i2.name ); // item-name-3
	console.log( i2.format ); // 104 or ItemFormat.I2
	console.log( i2.value ); // 12

	console.log( i2arr.toString() ); // I2<4> item-name-4 [12,121,-8,7]
	console.log( i2arr.name ); // item-name-4
	console.log( i2arr.format ); // 104 or ItemFormat.I2
	console.log( i2arr.value ); // Array(4) [12, 121, -8, 7]
	
(U2) 2 byte integer (unsigned):
	
	const u2 = DataItem.u2( "u-item-name-3", 12543  );
	const u2arr = DataItem.u2( "u-item-name-4", 1212, 16521, "7765"  );
	
	console.log( u2.toString() ); // U2 u-item-name-3 [12543]
	console.log( u2.name ); // u-item-name-3
	console.log( u2.format ); // 168 or ItemFormat.U2
	console.log( u2.value ); // 12543
	
	console.log( u2arr.toString() ); // U2<3> u-item-name-4 [1212,16521,7765]
	console.log( u2arr.name ); // u-item-name-4
	console.log( u2arr.format ); // 168  or ItemFormat.U2
	console.log( u2arr.value ); // Array(3) [1212, 16521, 7765]
	
(I4) 4 byte integer (signed):
	
	const i4 = DataItem.i4( "item-name-3", 54312432  );
	const i4arr = DataItem.i4( "item-name-4", 43213212, 0x2121, "-817543"  );

	console.log( i4.toString() ); // I4 item-name-3 [54312432]
	console.log( i4.name ); // item-name-3
	console.log( i4.format ); // 112 or ItemFormat.I4
	console.log( i4.value ); // 54312432

	console.log( i4arr.toString() ); // I4<3> item-name-4 [43213212,8481,-817543]
	console.log( i4arr.name ); // item-name-4
	console.log( i4arr.format ); // 112 or ItemFormat.I4
	console.log( i4arr.value ); // Array(3) [43213212, 8481, -817543]
	
(U4) 4 byte integer (unsigned):

	const u4 = DataItem.u4( "item-name-3", 76543124  );
	const u4arr = DataItem.u4( "item-name-4", 4432132, 0x212154, "81754321" );
	
	console.log( u4.toString() ); // U4 u-item-name-3 [76543124]
	console.log( u4.name ); // u-item-name-3
	console.log( u4.format ); // 176 or ItemFormat.U4
	console.log( u4.value ); // 76543124
	
	console.log( u4arr.toString() ); // U4<3> u-item-name-4 [4432132,2171220,81754321]
	console.log( u4arr.name ); // u-item-name-4
	console.log( u4arr.format ); // 176 or ItemFormat.U4
	console.log( u4arr.value ); // Array(3) [4432132, 2171220, 81754321]

	
(F4) 4 byte floating point:

	const f4 = DataItem.f4( "f-item-name-1", 54.3  );
	const f4arr = DataItem.f4( "f-item-name-2", 21.6, -76.21, 245.6754 );
	
	console.log( f4.toString() ); // F4 f-item-name-1 [54.3]
	console.log( f4.name ); // f-item-name-1
	console.log( f4.format ); // 144 or ItemFormat.F4
	console.log( f4.value ); // 54.3

	console.log( f4arr.toString() ); // F4<3> f-item-name-2 [21.6,-76.21,245.6754]
	console.log( f4arr.name ); // f-item-name-2
	console.log( f4arr.format ); // 144 or ItemFormat.F4
	console.log( f4arr.value ); // Array(3) [21.6, -76.21, 245.6754]
	
(F8) 8 byte floating point:

	const f8 = DataItem.f8( "f-item-name-3", 545432.343221  );
	const f8arr = DataItem.f8( "f-item-name-4", 29541.66543, -76211.25431 );
	
	console.log( f8.toString() ); // F8 f-item-name-3 [545432.343221]
	console.log( f8.name ); // f-item-name-3
	console.log( f8.format ); // 128 or ItemFormat.F8
	console.log( f8.value ); // 545432.343221

	console.log( f8arr.toString() ); // F8<2> f-item-name-4 [29541.66543,-76211.25431]
	console.log( f8arr.name ); // f-item-name-4
	console.log( f8arr.format ); // 128 or ItemFormat.F8
	console.log( f8arr.value ); // Array(2) [29541.66543, -76211.25431]

String (pay attention to the size):
	
	const a1 = DataItem.a( "item-name-9", "very long string", 5 );
	const a2 = DataItem.a( "item-name-10", "short", 10 );
	
	console.log( a1.toString() ); // item-name-9 [very ]
	console.log( a1.name ); // item-name-9
	console.log( a1.format ); // 64 or ItemFormat.A
	console.log( a1.value ); //'very '
	console.log( a1.size ); // 5

	console.log( a2.toString() ); // A<10> item-name-10 [short     ]
	console.log( a2.name ); // item-name-10
	console.log( a2.format ); // 64 or ItemFormat.A
	console.log( a2.value ); 'short     '
	console.log( a2.size ); // 10

Lists:
	
	const list = DataItem.list( "list-1",
		DataItem.a( "item-name-9", "very long string", 5 ),
		DataItem.i2( "item-name-3", 12  ),
		DataItem.list( "child-1",
		DataItem.u2( "age", 12  ),
		DataItem.a( "name", "John Smith", 30  ) )
	 );
	
	 console.log( list.toString() );
	// List list-1
	//	A<5> item-name-9 [very ]
	//	I2 item-name-3 [12]
	//	List child-1
	//	U2 age [12]
	//  	A<30> name [John Smith                    ]
	console.log( list.name ); // list-1
	console.log( list.format ); // 0 or ItemFormat.List
	console.log( list.value ); // Array(3) [DataItem, DataItem, DataItem]
	
#### Data Messages
As was told before the main exchange unit in HSMS is a message. That means if you need to send a data to a remote entity you should create a message, fill it with required data items and send  via driver's API. 

To create a message you need to add the required type:

	const {
		Config,
		ConnectionMode,
	 	Timers,
	 	DataItem, 
	 	ItemFormat,
	 	DataMessage // +++  } = require('hsms-driver')

The driver uses a builder pattern. Every data message is an immutable object: all properties are read-only and if you need to change anything you should create a new message. 

 Every data message has the following properties:

 - **device** 
Gets a 15-bit field in the message header used to identify a sub-entity within the equipment. Device ID is a property of the equipment, and can be viewed as a logical identifier associated with a physical device or sub-entity within the equipment. 
 - **context**
Gets a message context used to identify a transaction uniquely among the set of open transactions. The context of a reply data message must be the same as those of the corresponding primary message. If you do not provide a context value for the primary message the driver will set unique value itself.
 - **stream**
Gets a message stream.
 - **func**
Gets a message function.
 - **items**
Gets message's data items.
 - **replyExpected**
 Gets a value indicating whether the message expects a reply.
- **time** 
Gets a time label used to identify message creation time. 

Here is the example on how to create your first data message:

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
   		
	console.log( m.device ); // 1
	console.log( m.stream ); // 5
	console.log( m.func ); // 1
	console.log( m.replyExpected ); // false
	console.log( m.context ); // 7107 (value generated by the driver)
	console.log( m.items ); // Array(3) [DataItem, DataItem, DataItem]

When message building is over we are ready to send it. But before, let's summarize all the steps you have to take to send the message:

 - create a configuration object where you specify network and timeout details
 - create a connection based on the configuration, subscribe to  events you need and call a method 'start'
 - create a data message with required stream and function numbers, add data items 
 - send the message via 'send' method of the created connection object

And here is the full sample: as soon as two driver gets connected a passive connection sends a data message and does not expect a reply.


	const {
		DataItem,
		DataMessage,
		Config,
		ConnectionMode,
		Connection } = require('hsms-driver')

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


TODO:
message callbacks and messages with replies






		
