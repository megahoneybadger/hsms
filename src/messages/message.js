var EventEmitter = require('events').EventEmitter;
const constants = require( './../utils/string-resources' )
const ValidationHelper = require( './../utils/validation-helper' )

/*
* Provides access to properties needed to define typical HSMS message.
*/
class Message extends EventEmitter {

  constructor(device = 0, context = 0) {
    super();
    
    if (new.target === Message) {
      throw new TypeError( constants.CANNOT_CONSTRUCT_DIRECTLY );
    }

    device = ValidationHelper.getNumberInRange( 
      device, 0, constants.MAX_USHORT, "Device" );

    context = ValidationHelper.getNumberInRange( 
      context, 0, constants.MAX_UINT, "Context" );


    // A 15-bit field in the message header used
    // to identify a subentity within the equipment
    // Device ID is a property of the equipment, and can be viewed as a
    // logical identifier associated with a physical device or
    // sub-entity within the equipment. 
    Object.defineProperty(this, "device", {
      get: function () { return device; },
      enumerable: true,
      configurable: false,
    });

    // ?? todo
    Object.defineProperty(this, "context", {
      get: function () { return context; },
      enumerable: true,
      configurable: false,
    });

    const time = new Date();

    // Time label used to identify message creation time.
    Object.defineProperty(this, "time", {
      get: function () { return time; },
      enumerable: true,
      configurable: false,
    });
  }

  /*
  * Returns all available message types.
  */
  static get Type() {
    return MessageType;
  }
  
  /**
   * Encodes message content into a binary stream.
   */
  encode(){
    return undefined;
  }

  /**
   * Decodes message content from a binary stream.
   */
  decode(){

  }

  toLongString(){
    return this.toString();
  }
}

const MessageType = Object.freeze({

  DataMessage: 0,

  SelectReq: 1,
  SelectRsp: 2,

  DeselectReq: 3,
  DeselectRsp: 4,

  LinkTestReq: 5,
  LinkTestRsp: 6,

  RejectReq: 7,

  SeparateReq: 8
})

module.exports = Message;

