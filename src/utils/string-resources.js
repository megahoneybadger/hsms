module.exports = Object.freeze({
  MAX_UBYTE: 0xff,
  MAX_USHORT: 0xffff,
  MAX_UINT: 0xffffffff,

  CANNOT_CONSTRUCT_DIRECTLY: 'Cannot construct instance directly',
  NOT_SUPPORTED_OBJECT_TYPE: 'Not supported object type',

  getErrNumberNotInRange( p, low, up ){
    return `${p} must be a number between ${low} and ${up}`;
  },

  getErrUByteNotInRange( p ){
    return this.getErrNumberNotInRange( p, 0, this.MAX_UBYTE );
  },

  getErrUShortNotInRange( p ){
    return this.getErrNumberNotInRange( p, 0, this.MAX_USHORT );
  },

  getErrUIntNotInRange( p ){
    return this.getErrNumberNotInRange( p, 0, this.MAX_UINT );
  }

});

//create_PARAM_MUST_BE_NON_NEGATIVE_NUMBER_LESS