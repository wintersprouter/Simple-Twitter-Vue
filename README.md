# Simple Twitter
<p align="center">
   <img src="https://raw.githubusercontent.com/wintersprouter/Simple-Twitter-Vue/master/src/assets/img/demo/demo2.png"/>
</p>

 ## Live Demo 
 ### Demo 網址
 [Simple-Twitter-Demo](https://wintersprouter.github.io/Simple-Twitter-Vue/#/)

 ### Demo 帳號
使用者可以使用以下帳號分別登入系統前台、後台。

|role| account | password |
| -------- | -------- | -------- |
| user   | RyanHuang   | 12345678    
| admin  | root   | 12345678  |

 ## Outline-目錄
- [How to use - 使用說明](#How-to-use-使用說明)
- [Features - 實作功能](#Features-實作功能)
- [Installing - 專案安裝流程](#Installing-專案安裝流程)
- [Contributor - 開發人員與工作分配](#Contributor-開發人員)

## Installing-專案安裝流程
1. 請在終端機輸入
```
$ git clone https://github.com/wintersprouter/Simple-Twitter-Vue.git
$ cd Simple-Twitter-Vue
```
2. 
```
$ npm install
```

3. 新增 vue.config.js

```
$ touch vue.config.js
```

4. 在 vue.config.js 中，新增以下內容

```
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Simple-Twitter-Vue/'
    : '/'
}

```
5. 

```
npm run serve
```
6. 將可在終端機上看到以下訊息
```
> App running at:
  - Local:   http://localhost:8080/
  - Network: http://<Your Virtual IP>:8080/
```

## Contributor-開發人員
#### [Chia-Hui Hsueh](https://github.com/wintersprouter)