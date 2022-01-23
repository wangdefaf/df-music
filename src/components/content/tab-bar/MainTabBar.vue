<template>
  <div id="main-tab-bar">
    <tab-bar class="tab-bar">
      <div class="left" slot="left">
        <img src="../../../assets/img/logo.png" alt=""/>
        <span>酷内音乐盒</span>
      </div>

      <ul slot="center">
        <li @click="$router.push('/Home/discover')">
          <router-link to="/Home" tag="li" active-class="active">
            <span>发现音乐</span>
          </router-link>
        </li>
        <router-link to="/My" tag="li" active-class="active">
          <span>我的音乐</span>
        </router-link>
        <router-link to="/discover" tag="li" active-class="active">
          <span>朋友</span>
        </router-link>
        <li><a href="https://music.163.com/store/product" target="_blank">商城</a></li>
        <li><a href="https://music.163.com/st/musician" target="_blank">音乐人</a></li>
      </ul>
      <div slot="right" class="right">
        <searchVue class="search"></searchVue>
        <div class="rightSign" >
          <div class="sign" v-if="$store.state.isLogin">
          <div class="signImg"><img :src="$store.state.userUrl+'?param=100y100'" alt=""></div>
          <div class="signQuit" @click="QuitClick"><span>退出账号</span></div></div>
          <span v-else @click="loginClick">登录</span>
        </div>
      </div>
    </tab-bar>
  </div>

</template>

<script>
import TabBar from "./TabBar";
import searchVue from "@/components/content/searchVue/searchVue"

import {getLoginOut} from "@/network/getdata/login";
export default {
  name: "MainTabBar",
  data() {
    return {
      itemIndex: 0,
    }
  },
  methods: {
    loginClick() {
      if (!this.$store.state.isLogin) {
        this.$store.state.isLogShow = true
      }
    },
    QuitClick() {
      this.$router.push('/Home/discover')
      this.$cookies.remove("token")
      getLoginOut()
      window.location.reload();
      // this.$store.state.isZindex = false
      console.log('退出登录');
    },
  },
  components: {TabBar,searchVue},
  props: {
    listArray: {
      type: Array,
      default: {}
    }
  }
}
</script>

<style scoped lang="scss">
$tab-height :60px;
#main-tab-bar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 18;
  border-bottom: #adadad 1px solid;
}
/*tabbar相关插槽样式*/

.tab-bar {
  .right {
    display: flex;
    line-height: 60px;
    .search {
      flex: 8;
    }
    .rightSign {
      flex: 6;
      margin-left: 50px;
      font-size: 15px;
      cursor:pointer;
    }
  }
  .left{
    img {
      width: 35px;
      height: auto;
    }
    span {
      margin-left: 10px;
      color: #1c7430;
      font: 16px "Adobe 楷体 Std R";
    }
  }
  ul {
    display: flex;
    .active,.active>li {
      background: #ffe443;
      a {
        font-weight: bolder;
        color: #505050;
      }
    }
    >li {
      :hover {
        color: #939393;
      }
      cursor: pointer;
      line-height: $tab-height;
      height: $tab-height;
      text-align: center;
      list-style: none;
      span,a {
        padding: 0 14px;
        color: #aaaaaa;
        font-size: 16px;
        text-decoration: none;
      }
    }
  }
}
.sign {
  width: 50px;
  height: 78px;
  margin-left: 40px;
  margin-top: 10px;
  position: relative;
  .signImg {
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
  }
  .signQuit {

    display: none;
    position: absolute;
    right: 0;
    top: 59px;
    z-index: 18;
    width: 150px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    box-shadow: 0 0 10px -3px #000;
    color: #333;
  }

  img {
    width: 50px;
    height: 50px;
    vertical-align: baseline!important;
  }
}
.sign:hover .signQuit {
  display: block!important;
}
#pathHome {
  position: relative;
  z-index: 10;
}
</style>