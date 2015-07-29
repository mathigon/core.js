var path = require('path');

module.exports =  {
    entry: path.join(__dirname, '/src/index.js'),
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'core.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
        }]
    },
    resolve: {
        root: __dirname + '/src',
        extensions: ['', '.js']
    },
    resolveLoader: {
        modulesDirectories: [path.join(__dirname, 'node_modules')]
    },
    devtool: 'sourcemap'  // 'eval', 'cheap-source-map'
};
