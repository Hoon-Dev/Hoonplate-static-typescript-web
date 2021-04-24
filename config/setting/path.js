/*
    name: path
    author: Hoon-Dev
    date: 21.04.23

    desc: 주요 경로 설정파일
*/

/* Node.js 모듈 */
const path = require("path");

module.exports = {
    VIEWS_PATH: path.resolve(__dirname, "../../src/views")
}