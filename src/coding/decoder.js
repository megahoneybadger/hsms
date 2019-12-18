var SelectRsp = require('../messages/control/select-rsp');
var SelectReq = require('../messages/control/select-req');
var DeselectRsp = require('../messages/control/deselect-rsp');
var DeselectReq = require('../messages/control/deselect-req');
var LinkTestReq = require('../messages/control/link-test-req');
var LinkTestRsp = require('../messages/control/link-test-rsp');
var SeparateReq = require('../messages/control/separate-req');
var RejectReq = require('../messages/control/reject-req');
const Message = require('../messages/message');
const DataMessage = require('./../messages/data/data-message');
const DataItem = require('./../messages/data/data-item');
const ItemFormat = require("../messages/data/item-format")
const ByteBuffer = require('bytebuffer')


module.exports = (function () {

  class Decoder {
    decode(buffer) {
      let bb = ByteBuffer.wrap(buffer);
			let m = null;

			//console.log( bb );
			
      let device = bb.readUint16();

      let hb2 = bb.readUint8();

      let hb3 = bb.readUint8();

      let ptype = bb.readUint8();

      let stype = bb.readUint8();

      let context = bb.readUint32();

      switch (stype) {
        case Message.Type.DataMessage:
          m = decodeDataMessage( bb, device, hb2, hb3, context ); 
          break;

        case Message.Type.SelectReq:
          m = new SelectReq( device, context );
          break;

        case Message.Type.SelectRsp:
          m = new SelectRsp(device, context, hb3);
					break;
					
				case Message.Type.DeselectReq:
          m = new DeselectReq( device, context );
          break;

        case Message.Type.DeselectRsp:
          m = new DeselectRsp(device, context, hb3);
          break;

        case Message.Type.LinkTestReq:
          m = new LinkTestReq(context);
          break;

        case Message.Type.LinkTestRsp:
          m = new LinkTestRsp(context);
          break;

        case Message.Type.SeparateReq:
          m = new SeparateReq(context);
          break;

        case Message.Type.RejectReq:
          m = new RejectReq( device, context, hb3 );
          break;
      }

      return m;
    }

    get HEADER_LEN() {
      return 10;
    }
  }

  function decodeDataMessage( b, device, hb2, hb3, context ){
    let senderExpectReply = (( hb2 & 128 ) == 0 );

    let stream = ( hb2 & 127 );
    let func = hb3;

    let items = decodeDataItems( b );

    let dmb = DataMessage
      .builder
      .device( device )
      .context( context )
      .stream( stream )
      .func( func )
      .replyExpected( senderExpectReply );

    if( items.length > 0 ){
      dmb.items( ...items );
    }

    let dm = dmb.build();

    return dm;
  }

  function decodeDataItems( b ){
    let items = [];

    while( b.offset < b.limit )  {
      let next = decodeDataItem( b );
      items.push( next );
    }

    return items;
  }

  function decodeDataItem( b ){
    let fb = b.readUint8();

    let MASK_KILL_NO_LEN_BYTES = 252;
    let MASK_NO_LEN_BYTES = 3;

    let btFormatByteWithoutNoLenBytes = ( fb & MASK_KILL_NO_LEN_BYTES );
    let iNoLenBytes = ( fb & MASK_NO_LEN_BYTES );

    let len = readVarLength( b, iNoLenBytes )

    switch( btFormatByteWithoutNoLenBytes ){
      case ItemFormat.A:
        return DataItem.a( '', b.readString( len ), len );

      case ItemFormat.List:
        return decodeList( b, len );

      case ItemFormat.I1:
        return decodeI1( b, len );

      case ItemFormat.I2:
        return decodeI2( b, len );

      case ItemFormat.I4:
        return decodeI4( b, len );

      case ItemFormat.I8:
        return decodeI8( b, len );

      case ItemFormat.U1:
        return decodeU1( b, len );

      case ItemFormat.U2:
        return decodeU2( b, len );

      case ItemFormat.U4:
        return decodeU4( b, len );

      case ItemFormat.U8:
        return decodeU8( b, len );

      case ItemFormat.F4:
        return decodeF4( b, len );

      case ItemFormat.F8:
        return decodeF8( b, len );
    }
  }

  function decodeList( b, len ){
    let items = [];

    for( let i = 0; i < len; ++i ){
      items.push( decodeDataItem( b ) )
    }

    return DataItem.list( "", ...items )
  }

  function decodeI1( b, len ){
    let nominalLen = 1;

    if( nominalLen === len ){
      return DataItem.i1( '', b.readInt8() );
    } else {
      var count = len / nominalLen;
      var arr = [];

      for( let i = 0; i < count; ++i ){
        arr.push( b.readInt8() );
      }

      let di = DataItem.i1( '', ...arr );

      return di;
    }
  }

  function decodeU1( b, len ){
    let nominalLen = 1;

    if( nominalLen === len ){
      return DataItem.u1( '', b.readUint8() );
    } else {
      var count = len / nominalLen;
      var arr = [];

      for( let i = 0; i < count; ++i ){
        arr.push( b.readUint8() );
      }

      return DataItem.u1( '', ...arr );
    }
  }

  function decodeI2( b, len ){
    let nominalLen = 2;

    if( nominalLen === len ){
      return DataItem.i2( '', b.readInt16() );
    } else {
      var count = len / nominalLen;
      var arr = [];

      for( let i = 0; i < count; ++i ){
        arr.push( b.readInt16() );
      }

      let di = DataItem.i2( '', ...arr );

      return di;
    }
  }

  function decodeU2( b, len ){
    let nominalLen = 2;

    if( nominalLen === len ){
      return DataItem.u2( '', b.readUint16() );
    } else {
      var count = len / nominalLen;
      var arr = [];

      for( let i = 0; i < count; ++i ){
        arr.push( b.readUint16() );
      }

      return DataItem.u2( '', ...arr );
    }
  }

  function decodeI4( b, len ){
    let nominalLen = 4;

    if( nominalLen === len ){
      return DataItem.i4( '', b.readInt32() );
    } else {
      var count = len / nominalLen;
      var arr = [];

      for( let i = 0; i < count; ++i ){
        arr.push( b.readInt32() );
      }

      return DataItem.i4( '', ...arr );
    }
  }

  function decodeU4( b, len ){
    let nominalLen = 4;

    if( nominalLen === len ){
      return DataItem.u4( '', b.readUint32() );
    } else {
      var count = len / nominalLen;
      var arr = [];

      for( let i = 0; i < count; ++i ){
        arr.push( b.readUint32() );
      }

      return DataItem.u4( '', ...arr );
    }
  }

  function decodeI8( b, len ){
    let nominalLen = 8;

    if( nominalLen === len ){
      return DataItem.i8( '', b.readInt64() );
    } else {
      var count = len / nominalLen;
      var arr = [];

      for( let i = 0; i < count; ++i ){
        arr.push( b.readInt64() );
      }

      return DataItem.i8( '', ...arr );
    }
  }
  
  function decodeU8( b, len ){
    let nominalLen = 8;

    if( nominalLen === len ){
      return DataItem.u8( '', b.readUint64() );
    } else {
      var count = len / nominalLen;
      var arr = [];

      for( let i = 0; i < count; ++i ){
        arr.push( b.readUint64() );
      }

      return DataItem.u8( '', ...arr );
    }
  }

  function decodeF4( b, len ){
    let nominalLen = 4;

    if( nominalLen === len ){
			// https://stackoverflow.com/questions/42699162/javascript-convert-array-of-4-bytes-into-a-float-value-from-modbustcp-read#comment92169146_42699667
			var v = +b.readFloat32().toPrecision( 7 )// toFixed( 7 );
			 
			var item = DataItem.f4( '', v );
			
      return item;
    } else {
      var count = len / nominalLen;
      var arr = [];

      for( let i = 0; i < count; ++i ){
        arr.push( b.readFloat32() );
      }

      return DataItem.f4( '', ...arr );
    }
	}
	
	function bytesToFloat(bytes) {
    // JavaScript bitwise operators yield a 32 bits integer, not a float.
    // Assume LSB (least significant byte first).
    var bits = bytes[3]<<24 | bytes[2]<<16 | bytes[1]<<8 | bytes[0];
    var sign = (bits>>>31 === 0) ? 1.0 : -1.0;
    var e = bits>>>23 & 0xff;
    var m = (e === 0) ? (bits & 0x7fffff)<<1 : (bits & 0x7fffff) | 0x800000;
    var f = sign * m * Math.pow(2, e - 150);
    return f;
	}  
	
  function decodeF8( b, len ){
    let nominalLen = 8;

    if( nominalLen === len ){
      return DataItem.f8( '', b.readFloat64() );
    } else {
      var count = len / nominalLen;
      var arr = [];

      for( let i = 0; i < count; ++i ){
        arr.push( b.readFloat64() );
      }

      return DataItem.f8( '', ...arr );
    }
  }

  function readVarLength( b, iNoLenBytes ){
    let lenArr = []

    for( var i = 0; i < iNoLenBytes; ++i ){
      lenArr.push( b.readUint8());
    }

    while( iNoLenBytes < 4 ){
      lenArr.splice( 0, 0, 0 );
      ++iNoLenBytes;
    }

    var u8 = new Uint8Array(lenArr.reverse()); // original array
    var u32bytes = u8.buffer.slice(); // last four bytes as a new `ArrayBuffer`
    var uint = new Uint32Array(u32bytes)[0];

    return uint;
  }

  return new Decoder();
})();