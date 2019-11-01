var SelectRsp = require('../messages/control/select-rsp');
var SelectReq = require('../messages/control/select-req');
var LinkTestReq = require('../messages/control/link-test-req');
var LinkTestRsp = require('../messages/control/link-test-rsp');
var SeparateReq = require('../messages/control/separate-req');
 const Message = require('../messages/message');
// const DataMessage = require('./../messages/data/data-message');
// const DataItem = require('./../messages/data/data-item');
const ByteBuffer = require('bytebuffer')
// const Utils = require('../utils');

module.exports = (function () {

  class Decoder {
    decode(buffer) {
      let bb = ByteBuffer.wrap(buffer);
      let m = null;

      let device = bb.readUint16();

      let hb2 = bb.readByte();

      let hb3 = bb.readByte();

      let ptype = bb.readByte();

      let stype = bb.readByte();

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
          m = new RejectReq();
          break;
      }

      return m;
    }

    get HEADER_LEN() {
      return 10;
    }
  }

  function decodeDataMessage( b, device, hb2, hb3, context ){
    let senderExpectReply = (( hb2 & 128 ) > 0 );

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

    let len = Utils.readVarLength( b, iNoLenBytes )

    switch( btFormatByteWithoutNoLenBytes ){
      case DataItem.Format.A:
        return DataItem.a( '', b.readString( len ), len );

      case DataItem.Format.List:
        return decodeList( b, len );

      case DataItem.Format.I1:
        return decodeI1( b, len );

      case DataItem.Format.I2:
        return decodeI2( b, len );

      case DataItem.Format.I4:
        return decodeI4( b, len );

      case DataItem.Format.I8:
        return decodeI8( b, len );

      case DataItem.Format.U1:
        return decodeU1( b, len );

      case DataItem.Format.U2:
        return decodeU2( b, len );

      case DataItem.Format.U4:
        return decodeU4( b, len );

      case DataItem.Format.U8:
        return decodeU8( b, len );

      case DataItem.Format.F4:
        return decodeF4( b, len );

      case DataItem.Format.F8:
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
      return DataItem.f4( '', b.readFloat32() );
    } else {
      var count = len / nominalLen;
      var arr = [];

      for( let i = 0; i < count; ++i ){
        arr.push( b.readFloat32() );
      }

      return DataItem.f4( '', ...arr );
    }
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

  return new Decoder();
})();