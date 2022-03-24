const path = require('path')
module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, '../maps_admin/static/maps_admin/'),
        filename: 'maps_admin.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
}