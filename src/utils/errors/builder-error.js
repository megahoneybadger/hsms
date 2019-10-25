class NoBuilderError extends Error{
	constructor() {
		super( "Cannot construct an instance without a builder" );
		
    Error.captureStackTrace(this, NoBuilderError)
  }
}


module.exports = NoBuilderError;