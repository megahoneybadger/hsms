const ControlMessage = require( './control-message' );
const Message = require( '../message' );
const ValidationHelper = require( '../../utils/validation-helper' )
const ByteBuffer = require("bytebuffer");
const constants = require( '../../utils/string-resources' )

/**
 * Represents a request for initiation of Deselect procedure.
 * The Deselect procedure is used to provide a graceful end to HSMS
 * communication for an entity prior to breaking the
 * TCP/IP connection.
 *  - The initiator of the Deselect procedure sends the
 *    Deselect.req message to the responding entity.
 *  - If the initiator receives a Deselect.rsp with a 
 *    Deselect Status of 0, its Deselect procedure
 *    terminates successfully. The NOT SELECTED state is entered.
 *  - If the initiator receives a Deselect.rsp with a nonzero
 *    Deselect Status, its Deselect procedure
 *    terminates unsuccessfully. No state change occurs.
 *  - If the T6 timeout expires in the initiator before
 *    receipt of a Deselect.rsp, it is considered a
 *    communications failure
 */
class DeselectReq extends ControlMessage{

  constructor( dev, cont ){
    super( dev, cont );
  }

  /**
   * Gets the message type.
   */
  get kind(){
    return Message.Type.DeselectReq;
  }

  toString(){
    return `deselect req`;
  }
}

module.exports = DeselectReq;