const ControlMessage = require('./control-message');
const Message = require('../message');
const ValidationHelper = require('./../../utils/validation-helper')
const constants = require('./../../utils/string-resources')
const { TooManyParamsError } = require('./../../utils/errors/custom-errors')

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
class RejectReq extends ControlMessage {

	constructor(dev, cont, reason = 0) {
		super(dev, cont);

		if (arguments.length > 3) {
			throw new TooManyParamsError();
		}

		reason = ValidationHelper.getNumberInRange(
			reason, 0, constants.MAX_UBYTE, "Reason");

		Object.defineProperty(this, "reason", {
			get: function () { return reason; },
			enumerable: true,
			configurable: false,
		});
	}

	/**
	* Gets a value indicating whether this message requires a reply.
	*/
	get isReplyRequired() {
		return false;
	}

  /**
   * Gets the message type.
   */
	get kind() {
		return Message.Type.RejectReq;
	}

  /**
   * Returns a string that represents the current object.
   */
	toString() {
		return `reject req`;
	}
}

module.exports = RejectReq;