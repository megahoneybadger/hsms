const ControlMessage = require( './control-message' );
const Message = require( '../message' );
const ValidationHelper = require( '../../utils/validation-helper' )
const ByteBuffer = require("bytebuffer");
const constants = require( '../../utils/string-resources' )

/**
 * 
 */
class DeselectReq extends ControlMessage{

  constructor( dev, cont ){
    super( dev, cont );
  }

  /**
   * Gets the message type.
   */
  kind(){
    return Message.Type.DeselectReq;
  }

  /**
   * Encodes the message content into a binary stream.
   */
  encode(){
    
  }

  decode(){

  }

  toString(){
    return `deselect req`;
  }
}

module.exports = DeselectReq;