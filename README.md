# add-static-cache-webpack-plugin
add static cache manifest  file in yours project , webpack build after create HTML5 Cache Manifest File , add your css,image,fonts in this cahce file 

## Installation
```
npm install add-static-cache-webpack-plugin --save-dev
```
### How to Use ?

- webpack.config.js
```javascript
const AddStaticCachePlugin = require('add-static-cache-webpack-plugin')

...

module.exports = {
  ...
  plugins: [
    new AddStaticCachePlugin({
      tempalte:"",                    // Not required Default template  See the instructions below
      cacheName:"jinke.appcache",     // Not required Default `app.appcache`
      comments:"I am commnets",       // Not required Default `add static cache webpack plugin appCache`
      publicPath:"/"                  // Not required Default create temp file in your `webpack.config.js` `output options publicPath`
    })
  ]
};
```

### options
--- 
- #### template
  - type : `String`
  - default : `{DEFAULT TEMP FILE}`
- #### cacheName
  - type : `String`
  - default : `'app.appcache'`
- #### comments
  - type : `String`
  - default : `'add static cache webpack plugin appCache'`
- #### publicPath
  - type : `String`
  - default : ""
  
 ---
 
 ### DEFAULT TEMP FILE
 ```
     const defaultTpl = ` 
          CACHE MANIFEST
          # add static cache webpack plugin appCache
          # {date}
          {cssPath}
          {fontsPath}
          {imagesPath}
          {jsPath}


          NETWORK:
          *
    `
 ```

 ### temp placeholder
 - ##### {date}
 - ##### {cssPath}
 - ##### {jsPath}
 - ##### {fontsPath}
 - ##### {comments}
 
 ### if your want custom template like
 `mkdir xx.tpl`
 ```
   CACHE MANIFEST
  # {comments}
  # {date}
  {cssPath}
  {fontsPath}
  {jsPath}
  {imagesPath}

  NETWORK:
  *

  FALLBACK
  # feestyle
  /static/ /404.html
  
 ```
 #### Then
 
 ```javascript
     new AddStaticCachePlugin({
      tempalte:"./xx.tpl",                    // Not required Default template  See the instructions below
      cacheName:"jinke.appcache",     // Not required Default `app.appcache`
      comments:"I am commnets",       // Not required Default `add static cache webpack plugin appCache`
      publicPath:"/static/"                  // Not required Default create temp file in your `webpack.config.js` `output options publicPath`
    })
 ```
 
 #### It looks something like this after compilation
 ```
 CACHE MANIFEST
# lijinkeWeb appCache by add-static-cache-webpack-plugin
# 2017/7/10 16:40:00
/static/css/app.e2bba250.css

/static/js/app.746fs3.js

/static/fonts/iconfont13955767.svg
/static/fonts/iconfonta5689859.ttf
/static/fonts/iconfont75dce69e.eot
/static/fonts/iconfont57b7441e.woff

/static/images/banner1942579a6.jpg
/static/images/head_img_s09e1d321.jpg


NETWORK:
*

FALLBACK
# feeStyle
/static/ /404.html
 ```
