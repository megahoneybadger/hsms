const constants = require( '../string-resources' )

class InvalidItemSizeError extends Error{
	constructor() {
		super( "Invalid item size" );
		
    Error.captureStackTrace(this, InvalidItemSizeError)
  }
}


module.exports = InvalidItemSizeError;