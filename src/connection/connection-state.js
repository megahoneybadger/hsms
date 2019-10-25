module.exports = (function () {

	/**
	 * Represents HSMS connection state.
	*/
 const ConnectionState = Object.freeze({
	// The entity is ready to listen for or initiate TCP/IP connections but either has not yet
	// established any connections or all previously established TCP/IP connections have been terminated.
	notConnected: 0, 

	// A TCP/IP connection has been established.
	// This state has two substates, NOT SELECTED and SELECTED.
	connectedNotSelected: 1,

	// A substate of CONNECTED in which at least one HSMS session has been established. This
	// is the normal “operating” state of HSMS: data messages may be exchanged in this state.
	// It is highlighted by a heavy outline in the state diagram.
	connectedSelected: 2
});

	return ConnectionState;
})();

