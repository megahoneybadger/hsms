
![](https://www.semi.org/themes/custom/semi/logo.svg)

[![Build Status](https://api.travis-ci.com/megahoneybadger/hsms.svg?branch=master)](https://travis-ci.com/megahoneybadger/hsms)

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
		.on("dropped", () => console.log(`client disconnected`)	)
		.on("established", p => console.log( "client connected" )	)
		
	connP.start();
	connA.start();

In this case the app creates both active and passive connections and make them connect to each other.

#### What is next ?
todo :)