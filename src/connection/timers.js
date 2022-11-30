const validator = require('./../utils/validation-helper')

module.exports = (function () {

	/*
	* Contains values required by control timers.
	*/
	class Timers {
		static get default(){
			return {
				t3: 45,
				t5: 10,
				t6: 5,
				t7: 10,
				t8: 5,
				linkTest: 0
			}
		}

		constructor(t3 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, lt = 0) {

			// Timer values must be set:
			// - if a value is NaN or negative throw a format exception
			// - if a value is zero - set a default value (except linktest)
			// - if a value extends an upper bound set max possible value
			// All proposed values were taken from SEMI E37-0303 (table 10)

			let tt3 = validator.getUShortInRange(t3, 't3');
			let tt5 = validator.getUShortInRange(t5, 't5');
			let tt6 = validator.getUShortInRange(t6, 't6');
			let tt7 = validator.getUShortInRange(t7, 't7');
			let tt8 = validator.getUShortInRange(t8, 't8');
			let tlt = validator.getUShortInRange(lt, 'lt');

			tt3 = (0 == tt3) ? Timers.default.t3 : ensureRange(tt3, 1, 120);
			tt5 = (0 == tt5) ? Timers.default.t5 : ensureRange(tt5, 1, 240);
			tt6 = (0 == tt6) ? Timers.default.t6 : ensureRange(tt6, 1, 240);
			tt7 = (0 == tt7) ? Timers.default.t7 : ensureRange(tt7, 1, 240);
			tt8 = (0 == tt8) ? Timers.default.t8 : ensureRange(tt8, 1, 120);
			tlt = ensureRange(tlt, 0, 120);

			// Reply timeout. Specifies maximum amount of time an
			// entity expecting a reply message will wait for that reply.
			Object.defineProperty(this, "t3", {
				get: function () { return tt3; },
				enumerable: true,
				configurable: false,
			});

			// Connection Separation Timeout. Specifies the amount of
			// time which must elapse between successive attempts to
			// connect to a given remote entity.
			Object.defineProperty(this, "t5", {
				get: function () { return tt5; },
				enumerable: true,
				configurable: false,
			});

			// Control Transaction Timeout. Specifies the time which a
			// control transaction may remain open before it is
			// considered a communications failure.
			// Similar to t3 but for control messages
			Object.defineProperty(this, "t6", {
				get: function () { return tt6; },
				enumerable: true,
				configurable: false,
			});

			// Time which a TCP/IP connection can remain in NOT
			// SELECTED state (i.e., no HSMS activity) before it is
			// considered a communications failure.
			Object.defineProperty(this, "t7", {
				get: function () { return tt7; },
				enumerable: true,
				configurable: false,
			});

			// Maximum time between successive bytes of a single
			// HSMS message which may expire before it is considered a
			// communications failure.
			Object.defineProperty(this, "t8", {
				get: function () { return tt8; },
				enumerable: true,
				configurable: false,
			});

			// Time between link test messages. If set to
			// 0 link test procedure is not used.
			Object.defineProperty(this, "linkTest", {
				get: function () { return tlt; },
				enumerable: true,
				configurable: false,
			});
		}

		/**
		 * Returns a string that represents the current object.
		 */
		toString() {
			return `t3: ${this.t3}, t5: ${this.t5}, t6: ${this.t6}, t7: ${this.t7}, t8: ${this.t8}, linktest: ${this.linkTest}`;
		}
	}

	/**
	 * Ensures that timer's value is within a specified range.
	*/
	function ensureRange(value, min, max) {
		value = Math.max(value, min)
		value = Math.min(value, max)

		return value;
	}

	return Timers;
})();

