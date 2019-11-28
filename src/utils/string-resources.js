module.exports = Object.freeze({
  MAX_UBYTE: 0xff,
	MAX_USHORT: 0xffff,
	
  MAX_UINT: 0xffffffff, // 4294967295
  MAX_ULONG: Number.MAX_SAFE_INTEGER,//0xffffffffffffffff,

  MIN_BYTE: -128,
  MAX_BYTE: 127,

  MIN_SHORT: -32768,
  MAX_SHORT: 32767,

  MIN_INT: -2147483648,
  MAX_INT: 2147483647,
  
  MIN_LONG: Number.MIN_SAFE_INTEGER,// -9007199254740991  //-9223372036854775808,
	MAX_LONG: Number.MAX_SAFE_INTEGER,// 9007199254740991 //9223372036854775807
						

	CANNOT_CONSTRUCT_DIRECTLY: 'Cannot construct instance directly',
	NOT_SUPPORTED_OBJECT_TYPE: 'Not supported object type',
	INVALID_ITEM_VALUE_OR_FORMAT: "Invalid item value or format",
	INVALID_ITEM_SIZE: "Invalid item size",

  getErrNumberNotInRange( p, low, up ){
    return `${p} must be a number between ${low} and ${up}`;
	},
	
	getErrByteNotInRange( p ){
    return this.getErrNumberNotInRange( p, this.MIN_BYTE, this.MAX_BYTE );
  },

  getErrUByteNotInRange( p ){
    return this.getErrNumberNotInRange( p, 0, this.MAX_UBYTE );
  },

  getErrUShortNotInRange( p ){
    return this.getErrNumberNotInRange( p, 0, this.MAX_USHORT );
  },

  getErrUIntNotInRange( p ){
    return this.getErrNumberNotInRange( p, 0, this.MAX_UINT );
	},
	
	getErrMustBeString( p ){
		return `${p} must be a string`;
	},

	
	

});

