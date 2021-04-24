/*
    name: webpack.config.dev
    author: Hoon-Dev
    date: 21.04.23
    
    desc: 개발용 웹팩 설정 모듈
*/

/* Node.js 모듈 */
const path = require("path");

module.exports = {
    mode: "development",
    ...require("./webpack.config.js"),
    devServer: {
        open: true,
        port: 8080,
        overlay: true,
        compress: true,
        disableHostCheck: true,
        contentBase: path.join(__dirname, '../dist')
    }
}