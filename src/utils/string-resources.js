module.exports = Object.freeze({
	MAX_BYTE: 127,
	MIN_BYTE: -128,
	 
	MAX_UBYTE: 0xff,
	MAX_USHORT: 0xffff,
  MAX_UINT: 0xffffffff,

	CANNOT_CONSTRUCT_DIRECTLY: 'Cannot construct instance directly',
	CANNOT_CONSTRUCT_WITHOUT_BUILDER: 'Cannot construct an instance without a builder',
	TOO_MANY_CONSTRUCT_PARAMS: `Too many parameters for the constructor`,
  NOT_SUPPORTED_OBJECT_TYPE: 'Not supported object type',

	INVALID_ENUM_VALUE: "Invalid enum value",
	INVALID_ITEM_VALUE_OR_FORMAT: "Invalid item value or format",

	


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

