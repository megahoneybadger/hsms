const ControlMessage = require('./control-message');
const Message = require('../message');
const { TooManyParamsError } = require('../../utils/errors/custom-errors')

/**
 * Represents a request for initiation of separation procedure.
 * 
 * The Separate procedure is used to abruptly terminate HSMS communication
 * for an entity prior to breaking the TCP/IP Connection.
 *
 * - The initiator of the select procedure sends the 
 *   Separate.req message to the responding entity.
 * 
 * - The initiator's Separate procedure completes successfully.
 */
class SeparateReq extends ControlMessage {

  constructor(cont) {
    super(0xFFFF, cont);

    if (arguments.length > 1) {
      throw new TooManyParamsError();
    }
  }

  /**
   * Gets the message type.
   */
  get kind() {
    return Message.Type.SeparateReq;
  }

  /**
  * Gets a value indicating whether this message requires a reply.
  */
  get isReplyRequired() {
    return false;
  }

  /**
   * Returns a string that represents the current object.
   */
  toString() {
    return `separate req`;
  }
}

module.exports = SeparateReq;