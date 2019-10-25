const validator = require('./../utils/validation-helper')

const ConnectionMode = require('./connection-mode')
const Timers = require('./timers')
const ItemFormat = require('./../messages/data/item-format')

const {
	NoBuilderError,
	TooManyParamsError,
	InvalidFormatError } = require('./../utils/errors/custom-errors')

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

		// Gets device id.
		// Device ID is a property of the equipment, and can be viewed as a
		// logical identifier associated with a physical device or
		// sub-entity within the equipment. 
		//
		// Will be attached to every message.
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
	 * Returns builder's instance.
	*/
	static get builder() {
		return new Builder();
	}
}

// https://css-tricks.com/implementing-private-variables-in-javascript/
// Hide builder fields from users.
let props = new WeakMap();

class Builder {
	constructor() {
		props.set(this, {
			ip: '127.0.0.1',
			port: 8000,
			mode: ConnectionMode.Passive,
			device: 0,
			timers: undefined
		});
	}

	mode(m) {
		if (validator.isUndefined(m)) {
			return props.get(this).mode;
		}

		props.get(this).mode = validator.getEnumValue(ConnectionMode, m);

		return this;
	}

	ip(ip) {
		if (validator.isUndefined(ip)) {
			return props.get(this).ip;
		}

		validator.isString

		if (!validator.isIP(ip)) {
			throw new InvalidFormatError();
		}

		props.get(this).ip = ip;

		return this;
	}

	port(p) {
		if (validator.isUndefined(p)) {
			return props.get(this).port;
		}

		props.get(this).port = validator.getItemValue(p, ItemFormat.U2, 0);

		return this;
	}

	device(d) {
		if (validator.isUndefined(d)) {
			return props.get(this).device;
		}

		props.get(this).device = validator.getItemValue(d, ItemFormat.U2, 0);

		return this;
	}

	timers(t) {
		if (validator.isUndefined(t)) {
			return props.get(this).timers;
		}

		if (!(t instanceof Timers)) {
			throw new InvalidFormatError();
		}

		props.get(this).timers = t;

		return this;
	}

	build() {
		return new Config(this);
	}
}

module.exports = Config;