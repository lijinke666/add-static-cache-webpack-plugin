/*
 * @Author: jinke.li 
 * @Date: 2017-07-10 14:32:28 
 * @Last Modified by: jinke.li
 * @Last Modified time: 2017-07-10 16:11:57
 */
const fs = require('fs')
const path = require('path')

/**
 * 
 * @param {Object} options Options object 
 * @param {String} template [options.template] cachetemp file path  | default [default temp file]
 * @param {String} cacheName [options.cacheName] cacheFile name | default  [app.appcache] 
 * @param {String} publicPath [options.publicPath] cacheFile name | default  [you webpack.config.js output publicPath] 
 * @param {String} comments [options.comments] cacheFile comments | default  [add static cache webpack plugin appCache] 
 */
function AddStaticCachePlugin(options = {}) {
    this.cacheTime = options.cacheTime || this.currentTime()
    this.template = options.template
    this.publicPath = options.publicPath || ""
    this.tempStringConfig = {
        date: "{date}",
        cssPath: "{cssPath}",
        fontsPath: "{fontsPath}",
        imagesPath: "{imagesPath}",
        comments: "{comments}",
    }
    this.defaultTplName = 'cacheTemp.tpl'
    this.defaultCacheName = 'app.appcache'
    this.defaultComments = 'add static cache webpack plugin appCache'
    this.comments = options.comments || this.defaultComments
    this.tempFilePath = path.resolve(__dirname, this.defaultTplName)
    this.tpl = this.template && this.readCacheTempFile(this.template) || this.createCacheTempFile()
    this.cacheName = options.cacheName || this.defaultCacheName
    this.defaultCacheSavePath = __dirname
}
AddStaticCachePlugin.prototype.apply = function (compiler) {
    compiler.plugin('emit', (compliation, callback) => {
        const { assets } = compliation
        const [cssPaths, fontsPath, imagesPath] = [[], [], []]
        for (let filename in assets) {

            if (/\.(jpg|jpeg|png|gif|cur|ico)$/i.test(filename)) {
                imagesPath.push(filename)
            } else if (/\.css$/i.test(filename)) {
                cssPaths.push(filename)
            } else if (/\.(eot|ttf|svg|woff|woff2)$/i.test(filename)) {
                fontsPath.push(filename)
            }
        }
        console.log(fontsPath);
        console.log(this.transformFilePath(fontsPath));
        const appcache = this.replaceFileData(this.tpl)
            (this.cacheTime)
            (this.transformFilePath(cssPaths))
            (this.transformFilePath(fontsPath))
            (this.transformFilePath(imagesPath))

        console.log('transform cache file finish');
        assets[this.cacheName] = {
            source: () => appcache,
            size: () => appcache.length
        }
        console.log(`write cache file finish , fileName => ${this.cacheName}`);
        callback()
    })

}

//文件路径 转换   change Array => paths
AddStaticCachePlugin.prototype.transformFilePath = function (paths = []) {
    if (paths.length <= 1) {
        return `${this.publicPath + paths[0]}\n`
    } else {
        return paths.reduce((str, next) => {
            str += `${this.publicPath + next}\n`
            return str
        }, "")
    }

},
    //保存模板文件 save temp cache file
    AddStaticCachePlugin.prototype.readCacheTempFile = function (saveTempPath) {
        return fs.writeFileSync(saveTempPath, this.tpl)
    }

//读取模板文件 read temp cache file
AddStaticCachePlugin.prototype.readCacheTempFile = function (tempPath) {
    return fs.readFileSync(tempPath).toString()
}
//创建模板文件 如果没有传模板路径  则使用默认模板 
//If there is no template path, use the default template
AddStaticCachePlugin.prototype.createCacheTempFile = function () {
    const tempStringConfig = this.tempStringConfig
    const defaultTpl = ` 
CACHE MANIFEST
# ${this.comments}
# ${tempStringConfig['date']}
${tempStringConfig['cssPath']}
${tempStringConfig['fontsPath']}
${tempStringConfig['imagesPath']}
${tempStringConfig['iconPath']}


NETWORK:
*
    `
    fs.writeFileSync(this.tempFilePath, defaultTpl)
    this.tpl || (this.tpl = fs.readFileSync(this.tempFilePath).toString())
    return this.tpl

}

//获取当前时间  get current time
AddStaticCachePlugin.prototype.currentTime = function () {
    const date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        hh = h < 10 ? `0${h}` : h,
        mm = m < 10 ? `0${m}` : m,
        ss = s < 10 ? `0${s}` : s

    return `${year}/${month}/${day} ${hh}:${mm}:${ss}`
}


//替换模板 reaplace cache file temp
AddStaticCachePlugin.prototype.replaceFileData = function (fileLists = "") {
    const tempStringConfig = this.tempStringConfig
    // const replaceData = fileLists.replace(tempStringConfig['date'], this.cacheTime)
    return (date) => (cssPath) => (fontsPath) => (imagesPath) => {
        return fileLists
            .replace(tempStringConfig['date'], date)
            .replace(tempStringConfig['cssPath'], cssPath)
            .replace(tempStringConfig['fontsPath'], fontsPath)
            .replace(tempStringConfig['imagesPath'], imagesPath)
    }
},

    module.exports = AddStaticCachePlugin