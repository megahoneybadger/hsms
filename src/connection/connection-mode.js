module.exports = (function () {

	/**
	 * Represents available connection modes.
	*/
	const ConnectionMode = Object.freeze({
	// The Passive mode is used when the local entity listens for
	// and accepts a connect procedure initiated by the Remote Entity
	Passive: 0,

	// The Active mode is used when the connect 
	// procedure is initiated by the Local Entity.
	Active: 1,
})

	return ConnectionMode;
})();

