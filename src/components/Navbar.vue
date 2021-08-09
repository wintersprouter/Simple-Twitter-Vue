<template>
  <nav>
    <div class="container">

      <ul class="nav__list nav__list--brand">
        <v-btn icon color="primary" class="nav__brand__link">
          <v-icon class="nav__brand__icon" >mdi-twitter</v-icon>
        </v-btn>
      </ul>


      <ul class="nav__list nav__list--user">
        <li  v-for="userOption in userOptins" :key="userOption.id" class="nav__list__item">
          <!-- <router-link class="nav__list__item__link"> -->
            <img src="" alt="" class="nav__list__item__link__icon" :id="userOption.name">
            <div class="nav__list__item__link__title">{{userOption.title}}</div>
          <!-- </router-link> -->
        </li>
        <li class="nav__list__item">
          <button class="nav__list__item__btn">推文</button>
        </li>
      </ul>

      <ul class="nav__list nav__list--admin">
        <li v-for=" adminOption in adminOptins" :key="adminOption.id" class="nav__list__item">
          <!-- <router-link class="nav__list__item__link"> -->
            <img src="" alt="" class="nav__list__item__link__icon" :id="adminOption.name">
            <div class="nav__list__item__link__title">{{adminOption.title}}</div>
          <!-- </router-link> -->
        </li>
      </ul>

      <ul class="nav__list nav__list--logout">
        <img src="" alt="" class="nav__list__item__link__icon">
        <div class="nav__list__item__link__title">登出</div>
      </ul>

    </div>
  </nav>


</template>
<script>
  export default {
    name: 'Navbar',
    data: () => {
      return {
        userOptins: [
          {
            id:1,
            name:'homepage',
            title: '首頁',
          },
          {
            id:2,
            name:'user-info',
            title: '個人首頁',
          },
          {
            id:3,
            name:'setting',
            title: '設定',
          },
        ],
        adminOptins: [
          {
            id:1,
            name:'tweets-list',
            title: '推文清單',
          },
          {
            id:2,
            name:'user-list',
            title: '使用者列表',
          }
        ],
      }
    },
  }
</script>
