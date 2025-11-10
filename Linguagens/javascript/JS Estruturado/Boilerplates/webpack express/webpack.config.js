const path = require ('path'); // CommonJS

module.exports = {
    mode: 'development', // Modo de trabalho
    entry: './frontend/main.js', // Arquivo de entrada
    output: {
        path: path.resolve(__dirname, 'public', 'assets', 'js'),
        filename: 'bundle.js'
    },
    
    module: {
        // Array de objetos de regras
        rules: [{
            exclude: /node_modules/,
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env']
                }
            }, 
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    devtool: 'source-map', // Mapei os erros no arquivo original
}