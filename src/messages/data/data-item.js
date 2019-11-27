const constants = require('./../../utils/string-resources')
const validator = require('./../../utils/validation-helper')
const ItemFormat = require('./item-format')
const { NoBuilderError, TooManyParamsError} = require( './../../utils/errors/custom-errors' )

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
				throw new NoBuilderError();
			}

			if (arguments.length > 1) {
				throw new TooManyParamsError();
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
		 * Determines whether the specified item is equal to the current object.
		 * @param {*} dm 
		 * The item to compare with the current object.
		 */ 
		equals( dm ){
			if (!(dm instanceof DataItem)) {
				return false;
			}

			if( this.format != dm.format ){
				return false;
			}

			if( this.size != dm.size ){
				return false;
			}

			const isMyArray = this.value instanceof Array;
			const isHisArray = dm.value instanceof Array;

			if( isMyArray !== isHisArray ){
				return false;
			}

			if( isMyArray ){
				const eq = 
					( this.value.length === dm.value.length ) && 
					( this.value.every((value, index) => value === dm.value[index]))
				
				if( !eq ){
					return false;
				}
			} else {
				if( this.value != dm.value ){
					return false;
				}
			}
			
			// todo: list

			return true;
		}

		/**
		 * Creates numeric data item.
		 * @param {ItemFormat} f Item format.
		 * @param {String} name Item name.
		 * @param  {...any} values Item value(s) for initialization. Single numeric values or numeric arrays can be passed. 
		 */
		static numeric(f = ItemFormat.I2, name = "", ...values ) {
      return DataItem
        .builder
        .format(f)
        .value(( 0 == values.length ) ? 0 : /*values.flat()*/ validator.flatten( values )  )
        .name(name)
        .build();
		}
		/**
		 * Creates I1 data item.
		 * @param {String} name Item name.
		 * @param  {...any} values Item value(s) for initialization. Single numeric value or numeric array can be passed.
		 */
		static i1(name = "", ...values) {
      return DataItem.numeric(ItemFormat.I1, name, ...values);
		}
		/**
		 * Creates U1 data item.
		 * @param {String} name Item name.
		 * @param  {...any} values Item value(s) for initialization. Single numeric value or numeric array can be passed.
		 */
		static u1(name = "", ...values) {
      return DataItem.numeric(ItemFormat.U1, name, ...values);
		}
		/**
		 * Creates I2 data item.
		 * @param {String} name Item name.
		 * @param  {...any} values Item value(s) for initialization. Single numeric value or numeric array can be passed.
		 */
		static i2(name = "", ...values) {
      return DataItem.numeric(ItemFormat.I2, name, ...values);
		}
		/**
		 * Creates U2 data item.
		 * @param {String} name Item name.
		 * @param  {...any} values Item value(s) for initialization. Single numeric value or numeric array can be passed.
		 */
		static u2(name = "", ...values) {
      return DataItem.numeric(ItemFormat.U2, name, ...values);
		}

		/**
		 * Creates I4 data item.
		 * @param {String} name Item name.
		 * @param  {...any} values Item value(s) for initialization. Single numeric value or numeric array can be passed.
		 */
		static i4(name = "", ...values) {
      return DataItem.numeric(ItemFormat.I4, name, ...values);
		}
		/**
		 * Creates U4 data item.
		 * @param {String} name Item name.
		 * @param  {...any} values Item value(s) for initialization. Single numeric value or numeric array can be passed.
		 */
		static u4(name = "", ...values) {
      return DataItem.numeric(ItemFormat.U4, name, ...values);
		}

		/**
		 * Creates F4 data item.
		 * @param {String} name Item name.
		 * @param  {...any} values Item value(s) for initialization. Single numeric value or numeric array can be passed.
		 */
		static f4(name = "", ...values) {
      return DataItem.numeric(ItemFormat.F4, name, ...values);
		}
		/**
		 * Creates F8 data item.
		 * @param {String} name Item name.
		 * @param  {...any} values Item value(s) for initialization. Single numeric value or numeric array can be passed.
		 */
		static f8(name = "", ...values) {
      return DataItem.numeric(ItemFormat.F8, name, ...values);
		}
		/**
		 * Creates string data item.
		 * @param {String} name Item name.
		 * @param {numeric} size Item size.
		 * @param  {...any} values Item value for initialization. Single string only can be passed.
		 */
		static a(name = "", v, size = 0) {
			return DataItem
				.builder
				.format(ItemFormat.A)
				.size(size)
				.value(v)
				.name(name)
				.build();
		}
		/**
		 * Creates list data item.
		 * @param {*} name Item name. 
		 * @param  {...any} items List children items.
		 */
		static list(name = "", ...items) {
      let arr = items.filter( x => x instanceof DataItem );

      return DataItem
        .builder
        .name(name)
        .format(ItemFormat.List)
        //.items(arr)
        .build();
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
				size: 0,
				value: undefined,
				children: []
			});
		}
		/**
		 * Gets or sets data item's name.
		*/
		name(n) {
			if (validator.isUndefined( n )) {
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
				props.get(this).size = /*undefined*/0;
			}

			if ( !validator.isUndefined( props.get(this).value ) ) {
				this.value( props.get(this).value );
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

			const shoudSetValueAgain = 
				( ItemFormat.isSizeable(props.get(this).format)	) &&
				( !validator.isUndefined( props.get(this).value ) );

			if( shoudSetValueAgain ){
				this.value( props.get(this).value );
			}

			return this;
		}
		/**
		 * Gets or sets data item's value.
		 */
		value( v ){
			if (validator.isUndefined( v )) {
				return props.get(this).value;
			}

			let value;
			let format = props.get(this).format;
			let size = props.get(this).size;
			const isArray = v instanceof Array;

			if( isArray && ( 1 == v.length || ItemFormat.isString( format ) ) ){
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

			const size = props.get(this).size;
			const value =  props.get(this).value;
			const format =  props.get(this).format;

			// if( validator.isUndefined( size ) && ItemFormat.isSizeable( format ) ) {
			// 	props.get(this).size = 0;
			// }

			if( validator.isUndefined( value ) ) {
				props.get(this).value = ItemFormat.default( format, size );
			}

			return new DataItem(this);
		}
	}

	return DataItem;
})();

