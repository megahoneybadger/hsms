class BadSelectRspCodeError extends Error{
	constructor() {
		super( "Received bad select rsp status code." );
		
    Error.captureStackTrace(this, BadSelectRspCodeError)
  }
}

module.exports = BadSelectRspCodeError;