# Simple Twitter
<p align="center">
   <img src="https://raw.githubusercontent.com/wintersprouter/Simple-Twitter-Vue/master/src/assets/img/demo/demo2.png"/>
</p>
 這是一個使用 Vue 2.0 前端框架開發的 Simple Twitter SPA 專案，串接後端 RESTFul API [Simple Twitter RESTful API](https://github.com/wintersprouter/Simple-Twitter-API) ，以滿足社群網站不同資料的互動需求。

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
- [Features - 實作功能](#Features-實作功能)
- [Installing - 專案安裝流程](#Installing-專案安裝流程)
- [Contributor - 開發人員與工作分配](#Contributor-開發人員)

## Features-實作功能
- 使用 Vue 2 前端框架打造 SPA 專案
- 將當前使用者、熱門追蹤清單、登入狀態等資訊放入 vuex 進行狀態管理
- 利用 Vue UI Library Vuetify 開發網頁元件
- 使用 Sass 工具提高 css 維護性和重用性
- 使用 axios 串接後端 API
- 前端登入、註冊功能使用 vuelidate 套件進行資料驗證
- 利用 sweetalert2 套件實作彈出訊息
- 使用 moment.js 整合時間格式
- RWD 切版以 Vuetify breakpoint、scss、flex、position 進行實作

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