/*
    name: path
    author: Hoon-Dev
    date: 21.04.23

    desc: 주요 경로 설정파일
*/

/* Node.js 모듈 */
const path = require("path");

module.exports = {
    OUTPUT_PATH: path.resolve(__dirname, "../../dist"),
    SRC_PATH: path.resolve(__dirname, "../../src"),
    ASSETS_PATH: path.resolve(__dirname, "../../src/assets"),
    MODULES_PATH: path.resolve(__dirname, "../../src/modules"),
    VIEWS_PATH: path.resolve(__dirname, "../../src/views")
}