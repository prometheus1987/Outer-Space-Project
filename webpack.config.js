module.exports = {
    entry: './app/assets/js/app.module',
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/, // which file needs to be read
                exclude: /node_modules/, // which folder needs not to be read
                loader: ['babel-loader'] // which transplier/compiler/plugin to compile files
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    devServer: {
        port: 3000, // configuring port for localserver
        publicPath: "/",
        contentBase: "./app",
    }
};