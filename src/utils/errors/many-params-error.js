
class TooManyParamsError extends Error{
	constructor() {
		super( "Too many parameters for the constructor" );
		
    Error.captureStackTrace(this, TooManyParamsError)
  }
}


module.exports = TooManyParamsError;