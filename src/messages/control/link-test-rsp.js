const ControlMessage = require( './control-message' );
const Message = require( '../message' );
const constants = require( '../../utils/string-resources' )

/**
 * Represents a response for LinkTest procedure.
 * 
 * - The responding entity receives the Linktest.req from the initiator.
 * 
 * - The responding entity sends a Linktest.rsp.
 */
class LinkTestRsp extends ControlMessage{

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
    return Message.Type.LinkTestRsp;
  }

  /**
   * Returns a string that represents the current object.
   */
  toString(){
    return `linktest rsp`;
  }
}

module.exports = LinkTestRsp;