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

    device = ValidationHelper.getUShortInRange( device, "Device" );

    context = ValidationHelper.getUIntInRange( context, "Context" );

    // A 15-bit field in the message header used
    // to identify a subentity within the equipment.
    // Device ID is a property of the equipment, and can be viewed as a
    // logical identifier associated with a physical device or
    // sub-entity within the equipment. 
    Object.defineProperty(this, "device", {
      get: function () { return device; },
      enumerable: true,
      configurable: false,
    });

    if( this.isPrimary && !context ){
      context = Math.floor((Math.random() * 10000 ) + 1);
    }

    // Context (or system bytes) is a four-byte field occupying
    // header bytes 6-9. It is used to identify a transaction uniquely
    // among the set of open transactions.
    Object.defineProperty(this, "context", {
      get: function () { return context; },
      enumerable: true,
      configurable: false,

      // NOTE: Context of a Primary Data Message, Select.req, Deselect.req,
      // or Linktest.req message must be unique from those of all 
      // other currently open transactions initiated from the same end of the connection.
      // They must also be unique from those of the most recently completed transaction.

      // The Context of a Reply Data Message must be the same as those of the corresponding
      // Primary Message. The Context of a Select.rsp, Deselect.rsp, or Linktest.rsp must
      // be the same as those of the respective ".req" message.
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

  SeparateReq: 9
})

module.exports = Message;

