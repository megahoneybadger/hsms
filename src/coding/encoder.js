const ByteBuffer = require("bytebuffer");
const constants = require('../utils/string-resources');

const DataItem = require("../messages/data/data-item")
const DataMessage = require("../messages/data/data-message")
const ItemFormat = require("../messages/data/item-format")

const Message = require("../messages/message")
const SelectReq = require("../messages/control/select-req")
const SelectRsp = require("../messages/control/select-rsp")
const DeselectReq = require("../messages/control/deselect-req")
const DeselectRsp = require("../messages/control/deselect-rsp")
const LinkTestReq = require("../messages/control/link-test-req")
const LinkTestRsp = require("../messages/control/link-test-rsp")
const SeparateReq = require("../messages/control/separate-req")
const RejectReq = require("../messages/control/reject-req")

module.exports = (function () {

	/**
	 * Encodes messages into binary stream.
	 */
	class Encoder {
		static encode(m, b) {
			if( m instanceof Message ){
				return encodeMessage( m, b );
			} else if( m instanceof DataItem ){
				return encodeDataItem( m, b );
			} else{
				throw new TypeError(constants.NOT_SUPPORTED_OBJECT_TYPE);
			}
		}
	}

	function encodeMessage(m, b) {
		if( !b ){
      b = new ByteBuffer();
		}
		
		switch (m.kind) {
			case Message.Type.SelectReq:
				return encodeSelectReq(m);

			case Message.Type.SelectRsp:
				return encodeSelectRsp(m);

			case Message.Type.DeselectReq:
				return encodeDeselectReq(m);

			case Message.Type.DeselectRsp:
				return encodeDeselectRsp(m);

			case Message.Type.LinkTestReq:
				return encodeLinkTestReq(m);

			case Message.Type.LinkTestRsp:
				return encodeLinkTestRsp(m);

			case Message.Type.SeparateReq:
				return encodeSeparateReq(m);

			case Message.Type.DataMessage:
				return encodeDataMessage(m, b);

			case Message.Type.RejectReq:
				return encodeRejectReq(m, b);

		}
	}

	function encodeSelectReq(m) {
		if (!(m instanceof SelectReq)) {
			throw new TypeError(constants.NOT_SUPPORTED_OBJECT_TYPE);
		}

		let b = new ByteBuffer();

		b.BE();

		b.writeUint32(10);
		b.writeUint16(m.device);

		b.LE();

		// byte #2
		b.writeUInt8(0)

		// byte #3
		b.writeUInt8(0)

		// PType
		b.writeUInt8(0)

		// SType
		b.writeUInt8(m.kind)

		b.BE();
		b.writeUint32(m.context);
		b.LE();

		return b.buffer.slice(0, b.offset);
	}

	function encodeSelectRsp(m) {
		if (!(m instanceof SelectRsp)) {
			throw new TypeError(constants.NOT_SUPPORTED_OBJECT_TYPE);
		}

		let b = new ByteBuffer();

		b.BE();

		b.writeUint32(10);
		b.writeUint16(m.device);

		b.LE();

		// byte #2
		b.writeUInt8(0)

		// byte #3
		b.writeUInt8(m.status)

		// PType
		b.writeUInt8(0)

		// SType
		b.writeUInt8(m.kind)

		b.BE();
		b.writeUint32(m.context);
		b.LE();

		return b.buffer.slice(0, b.offset);
	}

	function encodeDeselectReq(m) {
		if (!(m instanceof DeselectReq)) {
			throw new TypeError(constants.NOT_SUPPORTED_OBJECT_TYPE);
		}

		let b = new ByteBuffer();

		b.BE();

		b.writeUint32(10);
		b.writeUint16(m.device);

		b.LE();

		// byte #2
		b.writeUInt8(0)

		// byte #3
		b.writeUInt8(0)

		// PType
		b.writeUInt8(0)

		// SType
		b.writeUInt8(m.kind)

		b.BE();
		b.writeUint32(m.context);
		b.LE();

		return b.buffer.slice(0, b.offset);
	}

	function encodeDeselectRsp(m) {
		if (!(m instanceof DeselectRsp)) {
			throw new TypeError(constants.NOT_SUPPORTED_OBJECT_TYPE);
		}

		let b = new ByteBuffer();

		b.BE();

		b.writeUint32(10);
		b.writeUint16(m.device);

		b.LE();

		// byte #2
		b.writeUInt8(0)

		// byte #3
		b.writeUInt8(m.status)

		// PType
		b.writeUInt8(0)

		// SType
		b.writeUInt8(m.kind)

		b.BE();
		b.writeUint32(m.context);
		b.LE();

		return b.buffer.slice(0, b.offset);
	}

	function encodeLinkTestReq(m) {
		if (!(m instanceof LinkTestReq)) {
			throw new TypeError(constants.NOT_SUPPORTED_OBJECT_TYPE);
		}

		let b = new ByteBuffer();

		b.BE();

		b.writeUint32(10);
		b.writeUint16(m.device);

		b.LE();

		// byte #2
		b.writeUInt8(0)

		// byte #3
		b.writeUInt8(0)

		// PType
		b.writeUInt8(0)

		// SType
		b.writeUInt8(m.kind)

		b.BE();
		b.writeUint32(m.context);
		b.LE();

		return b.buffer.slice(0, b.offset);
	}

	function encodeLinkTestRsp(m) {
		if (!(m instanceof LinkTestRsp)) {
			throw new TypeError(constants.NOT_SUPPORTED_OBJECT_TYPE);
		}

		let b = new ByteBuffer();

		b.BE();

		b.writeUint32(10);
		b.writeUint16(m.device);

		b.LE();

		// byte #2
		b.writeUInt8(0)

		// byte #3
		b.writeUInt8(0)

		// PType
		b.writeUInt8(0)

		// SType
		b.writeUInt8(m.kind)

		b.BE();
		b.writeUint32(m.context);
		b.LE();

		return b.buffer.slice(0, b.offset);
	}

	function encodeSeparateReq(m) {
		if (!(m instanceof SeparateReq)) {
			throw new TypeError(constants.NOT_SUPPORTED_OBJECT_TYPE);
		}

		let b = new ByteBuffer();

		b.BE();

		b.writeUint32(10);
		b.writeUint16(m.device);

		b.LE();

		// byte #2
		b.writeUInt8(0)

		// byte #3
		b.writeUInt8(0)

		// PType
		b.writeUInt8(0)

		// SType
		b.writeUInt8(m.kind)

		b.BE();
		b.writeUint32(m.context);
		b.LE();

		return b.buffer.slice(0, b.offset);
	}

	function encodeRejectReq(m) {
		if (!(m instanceof RejectReq)) {
			throw new TypeError(constants.NOT_SUPPORTED_OBJECT_TYPE);
		}

		let b = new ByteBuffer();

		b.BE();

		b.writeUint32(10);
		b.writeUint16(m.device);

		b.LE();

		// byte #2
		b.writeUInt8(0)

		// byte #3
		b.writeUInt8(m.reason)

		// PType
		b.writeUInt8(0)

		// SType
		b.writeUInt8(m.kind)

		b.BE();
		b.writeUint32(m.context);
		b.LE();

		return b.buffer.slice(0, b.offset);
	}

	function encodeDataMessage(m, b) {
		if (!(m instanceof DataMessage)) {
			throw new TypeError(constants.NOT_SUPPORTED_OBJECT_TYPE);
		}

    let posBegin = b.offset;

    b.BE();
    b.writeUint32( 0 /*stub*/ );
    b.writeUint16( m.device );
    b.LE();

    
		// Fix by msmarks
		//let wbit =  ( ( m.replyExpected ) ? 0 : 128 );
		let wbit =  ( ( m.replyExpected ) ? 128 : 0 );
    
    b.writeUInt8( wbit | m.stream );

    b.writeUInt8( m.func );

    // PType
    b.writeUInt8( 0 );

    // SType
    b.writeUInt8( 0 );

    b.BE();
    b.writeUint32( m.context );
		b.LE();
		
		m.items.forEach( x => encodeDataItem( x, b ) )
   
    var posEnd =  b.offset;
    var total = posEnd - posBegin - 4;
    b.offset = posBegin;

    b.BE();
    b.writeUint32( total );
    b.offset = posEnd;
    b.LE();

    return b.buffer.slice( 0, b.offset );
	}

	function encodeDataItem(item, b) {
		const emptyBuffer = !b;

		if( emptyBuffer ){
      b = new ByteBuffer();
		}
		
		b.BE();


		if( item.value instanceof Array && item.format != ItemFormat.List )  {
			encodeArrayValue( item, b );
		} else {
			encodeSingleValue( item, b );
		}

		b.LE();

		return emptyBuffer ? b.buffer.slice(0, b.offset) : undefined;
	}

	function encodeSingleValue( item, b ){
    b.writeUInt8(item.format | 1);
    
    switch (item.format) {
			case ItemFormat.Bool:
				b.writeUInt8(1); // length
				b.writeUInt8(item.value ? 1 : 0 );
				break;

      case ItemFormat.U1:
        b.writeUInt8(1); // length
        b.writeUInt8(item.value);
        break;

      case ItemFormat.U2:
        b.writeUInt8(2); // length
        b.writeUInt16(item.value);
        break;

      case ItemFormat.U4:
        b.writeUInt8(4); // length
        b.writeUInt32(item.value);
        break;

      case ItemFormat.U8:
        b.writeUInt8(8); // length
        b.writeUInt64(item.value);
        break;

      case ItemFormat.I1:
        b.writeUInt8(1); // length
        b.writeInt8(item.value);
        break;

      case ItemFormat.I2:
        b.writeUInt8(2); // length
        b.writeInt16(item.value);
        break;

      case ItemFormat.I4:
        b.writeUInt8(4); // length
        b.writeInt32(item.value);
        break;

      case ItemFormat.I8:
        b.writeUInt8(8); // length
        b.writeInt64(item.value);
        break;

      case ItemFormat.F4:
        b.writeUInt8(4); // length
        b.writeFloat(item.value);
        break;

      case ItemFormat.F8:
        b.writeUInt8(8); // length
        b.writeFloat64(item.value);
        break;

      case ItemFormat.List:
      case ItemFormat.A: {
				let isList = ( item.format === ItemFormat.List );
        let len = item.value.length;
        let btNoLenBytes = (len <= 255) ? 1 : (len <= 65535) ? 2 : 3;
        let btFormatByte = item.format | btNoLenBytes;
        b.offset--; // update format byte which was written in the begining of the functon  
        b.writeUInt8(btFormatByte);
        writeVarLength(b, btNoLenBytes, len);

        if( isList ){
          item.value.forEach( x => encodeDataItem( x, b ) )
        } else {
          b.writeString(item.value);
        }
        
        break;
			}
        
    }
	}
	
	function encodeArrayValue( item, b ){
		let len = getValueBytesCount( item ) * item.value.length;
		
		var btNoLenBytes = ( len <= constants.MAX_UBYTE ) ?
			1 : ( len <= constants.MAX_USHORT ) ? 2 : 3;

		var btFormatByte = item.format | btNoLenBytes;
    
    b.writeUint8( btFormatByte );

    writeVarLength( b, btNoLenBytes, len );

    for( let i = 0; i < item.value.length; ++i ){
      switch (item.format) {
				case ItemFormat.Bool:
          b.writeUInt8( item.value[ i ] ? 1 : 0 );
          break;

        case ItemFormat.U1:
          b.writeUInt8( item.value[ i ] );
          break;
  
        case ItemFormat.I1:
          b.writeInt8( item.value[ i ] );
          break;
  
        case ItemFormat.U2:
          b.writeUInt16( item.value[ i ] );
          break;
  
        case ItemFormat.I2:
          b.writeInt16( item.value[ i ] );
          break;
  
        case ItemFormat.U4:
          b.writeUInt32( item.value[ i ] );
          break;
  
        case ItemFormat.I4:
          b.writeInt32( item.value[ i ] );
          break;
  
        case ItemFormat.F4:
          b.writeFloat32( item.value[ i ] );
          break;
  
        case ItemFormat.U8:
          b.writeUInt64( item.value[ i ] );
          break;
  
        case ItemFormat.I8:
          b.writeInt64( item.value[ i ] );
          break;
  
        case ItemFormat.F8:
          b.writeFloat64( item.value[ i ] );
          break;
      }

    }
	}
	
	function getValueBytesCount( item ){
    switch (item.format) {
			case ItemFormat.Bool:
      case ItemFormat.U1:
      case ItemFormat.I1:
       return 1;

      case ItemFormat.U2:
      case ItemFormat.I2:
        return 2;

      case ItemFormat.U4:
      case ItemFormat.I4:
      case ItemFormat.F4:
        return 4;

      case ItemFormat.U8:
      case ItemFormat.I8:
      case ItemFormat.F8:
        return 8

      case ItemFormat.A:
      case ItemFormat.Bin:
        return item.size;
    }
    
    return 0;
	}
	
	function writeVarLength( b, btLen, len ){
    let le = b.LITTLE_ENDIAN;
    
    switch( btLen ){
      case 1:
        b.writeUInt8( len );
        break;

      case 2:
        b.writeUint16( len );
        break;

      case 3: 
        buffer = new ArrayBuffer( 4 );
        num = new Uint32Array(buffer);
        num[ 0 ] = len;
        var arr = Array.from(new Uint8Array(buffer)).reverse().slice( 1 );
        arr.forEach( x => b.writeUInt8( x ) );
        break;
    }
  }

	return Encoder;
})();
