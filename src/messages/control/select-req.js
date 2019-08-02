const ControlMessage = require( './control-message' );
const Message = require( './../message' );
const ValidationHelper = require( './../../utils/validation-helper' )
const ByteBuffer = require("bytebuffer");
const constants = require( './../../utils/string-resources' )

/**
 * Represents a request for initiation of Select procedure.
 * The Select procedure is used to establish HSMS communications on a TCP/IP
 * connection using the Select.req and Select.rsp messages in a control transaction.
 * 
 * - The initiator of the select procedure sends the Select.req message to the responding entity.
 * - If the initiator receives a Select.rsp with a Select Status of 0, The HSMS Select
 *   procedure completes successfully and the SELECTED state is entered.
 * - If the initiator receives a Select.rsp with a non-zero Select Status,
 *   the Select completes unsuccessfully (no state transitions).
 * - If the T6 timeout expires in the initiator before receipt of a Select.rsp, it is considered a
 *   communications failure 
 */
class SelectReq extends ControlMessage{

  constructor( dev, cont ){
    super( dev, cont );
  }

  /**
   * Gets the message type.
   */
  kind(){
    return Message.Type.SelectReq;
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
    b.writeUInt8( 0 )

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
    return `select req`;
  }
}

module.exports = SelectReq;