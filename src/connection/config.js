const net = require('net');
const constants = require('./../utils/string-resources')
const NoBuilderError = require('./../utils/errors/builder-error')
const validator = require('./../utils/validation-helper')

class Config {
	constructor(builder) {
		if (arguments.length < 1 || !(String(builder.constructor) === String(Config.builder.constructor))) {
			throw new NoBuilderError();
		}


		if (arguments.length > 1) {
			throw new TooManyParamsError();
		}

		const mode = builder.mode();

		// Gets connection mode (active or passive).
		Object.defineProperty(this, "mode", {
			get: function () { return mode; },
			enumerable: true,
			configurable: false,
		});

		const ip = builder.ip();

		// If mode is passive gets an ip a local entity should bind to.
		// If mode is active gets an ip of a passive mode remote entity.
		Object.defineProperty(this, "ip", {
			get: function () { return ip; },
			enumerable: true,
			configurable: false,
		});

		const port = builder.port();

		// If mode is passive gets a port a local entity should listen at.
		// If mode is active gets a port of a passive mode remote entity.
		Object.defineProperty(this, "port", {
			get: function () { return port; },
			enumerable: true,
			configurable: false,
		});

		const device = builder.device();

		// TODO
		Object.defineProperty(this, "device", {
			get: function () { return device; },
			enumerable: true,
			configurable: false,
		});

		const timeouts = builder.timers();

		// Gets container which defines values for all command timers (t3, t5, etc.)
		Object.defineProperty(this, "timers", {
			get: function () { return timeouts; },
			enumerable: true,
			configurable: false,
		});
	}

	/**
	 * Returns available connection modes.
	*/
	static get mode() {
		return ConnectionMode;
	}

	/**
	 * Returns builder's instance.
	*/
	static get builder() {
		return new Builder();
	}
}

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

// https://css-tricks.com/implementing-private-variables-in-javascript/
// Hide builder fields from users.
let props = new WeakMap();

class Builder {
	constructor() {
		props.set(this, {
			ip: '',
			port: 0,
			mode : ConnectionMode.Passive,
		});
	}

	mode(m) {
		if ( validator.isUndefined( m )) {
			return props.get(this).mode ;
		}

		props.get(this).mode = validator.getEnumValue( ConnectionMode, m );

		return this;
	}

	port( p ){
		if ( validator.isUndefined( p )) {
			return props.get(this).port;
		}

		props.get(this).port = validator.getUShortInRange( p, "port" )

		return this;
	}

	build() {
		return new Config( this );
	}
}

module.exports = Config;