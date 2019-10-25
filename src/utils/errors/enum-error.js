
class InvalidEnumValueError extends Error{
	constructor() {
		super( "Invalid enum value" );
		
    Error.captureStackTrace(this, InvalidEnumValueError)
  }
}

module.exports = InvalidEnumValueError;