var ByteBuffer = require("bytebuffer");
const constants = require('./../../utils/string-resources')
const validator = require('./../../utils/validation-helper')
const ItemFormat = require('./item-format')

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
			
			if (this.format !== ItemFormat.List) {
        const value = builder.value();

        Object.defineProperty(this, "value", {
          get: function () { return value; },
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
		value( v ){
			if (validator.isUndefined( v )) {
				return props.get(this).value;
			}

			let value;
			let format = props.get(this).format;
			let size = props.get(this).size;
			const isArray = v instanceof Array;

			if( isArray && 1 == v.length ){
				value = validator.getItemValue( v[ 0 ], format, size );
			} else if( isArray && 1 < v.length ){
				value = [];

				for( let i = 0; i < v.length; ++i ){
					value.push( validator.getItemValue( v[ i ], format, size ));
				}
			} else if( !isArray ) {
				value = validator.getItemValue( v, format, size );
			}

			props.get(this).value = value;

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

