/*
    name: webpack.config.prod
    author: Hoon-Dev
    date: 21.04.23

    desc: 빌드용 웹팩 설정 모듈
*/

module.exports = {
    mode: "production",
    ...require("./webpack.config.js")
}