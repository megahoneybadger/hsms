const path = require('path');

module.exports = {
	entry: './src/hsms.js',
	output:{
		path: path.resolve( __dirname, 'dist' ),
		filename: 'hsms-driver.js'
	},

	node: {
		net: 'empty',
		tls: 'empty',
		dns: 'empty'
	},

	performance: { hints: false }

}

