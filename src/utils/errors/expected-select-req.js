class ExpectedSelectReqError extends Error{
	constructor() {
		super( "Expected select req message" );
		
    Error.captureStackTrace(this, ExpectedSelectReqError)
  }
}

module.exports = ExpectedSelectReqError;