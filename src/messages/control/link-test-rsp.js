const ControlMessage = require( './control-message' );
const Message = require( '../message' );
const { TooManyParamsError} = require( './../../utils/errors/custom-errors' )

/**
 * Represents a response for LinkTest procedure.
 * 
 * - The responding entity receives the Linktest.req from the initiator.
 * 
 * - The responding entity sends a Linktest.rsp.
 */
class LinkTestRsp extends ControlMessage{
	static get ST_DEVICE(){
		return 0xFFFF;
	}

  constructor( cont ){
    super( LinkTestRsp.ST_DEVICE, cont );

    if( arguments.length > 1 ){
      throw new TooManyParamsError();
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