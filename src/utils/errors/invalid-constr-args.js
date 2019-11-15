class InvalidConstructorArguments extends Error{
	constructor() {
		super( "Invalid constructor argument(s)" );
		
    Error.captureStackTrace(this, InvalidConstructorArguments)
  }
}


module.exports = InvalidConstructorArguments;