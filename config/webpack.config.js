/* Node.js 모듈 */
const path = require("path");

/* Webpack 플러그인 */
const HtmlWebpackPlugin = require("html-webpack-plugin");

/* 커스텀 플러그인 */
const {resolveWithViewsPath, entryFromViews, pluginsFromViews} = require("./modules/hoon-path-helper.js");

module.exports = {
    entry: {
        ...entryFromViews
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "js/[chunkhash].js"
    },
    module:{
        rules: [
        ]
    },
    plugins:[
        ...pluginsFromViews
    ]
}