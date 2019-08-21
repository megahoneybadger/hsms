const ControlMessage = require( './control-message' );
const Message = require( './../message' );
const ValidationHelper = require( './../../utils/validation-helper' )
const ByteBuffer = require("bytebuffer");
const constants = require( './../../utils/string-resources' )

/**
 * Represents a response for Select procedure.
 * 
 * The Select procedure is used to establish HSMS communications on a TCP/IP
 * connection using the Select.req and Select.rsp messages in a control transaction.
 * 
 * - The responding entity receives the Select.req.
 * 
 * - If the responding entity is able to accept the select,
 *   it transmits the Select.rsp with a Select Status of 0.
 *   The HSMS Select Procedure for the responding
 *   entity is successfully completed, and the
 *   SELECTED state is entered.
 * 
 * - If the responding entity is unable to permit the
 *   select, it transmits the Select.rsp with a non-zero
 *   Select Status. The HSMS Select Procedure for the
 *   responding entity completes unsuccessfully (no
 *   state transitions).
*/
class SelectRsp extends ControlMessage{

  constructor( dev, cont, status = 0 ){
    super( dev, cont );

    if( arguments.length > 3 ){
      throw new TypeError(constants.TOO_MANY_CONSTRUCT_PARAMS);
    }

    status =  ValidationHelper.getNumberInRange( 
      status, 0, constants.MAX_UBYTE, "Status" );

    Object.defineProperty(this, "status", {
      get: function () { return status; },
      enumerable: true,
      configurable: false,
    });
  }

  /**
   *  Gets the message type.
   */
  kind(){
    return Message.Type.SelectRsp;
  }

  /**
   * Encodes the message content into a binary stream.
   */
  encode(){
    let b = new ByteBuffer();

    b.BE();

    b.writeUint32( 10 );
    b.writeUint16( this.device );

    b.LE();

    // byte #2
    b.writeUInt8( 0 )

    // byte #3
    b.writeUInt8( this.status )

    // PType
    b.writeUInt8( 0 )

    // SType
    b.writeUInt8( this.kind() )

    b.BE();
    b.writeUint32( this.context );
    b.LE();

    return b.buffer.slice( 0, b.offset );
  }

  decode(){

  }

  toString(){
    return `select rsp`;
  }
}

module.exports = SelectRsp;