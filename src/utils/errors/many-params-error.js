
class TooManyParamsError extends Error{
	constructor() {
		super( "Invalid number of parameters for the constructor" );
		
    Error.captureStackTrace(this, TooManyParamsError)
  }
}

module.exports = TooManyParamsError;