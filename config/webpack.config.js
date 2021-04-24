/*
    name: webpack.config
    author: Hoon-Dev
    date: 21.04.23

    desc: 웹팩 공통 설정 중개모듈
*/
require("./modules/hoon-console.js").hoonsole.title();

/* Node.js 모듈 */
const path = require("path");

/* 커스텀 모듈 */
const {entryFromViews, pluginsFromViews} = require("./modules/hoon-path-helper.js");

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