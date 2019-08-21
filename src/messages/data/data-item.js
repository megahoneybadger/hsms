var ByteBuffer = require("bytebuffer");
const constants = require( './../../utils/string-resources' )

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

			if( arguments.length > 1 ){
				throw new TypeError(constants.TOO_MANY_CONSTRUCT_PARAMS);
			}

			const name = builder.name();

			// Gets data item's name.
      Object.defineProperty(this, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: false,
      });
			
			

		}

		/**
		 * Returns available item formats.
		 */
		static get Format() {
      return ItemFormat;
    }

		static get builder(){
			let name = '';
      let format = ItemFormat.I2;
      let size;
      let value;
			let children = [];

			/**
			 * Helps building new data item.
			 */
			class Builder{

				/**
				 * Gets or sets data item's name.
				*/
				name(n) {
          if (!n) {
            return name;
          }

          if (!constants.isString( n )) {
            throw new TypeError(constants.getErrMustBeString( 'name' ));
          }

          name = n;
          return this;
				}
				
				build() {
          if (!name) {
            name = '';
          }

          return new DataItem(this);
        }
			}
			
			return new Builder();
		}

		//

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
  })
		
	return DataItem;
})();

//https://webbjocke.com/javascript-check-data-types/