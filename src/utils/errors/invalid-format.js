class InvalidFormatError extends Error{
	constructor() {
		super( "Invalid item value or format" );
		
    Error.captureStackTrace(this, InvalidFormatError)
  }
}


module.exports = InvalidFormatError;