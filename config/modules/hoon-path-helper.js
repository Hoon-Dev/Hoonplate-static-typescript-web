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
const { hoonsole } = require("../modules/hoon-console.js");

let entryFromViews = {};
let pluginsFromViews = [];

function resolveWithViewsPath(...paths){
    return path.resolve(setting.VIEWS_PATH, ...paths);
}

function isRoutableDirectory(dirent){
    let routableFileCount = 0;
    for(let i=0;i<dirent.length;i++){
        if(dirent[i].name == "index.html" || dirent[i].name == "index.js"){
            if(++routableFileCount == 2) return true;
        }
    }
    return false;
}

let isDistructingCleared = true;
hoonsole.log("Distructing views directory ...");
(function findDirectoryPathInViews(recentPath=""){
    try{
        let findedPaths = fs.readdirSync(resolveWithViewsPath(recentPath), {withFileTypes: true});
        if(isRoutableDirectory(findedPaths)){
            entryFromViews[recentPath] = resolveWithViewsPath(`${recentPath}/index.js`);
            pluginsFromViews.push(
                new HtmlWebpackPlugin({
                    chunks: [recentPath],
                    filename: (recentPath == "index") ? `${recentPath}.html` : `${recentPath}/index.html`,
                    template: resolveWithViewsPath(`${recentPath}/index.html`)
                })
            );
        }
        for(let i=0;i<findedPaths.length;i++){
            if(findedPaths[i].isDirectory())
                findDirectoryPathInViews(recentPath ? `${recentPath}/${findedPaths[i].name}` : findedPaths[i].name);
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