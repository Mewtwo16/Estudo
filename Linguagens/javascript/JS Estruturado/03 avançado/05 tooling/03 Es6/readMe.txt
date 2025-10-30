
1 - Instalação do babel(com loader para webpack) e webpack como dev dependencies:
npm i --save-dev @babel/preset-env @babel/cli @babel/core babel-loader webpack webpack-cli

2- Instalação do core-js e do regenerator runtime
npm i core-js regenerator-runtime 

3 - Criação do arquivo webpack.config.js:

const path = require ('path'); // CommonJS

module.exports = {
    mode: 'development', // Modo de trabalho
    entry: './src/index.js', // Arquivo de entrada
    output: {
        path: path.resolve(__dirname, 'public', 'assets', 'js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env']
                }
            }
        }]
    },
    devtool: 'source-map', // Mapei os erros no arquivo original
}

