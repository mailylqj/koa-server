const path = require('path');
const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
module.exports = {
    entry: path.resolve(__dirname, '../src/component/index.js'),
    output: {
        filename: "shaking-test.js",
        // path: path.resolve(__dirname, '../../koa-server/node_modules/@jd/shaking-test/dist/'),
        path: path.resolve(__dirname, '../dist/'),
        library: 'shaking-test',
        libraryTarget: 'umd'
    },
    module:{
        rules: [{
			test: /\.(j|t)sx?$/,
			exclude: /node_modules/,
			use: ['happypack/loader?id=happybabel']
		}]
    },
    plugins: [
        new HappyPack({
			id: 'happybabel',
			loaders: [{
				loader: 'babel-loader',
            	options: {
					presets: [
						["@babel/preset-env", {
							modules: false,
							loose: true
						}]
					]
				}
			}],
			threadPool: happyThreadPool,
			verbose: true
		})
    ]
}