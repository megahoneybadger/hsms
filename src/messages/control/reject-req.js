const ControlMessage = require( './control-message' );
const Message = require( '../message' );
const constants = require( '../../utils/string-resources' )

/**
 * Represents a response for Reject procedure.
 * 
 * The Reject procedure is used in response to an otherwise valid HSMS message
 * received in an inappropriate context. Supporting the reject procedure can 
 * provide useful diagnostic information during the development of a distributed
 * application using HSMS. The procedure is as follows:
 * 
 * - The initiator of the inappropriate message, upon
 *   receiving the Reject.req, takes appropriate action (local entity-specific).
 * 
 * - The entity receiving the inappropriate message responds with a Reject.req message.
 */
class RejectReq extends ControlMessage{

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
    return Message.Type.RejectReq;
  }

  /**
   * Returns a string that represents the current object.
   */
  toString(){
    return `reject rsp`;
  }
}

module.exports = RejectReq;