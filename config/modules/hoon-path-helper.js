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

/* 커스텀 셋팅, 모듈 */
const setting = require("../setting/path.js");
const {hoonsole} = require("../modules/hoon-console.js");

let entryFromViews = {};
let pluginsFromViews = [];

function resolveWithViewsPath(...paths){
    return path.resolve(setting.VIEWS_PATH, ...paths);
}

let isDistructingCleared = true;
hoonsole.log("Distructing views directory ...");
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
    catch(e){
        isDistructingCleared = false;
        if(e.code == "ENOENT"){
            hoonsole.error("Can't Find 'views' directory in 'src'");
        }
        else{
            hoonsole.error("Can't distructing views directory");
            console.dir(e);
        }
        return;
    }
})();
hoonsole.log("Distructing views directory ..."+(isDistructingCleared?"\x1b[32mO\n":"\x1b[31mX\n"));

module.exports = {
    resolveWithViewsPath,
    entryFromViews,
    pluginsFromViews
}