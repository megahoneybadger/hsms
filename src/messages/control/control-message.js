const Message = require( './../message' );
const constants = require( './../../utils/string-resources' )

/**
 * Base abstract class for all control messages.
 */
class ControlMessage extends Message{

  constructor( dev, cont ){
    super( dev, cont );

    if (new.target === ControlMessage) {
      throw new TypeError( constants.CANNOT_CONSTRUCT_DIRECTLY );
    }

    // if ('function' !== typeof this.kind ) {
    //   throw new TypeError("Must override method [kind]");
    // }
  }

  /**
   * Gets a value indicating whether this message is primary (not a reply).
   */
  get isPrimary(){
    return ( 0 != ( ( this.kind ) & 1 ) );
  }

  /**
   * Gets a value indicating whether this message requires a reply.
   */
  get isReplyRequired(){
    return this.isPrimary;
  }
}

module.exports = ControlMessage;