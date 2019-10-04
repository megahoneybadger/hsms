const ControlMessage = require( './control-message' );
const Message = require( './../message' );
const constants = require( './../../utils/string-resources' )

/**
 * Represents a request for initiation of LinkTest procedure.
 * 
 * The Linktest is used to determine the operational integrity of TCP/IP and
 * HSMS communications, or as a periodic heartbeat.
 * Its use is valid anytime in the CONNECTED state.
 * 
 *  - The initiator of the Linktest procedure sends the 
 *    Linktest.req message to the responding entity.
 * 
 *  - If the initiator receives a Linktest.rsp within the T6
 *    timeout, the Linktest is successfully completed.
 * 
 *  - If the T6 timeout expires in the initiator before receipt of a
 *    Linktest.rsp, it is considered a communications failure 
 */
class LinkTestReq extends ControlMessage{

  constructor( cont ){
    super( 0xFFFF, cont );

    if( arguments.length > 1 ){
      throw new TypeError(constants.TOO_MANY_CONSTRUCT_PARAMS);
    }
  }

  /**
   * Gets the message type.
   */
  get kind(){
    return Message.Type.LinkTestReq;
  }

  /**
   * Returns a string that represents the current object.
   */
  toString(){
    return `linktest req`;
  }
}

module.exports = LinkTestReq;