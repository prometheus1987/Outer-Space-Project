module.exports = {
    entry: './app/assets/js/components/app.module',
    output: {
        filename: './app/dist/bundle.js'
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
        contentBase: './' // configuring from where content needs to be served
    }
};