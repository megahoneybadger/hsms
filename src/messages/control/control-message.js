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

    if ('function' !== typeof this.kind ) {
      throw new TypeError("Must override method [kind]");
    }

    if ('function' !== typeof this.encode ) {
      throw new TypeError("Must override method [encode]");
    }

    if ('function' !== typeof this.decode ) {
      throw new TypeError("Must override method [decode]");
    }
  }

  isPrimary(){
    return ( 0 != ( ( this.kind() ) & 1 ) );
  }

  isReplyRequired(){
    return this.isPrimary();
  }
}

module.exports = ControlMessage;