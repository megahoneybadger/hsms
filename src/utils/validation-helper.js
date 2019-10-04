const constants = require( './string-resources' )

const {InvalidEnumValueError} = require ( './errors/custom-errors' )

//https://webbjocke.com/javascript-check-data-types/
class ValidationHelper{

  static getUShortInRange( v, name ){
    return ValidationHelper.getNumberInRange( v, 0, constants.MAX_USHORT, name );
  }

  static getNumberInRange( v, low, up, name ){
    let nv = parseInt(v);
    if (!isNaN(nv) && nv >= low && nv <= up) {
      return nv;
    } else  {
      throw new TypeError( constants.getErrNumberNotInRange( name, low, up ) );
    }
	}
	
	static isString( s ){
		return ( typeof s === 'string' || s instanceof String );
	}

	static isUndefined(f){
		return typeof f === "undefined"
	}

	static getEnumValue( enumType, f ){
    if( !enumType || ValidationHelper.isUndefined( f ) ){
      throw new InvalidEnumValueError();
    }

    if( ValidationHelper.isString( f ) &&  enumType.hasOwnProperty( f ) ){
      f = enumType[ f ];
    }

    if( !( Number.isInteger( f ) && Object.values( enumType ).indexOf( f ) > -1 )){
      throw new InvalidEnumValueError();
    } 

    return f;
  }
}

module.exports = ValidationHelper;