# Simple Twitter
<p align="center">
   <img src="https://raw.githubusercontent.com/wintersprouter/Simple-Twitter-Vue/master/src/assets/img/demo/demo2.png"/>
</p>
這是一個使用 Vue 2.0 前端框架開發的 Simple Twitter SPA 專案，串接 RESTFul API 後端專案 https://github.com/wintersprouter/Simple-Twitter-API ，以滿足社群網站不同資料的互動需求。

 ## Outline-目錄
- [Live Demo - 專案Demo](#Live-Demo-專案Demo)
- [Features - 實作功能](#Features-實作功能)
- [How to use - 使用說明](#How-to-use-使用說明)
- [Installing - 專案安裝流程](#Installing-專案安裝流程)
- [Contributor - 開發人員](#Contributor-開發人員)

 ## Live Demo-專案Demo
 ### Demo 網址
 [Simple-Twitter-Demo](https://wintersprouter.github.io/Simple-Twitter-Vue/#/)

 ### Demo 帳號
使用者可以使用以下帳號分別登入系統前台、後台。

|role| account | password |
| -------- | -------- | -------- |
| user   | RyanHuang   | 12345678    
| admin  | root   | 12345678  |

## Features-實作功能
- 使用 Vue 2 前端框架打造 SPA 專案
- 將當前使用者、熱門追蹤清單、登入狀態等資訊放入 vuex 進行狀態管理
- 使用 Vue Components props/emit 實踐組件資料傳遞
- 使用 Vue Router 統一管理應用所有狀態
- 利用 Vue UI Library Vuetify 開發網頁元件
- 使用 Sass 工具提高 css 維護性和重用性
- 使用 axios 串接後端 API
- 前端登入、註冊功能使用 vuelidate 套件進行資料驗證
- 利用 sweetalert2 套件實作彈出訊息
- 使用 moment.js 整合時間格式
- RWD 切版以 Vuetify breakpoint、scss、flex、position 進行實作

## How to use-使用說明 
### 前台使用說明 
<p align="center">
<img src="https://raw.githubusercontent.com/wintersprouter/Simple-Twitter-Vue/master/mobile%20demo%20pictures/signup.png" width=300/>
<img src="https://raw.githubusercontent.com/wintersprouter/Simple-Twitter-Vue/master/mobile%20demo%20pictures/signin.png" width=300/> 
<p align="center" >
使用者可以註冊一個帳號後，登入前台頁面
</p>
</p>   


<p align="center" >
<img src="https://raw.githubusercontent.com/wintersprouter/Simple-Twitter-Vue/master/mobile%20demo%20pictures/home.png" width=300/>
<p align="center" >
使用者可以登入後會跳轉至首頁，使用者可以在首頁瀏覽最新推文、發布推文、對推文點讚或收回讚、回覆推文，點擊推文即可進入單一推文詳細頁面
</p>
</p>

<p align="center" >
<img src="https://raw.githubusercontent.com/wintersprouter/Simple-Twitter-Vue/master/mobile%20demo%20pictures/tweet.png" width=300/>
<p align="center" >
使用者可以瀏覽推文詳細資訊及所有回覆的推文，同時亦可對推文點讚或收回讚、回覆推文
</p>
</p>

<p align="center" >
<img src="https://raw.githubusercontent.com/wintersprouter/Simple-Twitter-Vue/master/mobile%20demo%20pictures/reply.png" width=300/>
<p align="center" >
使用者可以回覆推文
</p>
</p>


<p align="center" >
<img src="https://raw.githubusercontent.com/wintersprouter/Simple-Twitter-Vue/master/mobile%20demo%20pictures/profile.png" width=300/>
<p align="center" >
使用者可以瀏覽使用者檔案，包含使用者追隨狀態、該使用者所有發布的推文、回覆的推文、喜歡的推文
</p>
</p>

<p align="center" >
<img src="https://raw.githubusercontent.com/wintersprouter/Simple-Twitter-Vue/master/mobile%20demo%20pictures/editprofile.png" width=300  />
<p align="center" >
使用者點擊編輯個人檔案按鈕即可編輯個人大頭貼、封面、姓名、自我介紹
</p>
</p>

<p align="center" >
<img src="https://raw.githubusercontent.com/wintersprouter/Simple-Twitter-Vue/master/mobile%20demo%20pictures/following.png"  width=300/>
<img src="https://github.com/wintersprouter/Simple-Twitter-Vue/blob/master/mobile%20demo%20pictures/follower.png" width=300 />
<p align="center" >
使用者可以查看追隨中/追隨者清單，並點擊追隨按鈕追隨或取消追隨其他使用者
</p>
</p>

<p align="center" >
<img src="https://raw.githubusercontent.com/wintersprouter/Simple-Twitter-Vue/master/mobile%20demo%20pictures/editprofile.png" width=300  />
<p align="center" >
使用者點擊編輯個人檔案按鈕即可編輯個人大頭貼、封面、名稱、自我介紹
</p>
</p>

<p align="center" >
<img src="https://raw.githubusercontent.com/wintersprouter/Simple-Twitter-Vue/master/mobile%20demo%20pictures/setting.png" width=300  />
<p align="center" >
使用者可以設定帳號、名稱、信箱、密碼
</p>
</p>

<p align="center" >
<img src="https://raw.githubusercontent.com/wintersprouter/Simple-Twitter-Vue/master/mobile%20demo%20pictures/post.png" width=300  />
<p align="center" >
點擊羽毛筆的按鈕，使用者可以發布 140 字以內的推文
</p>
</p>

### 後台使用說明 

<p align="center" >
<img src="https://raw.githubusercontent.com/wintersprouter/Simple-Twitter-Vue/master/mobile%20demo%20pictures/adminlogin.png" width=300  />
<p align="center" >
只有管理員有權限登入後台
</p>
</p>
<p align="center" >
<img src="https://raw.githubusercontent.com/wintersprouter/Simple-Twitter-Vue/master/mobile%20demo%20pictures/alltweet.png" width=300  />
<img src="https://raw.githubusercontent.com/wintersprouter/Simple-Twitter-Vue/master/mobile%20demo%20pictures/delete.png" width=300  />
<p align="center" >
管理員可以查看所有推文，可以搜尋推文，可以依據 id 、時間、讚數...等排序推文，可以點擊垃圾桶刪除該推文
</p>
</p>
<p align="center" >
<img src="https://raw.githubusercontent.com/wintersprouter/Simple-Twitter-Vue/master/mobile%20demo%20pictures/users.png" width=300  />
<p align="center" >
管理員可以查看所有平台使用者，包含其推文數、獲得讚數、追隨中/追隨者數
</p>
</p>
                 
                 

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
  ]
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
