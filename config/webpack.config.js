/*
    name: webpack.config
    author: Hoon-Dev
    date: 21.04.23

    desc: 웹팩 공통 설정 중개모듈
*/
require("./modules/hoon-console.js").hoonsole.title();

/* 커스텀 모듈 */
const path = require("./setting/path.js");
const { entryFromViews, pluginsFromViews } = require("./modules/hoon-path-helper.js");

/* Webpack 플러그인 */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        ...entryFromViews
    },
    output: {
        path: path.OUTPUT_PATH,
        filename: "js/[chunkhash].js",
        environment: {
            const: false,
            forOf: false,
            module: false,
            arrowFunction: false,
            bigIntLiteral: false,
            destructuring: false,
            dynamicImport: false
        }
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },
    plugins:[
        ...pluginsFromViews,
        new CleanWebpackPlugin()
    ],
    resolve: {
        alias: {
          "@": path.SRC_PATH,
          "@assets": path.ASSETS_PATH,
          "@modules": path.MODULES_PATH,
          "@views": path.VIEWS_PATH
        }
    }
}