const Message = require( './../message' );

/**
 * Base abstract class for all control messages.
 */
class ControlMessage extends Message{

  constructor( dev, cont ){
    super( dev, cont );

    if (new.target === ControlMessage) {
      throw new TypeError("Cannot construct Message instances directly");
    }

    if (new.target === ControlMessage) {
      throw new TypeError("Cannot construct ControlMessage instances directly");
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