
![](https://www.semi.org/themes/custom/semi/logo.svg)

[![Build Status](https://api.travis-ci.com/megahoneybadger/hsms.svg?branch=master)](https://travis-ci.com/megahoneybadger/hsms) [![Coverage Status](https://coveralls.io/repos/github/megahoneybadger/hsms/badge.svg?branch=master)](https://coveralls.io/github/megahoneybadger/hsms?branch=master)


#### What is HSMS ?
SEMI E37 High-Speed SECS Message Services (HSMS) is the primary SEMI SECS/GEM transport protocol standard used. HSMS defines a TCP/IP based Ethernet connection used by GEM for host/equipment communication. It is intended as an alternative to SEMI E4 (SECS-I) for applications where higher speed communication is needed and the facilitated hardware setup is convenient.

#### What HSMS Driver Can Do ?
The HSMS Standard defines message exchange procedures for using the TCP/IP network protocol.

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

##### Config
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
		
##### Connection
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
		
	
##### Data Items
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

Here is a example how to create data items:

	const {
	    Config,
	    ConnectionMode,
	    Timers,
		ItemFormat,
		DataItem} = require('hsms-driver')
		
	const i1 = DataItem.i1( "item-name-1", 12  );
	const i1arr = DataItem.i1( "item-name-2", 12, 121, -8, "7"  );

	console.log( i1.toString() ); // I1 item-name-1 [12]
	console.log( i1.name ); // item-name-1
	console.log( i1.format ); // 100 or ItemFormat.U1
	console.log( i1.value ); // 12

	console.log( i1arr.toString() ); // I1<4> item-name-2 [12,121,-8,7]
	console.log( i1arr.name ); // item-name-2
	console.log( i1arr.format ); // 100 or ItemFormat.I1
	console.log( i1arr.value ); // Array(4) [12, 121, -8, 7]
	
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
	
	const f4 = DataItem.f4( "item-name-5", 54312432  );
	const f4arr = DataItem.f4( "item-name-6", 43213212, 0x2121, "-817543"  );

	console.log( f4.toString() ); // F4 item-name-5 [54312432]
	console.log( f4.name ); // item-name-5
	console.log( f4.format ); // 144 or ItemFormat.F4
	console.log( f4.value ); // 54312432

	console.log( f4arr.toString() ); // F4<3> item-name-6 [43213212,8481,-817543]
	console.log( f4arr.name ); // item-name-6
	console.log( f4arr.format ); // 144 or ItemFormat.F4
	console.log( f4arr.value ); // Array(3) [43213212, 8481, -817543]
	
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

Pay attention:
- numeric types and lists do not have size (array length is not an item size)
- numeric types support single value items as well as array value items
- strings require a size: if a given string value is shorter than a size it will be padded with spaces and vice versa if it is longer it will be trimmed











		










		
