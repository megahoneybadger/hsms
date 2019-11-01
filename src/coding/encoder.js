const ByteBuffer = require("bytebuffer");
const constants = require('../utils/string-resources');

const Message = require("../messages/message")
const SelectReq = require("../messages/control/select-req")
const SelectRsp = require("../messages/control/select-rsp")
const DeselectReq = require("../messages/control/deselect-req")
const DeselectRsp = require("../messages/control/deselect-rsp")
const LinkTestReq = require("../messages/control/link-test-req")
const LinkTestRsp = require("../messages/control/link-test-rsp")
const SeparateReq = require("../messages/control/separate-req")

module.exports = (function () {

	/**
	 * Encodes messages into binary stream.
	 */
	class Encoder {
		static encode(m) {
			if (!(m instanceof Message)) {
				throw new TypeError(constants.NOT_SUPPORTED_OBJECT_TYPE);
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
			}

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

	return Encoder;
})();
