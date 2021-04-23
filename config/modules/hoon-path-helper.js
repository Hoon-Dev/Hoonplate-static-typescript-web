/*
    name: hoon-path-helper
    author: Hoon-Dev
    date: 21.04.23

    desc: Views의 entry, plguins 자동 추출 및 패스 도우미
*/

/* Node.js 모듈 */
const path = require("path");
const fs = require("fs");

/* Webpack 플러그인 */
const HtmlWebpackPlugin = require("html-webpack-plugin");

/* 커스텀 셋팅 */
const setting = require("../setting/path.js");

let entryFromViews = {};
let pluginsFromViews = [];

function resolveWithViewsPath(...paths){
    return path.resolve(__dirname, setting.VIEWS_PATH, ...paths);
}

(function findDirectoryPathInViews(recentPath="", depth=0){
    try{
        var findedPaths = fs.readdirSync(resolveWithViewsPath(recentPath), {withFileTypes: true});
        for(var i=0;i<findedPaths.length;i++){
            if(findedPaths[i].isDirectory()){
                let currentPath = recentPath ? `${recentPath}/${findedPaths[i].name}` : findedPaths[i].name;
                entryFromViews[currentPath] = resolveWithViewsPath(`${currentPath}/index.js`);
                pluginsFromViews.push(
                    new HtmlWebpackPlugin({
                        chunks: [currentPath],
                        filename: !depth ? `${currentPath}.html` : `${currentPath}/index.html`,
                        template: resolveWithViewsPath(`${currentPath}/index.html`)
                    })
                );
                findDirectoryPathInViews(currentPath, depth+1);
            }
        }
    }
    catch(e){return;}
})();

module.exports = {
    resolveWithViewsPath,
    entryFromViews,
    pluginsFromViews
}