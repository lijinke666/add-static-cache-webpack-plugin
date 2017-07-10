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
  - default : `app.appcache`
- #### comments
  - type : `String`
  - default : `add static cache webpack plugin appCache`
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
          {imagesPath'}


          NETWORK:
          *
    `
 ```
 
 ### if your want custom template like
 `mkdir xx.tpl`
 ```
   CACHE MANIFEST
  # {comments}
  # {date}
  {cssPath}
  {fontsPath}
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
      publicPath:"/"                  // Not required Default create temp file in your `webpack.config.js` `output options publicPath`
    })
 ```
 
 #### It looks something like this after compilation
 ```
 CACHE MANIFEST
# lijinkeWeb appCache by add-static-cache-webpack-plugin
# 2017/7/10 16:40:00
/static/css/app.e2bba250.css

/static/fonts/iconfont13955767.svg
/static/fonts/iconfonta5689859.ttf
/static/fonts/iconfont75dce69e.eot
/static/fonts/iconfont57b7441e.woff

/static/images/banner1942579a6.jpg
/static/images/head_img_s09e1d321.jpg
/static/images/photo77f33a9a7.jpg
/static/images/she_1_sa0a30db8.jpg
/static/images/my_3_se69998bd.jpg
/static/images/photo4_sb32f212d.jpg
/static/images/github_sedd18534.jpg
/static/images/alipay6d19f782.jpg
/static/images/head_img6f56905f.jpg
/static/images/photo897809533.jpg
/static/images/photo5_s8d6f8ac3.jpg
/static/images/my_335b43718.jpg
/static/images/she_1d1632cd9.jpg
/static/images/photo9_s58a24e01.jpg
/static/images/photo9a60a685a.jpg
/static/images/photo614dd11d3.jpg
/static/images/photo54f4b8ab5.jpg
/static/images/photo3_s42251b68.jpg
/static/images/my_1138a18b4.jpg
/static/images/photo6_s8fe89098.jpg
/static/images/defaultc08c2bfe.jpeg
/static/images/my_2a8d6c726.jpg
/static/images/my_4184eb022.jpg
/static/images/my_4_sbdcc7fc1.jpg
/static/images/my_1_saf200dc6.jpg
/static/images/photo1cf8fcd45.jpg
/static/images/photo43b47208f.jpg
/static/images/photo3ef6edcc5.jpg
/static/images/githubf498d407.png
/static/images/my_2_sba9b9c65.jpg
/static/images/photo1_s07f97174.jpg
/static/images/weChatPayf7628413.png


NETWORK:
*

FALLBACK
# feeStyle
/static/ /404.html
 ```
