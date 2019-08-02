const constants = require( './string-resources' )

class ValidationHelper{

  static getUShortInRange( v, name ){
    return ValidationHelper( v, 0, constants.MAX_USHORT, name );
  }

  static getNumberInRange( v, low, up, name ){
    let nv = parseInt(v);
    if (!isNaN(nv) && nv >= low && nv <= up) {
      return nv;
    } else  {
      throw new TypeError( constants.getErrNumberNotInRange( name, low, up ) );
    }
  }
}

module.exports = ValidationHelper;