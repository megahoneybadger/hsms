
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
|   T6 | 5    |
|   T7 | 10   |
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
TODO :)









		
