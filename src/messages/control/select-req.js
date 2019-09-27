const ControlMessage = require( './control-message' );
const Message = require( './../message' );
const ValidationHelper = require( './../../utils/validation-helper' )
const ByteBuffer = require("bytebuffer");
const constants = require( './../../utils/string-resources' )

/**
 * Represents a request for initiation of Select procedure.
 * 
 * The Select procedure is used to establish HSMS communications on a TCP/IP
 * connection using the Select.req and Select.rsp messages in a control transaction.
 * 
 * - The initiator of the select procedure sends the Select.req message to the responding entity.
 * 
 * - If the initiator receives a Select.rsp with a Select Status of 0, The HSMS Select
 *   procedure completes successfully and the SELECTED state is entered.
 * 
 * - If the initiator receives a Select.rsp with a non-zero Select Status,
 *   the Select completes unsuccessfully (no state transitions).
 * 
 * - If the T6 timeout expires in the initiator before receipt of a Select.rsp, it is considered a
 *   communications failure 
 */
class SelectReq extends ControlMessage{

  constructor( dev, cont ){
    super( dev, cont );

    if( arguments.length > 2 ){
      throw new TypeError(constants.TOO_MANY_CONSTRUCT_PARAMS);
    }
  }

  /**
   * Gets the message type.
   */
  get kind(){
    return Message.Type.SelectReq;
  }

  /**
   * Returns a string that represents the current object.
   */
  toString(){
    return `select req`;
  }
}

module.exports = SelectReq;