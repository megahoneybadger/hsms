var ByteBuffer = require("bytebuffer");
const constants = require('./../../utils/string-resources')
const validator = require('./../../utils/validation-helper')

module.exports = (function () {
	/**
	 * Represents a single data item: information packet 
	 * which has a length and format defined by the
	 * first 2, 3 or 4 bytes of the item.
	 * 
	 */
	class DataItem {

		constructor(builder) {
			if (arguments.length < 1 || !(String(builder.constructor) === String(DataItem.builder.constructor))) {
				throw new TypeError(constants.CANNOT_CONSTRUCT_WITHOUT_BUILDER);
			}

			if (arguments.length > 1) {
				throw new TypeError(constants.TOO_MANY_CONSTRUCT_PARAMS);
			}

			const name = builder.name();

			// Gets data item's name
			Object.defineProperty(this, "name", {
				get: function () { return name; },
				enumerable: true,
				configurable: false,
			});

			const format = builder.format();

			// Gets data items's format
      Object.defineProperty(this, "format", {
        get: function () { return format; },
        enumerable: true,
        configurable: false,
			});
			
			// Gets data item's size only if supports size (e.g. string)
			if (ItemFormat.isSizeable(format)) {
        const size = builder.size();
				
        Object.defineProperty(this, "size", {
          get: function () { return size; },
          enumerable: true,
          configurable: false,
        });
      }

		}

		/**
		 * Returns available item formats.
		 */
		static get format() {
			return ItemFormat;
		}

		/**
		 * Returns builder's instance.
		 */
		static get builder() {
			return new Builder();
		}
	}


	/**
	 * Represents available item formats where every value containts format code.
	*/
	const ItemFormat = Object.freeze({
		List: 0, // List(length in elements)
		Bin: 32, // Binary
		Bool: 36,// Boolean
		A: 64,   // ASCII
		I8: 96,  // 8 byte integer (signed)
		I4: 112, // 4 byte integer (signed)
		I2: 104, // 2 byte integer (signed)
		I1: 100, // 1 byte integer (signed)
		F8: 128, // 8 byte floating point
		F4: 144, // 5 byte floating point
		U8: 160, // 8 byte integer
		U4: 176, // 4 byte integer
		U2: 168, // 2 byte integer
		U1: 164, // 1 byte integer

		isSizeable(n) {
      switch (n) {
        case this.Bin:
        case this.A:
          return true;

        default:
          return false;
      }
    },
	})


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
				name: '',
				format: ItemFormat.I2,
			 	size : undefined,
				value : undefined,
				children : []
			});
		}
		/**
		 * Gets or sets data item's name.
		*/
		name(n) {
			if (!n) {
				return props.get(this).name;
			}

			if (!validator.isString(n)) {
				throw new TypeError(constants.getErrMustBeString('name'));
			}

			props.get(this).name = n;
			return this;
		}
		/**
		 * Gets or sets data item's format.
		 */
		format(f) {
			if ( validator.isUndefined( f ) /** Format allows 0, cannot use !f */) {
				return props.get(this).format;
			}

			props.get(this).format = validator.getEnumValue(ItemFormat, f);

			if (!ItemFormat.isSizeable(props.get(this).format)) {
				props.get(this).size = undefined;
			}

			return this;
		}
		/**
		 * Gets or sets data item's size
		 * Applicable only for items which support size.
		 */
		size(s) {
			if (validator.isUndefined( s )) {
				return props.get(this).size;
			}

			const size = validator.getUShortInRange( s, "Size" );

			props.get(this).size = 
				(ItemFormat.isSizeable(props.get(this).format)) ?	size : undefined;

			return this;
		}
		/**
		 * Creates a new data item and initializes it with set parameters.
		*/
		build() {
			if (!props.get(this).name) {
				props.get(this).name = '';
			}

			return new DataItem(this);
		}
	}

	return DataItem;
})();

