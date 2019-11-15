const Message = require('./../message')
const DataItem = require( './data-item' )
const validator = require('./../../utils/validation-helper')
const {
	NoBuilderError,
	TooManyParamsError,
	InvalidFormatError } = require( './../../utils/errors/custom-errors' )

module.exports = (function () {

	class DataMessage extends Message {
		constructor(builder) {
			if (arguments.length < 1 || !(String(builder.constructor) === String(DataMessage.builder.constructor))) {
				throw new NoBuilderError();
			}

			if (arguments.length > 1) {
				throw new TooManyParamsError();
			}

			super(builder.device(), builder.context());

			const s = builder.stream();
			const f = builder.func();
			const d = builder.description();
			const re = builder.replyExpected();

			const children = builder
				.items()
				.slice();

			// Gets message's stream.
			Object.defineProperty(this, "stream", {
				get: function () { return s; },
				enumerable: true,
				configurable: false,
			});

			// Gets message's function.
			Object.defineProperty(this, "func", {
				get: function () { return f; },
				enumerable: true,
				configurable: false,
			});

			// Gets message's description.
			Object.defineProperty(this, "description", {
				get: function () { return d; },
				enumerable: true,
				configurable: false,
			});

			Object.defineProperty(this, "replyExpected", {
				get: function () { return re; },
				enumerable: true,
				configurable: false,
			});

			// Gets message's data items.
			Object.defineProperty(this, "items", {
				get: function () { return children; },
				enumerable: true,
				configurable: false,
			});
		}

		/**
		* Gets the message type.
		*/
		get kind() {
			return Message.Type.DataMessage;
		}
		/**
		 * Gets a value indicating whether this message is primary (not a reply).
		 */
		get isPrimary() {
			return (0 != (this.func & 1));
		}

		/**
		 * Gets a value indicating whether this message requires a reply.
		 */
		get isReplyRequired() {
			return (this.isPrimary) && (this.replyExpected);
		}

		/**
		 * Returns a string that represents the current message.
		 */
		toString() {
			return `S${this.stream}F${this.func}`;
		}

		/**
		 * Creates a deep copy of current message.
		 */
		copy(){
			return DataMessage
				.builder
				.copy( this )
				.build();
		}

		/**
		 * Determines whether the specified message is equal to the current object.
		 * @param {*} dm 
		 * The message to compare with the current object.
		 */ 
		equals( dm ){

			if( this.context != dm.context ){
				return false;
			}

			if( this.device != dm.device ){
				return false;
			}

			if( this.stream != dm.stream ){
				return false;
			}

			if( this.func != dm.func ){
				return false;
			}

			if( this.replyExpected != dm.replyExpected ){
				return false;
			}

			return true;
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

	/**
	 * Helps building new data item.
	 * https://medium.com/@axelhadfeg/builder-pattern-using-javascript-and-es6-ec1539182e24
	 */

	class Builder {
		constructor() {
			props.set(this, {
				device: 0,
				context: 0,
				stream: 0,
				func: 0,
				description: '',
				replyExpected: true,
				items: []
			});
		}

		device(d) {
			if (validator.isUndefined(d)) {
				return props.get(this).device;
			}

			props.get(this).device = validator.getUShortInRange(d, "Device");

			return this;
		}

		context(c) {
			if (validator.isUndefined(c)) {
				return props.get(this).context;
			}
			
			props.get(this).context = validator.getUIntInRange(c, "Context");

			return this;
		}

		stream(s) {
			if (validator.isUndefined(s)) {
				return props.get(this).stream;
			}

			props.get(this).stream = validator.getUByteInRange(s, "Stream");

			return this;
		}

		func(f) {
			if (validator.isUndefined(f)) {
				return props.get(this).func;
			}

			props.get(this).func = validator.getUByteInRange(f, "Func");

			return this;
		}

		description(d) {
			if (validator.isUndefined(d)) {
				return props.get(this).description;
			}

			if( !validator.isString( d ) ){
				throw new InvalidFormatError();
			}

			props.get(this).description = d;

			return this;
		}

		replyExpected( re ){
			if( validator.isUndefined(re)){
				return 	props.get(this).replyExpected;
			}

			if (!validator.isBoolean( re )) {
				re = false;
			}

			props.get(this).replyExpected = ( re instanceof Boolean ) ? re.valueOf() : re;

			return this;
		}

		items( ...children ){
			if( validator.isUndefined(children) || 0 === children.length ){
				return props.get(this).items;
			}

			if( null == children ){
				children = new Array();
			}

			props.get(this).items = children
				.filter( x => x instanceof DataItem )
				.slice();

			return this;
		}

		copy( m ){
			device = m.device;
			context =  Math.floor((Math.random() * 10000 ) + 1);

			stream = m.stream;
			func = m.func;
			desc = m.description;
			replyExpected = m.replyExpected;

			return this;
		}

		/**
		 * Creates a reply message based on incoming request message.
		 * @param {*} m 
		 * Incoming request message which must be replied.
		 */
		reply( m ){
			if ( validator.isUndefined(m)) {
				return;
			}
			
			props.get(this).context = m.context;
			props.get(this).stream = m.stream;
			props.get(this).func = m.func + 1;
			
			return this;
		}

		/**
		 * Creates a new data message and initializes it with set parameters.
		 */
		build() {
			return new DataMessage(this);
		}
	}

	return DataMessage;
})();