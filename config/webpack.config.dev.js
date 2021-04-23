/*
    name: webpack.config.dev
    author: Hoon-Dev
    date: 21.04.23
    
    desc: 개발용 웹팩 설정 모듈
*/

module.exports = {
    mode: "development",
    ...require("./webpack.config.js")
}