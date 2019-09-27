const ControlMessage = require( './control-message' );
const Message = require( '../message' );
const ValidationHelper = require( './../../utils/validation-helper' )
const constants = require( './../../utils/string-resources' )

/**
 * Represents a response for Delect procedure.
 * 
 * The Deselect procedure is used to provide a graceful end to HSMS
 * communication for an entity prior to breaking the TCP/IP connection.
 * 
 * - The responding entity receives the Deselect.req message.
 * 
 * - If the responding entity is in the SELECTED state,
 *   and if it is able to permit the Deselect, it responds
 *   using the Deselect.rsp with a zero response code.
 *   The responding entity's Deselect procedure
 *   completes successfully. The NOT SELECTED state is entered
 * 
 * - If the responding entity is unable to permit the Deselect,
 *   either because it is not in the SELECTED state or because local
 *   conditions do not permit the Deselect, it responds using the Deselect.rsp
 *   with a non-zero response code. The responding entity's Deselect
 *   procedure terminates unsuccessfully. No state change occurs.
 */
class DeselectRsp extends ControlMessage{

  constructor( dev, cont, status = 0 ){
    super( dev, cont );

    if( arguments.length > 3 ){
      throw new TypeError(constants.TOO_MANY_CONSTRUCT_PARAMS);
    }

    status =  ValidationHelper.getNumberInRange( 
      status, 0, constants.MAX_UBYTE, "Status" );

    Object.defineProperty(this, "status", {
      get: function () { return status; },
      enumerable: true,
      configurable: false,
    });
  }

  /**
   * Gets the message type.
   */
  get kind(){
    return Message.Type.DeselectRsp;
  }

  /**
   * Returns a string that represents the current object.
   */
  toString(){
    return `deselect rsp`;
  }
}

module.exports = DeselectRsp;