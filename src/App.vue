<template id="template">
  <div id="app" @error="errorTreat">
    <login id="login" v-if="$store.state.isLogShow"/>
    <main-tab-bar :list-array="listArray"/>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <loading/>
      <backtop class="side">
        <to-top theme="outline" size="30" fill="#808080"/>
      </backtop>
    <vueAudio ref="vueAudio"/>
    <FooterBar></FooterBar>
  </div>
</template>

<script>
import {ToTop} from '@icon-park/vue'//图标
import {Backtop} from 'element-ui'//ui组件
//组件
import MainTabBar from "@/components/content/tab-bar/MainTabBar";
import FooterBar from "@/components/common/footer/footerBar";
import SideNav from "@/components/common/sidenav/SideNav";
import Loading from "@/components/common/loading/loading";
import Login from "@/components/common/login/login";
import vueAudio from "@/components/common/vueAudio/vueAudio";
//网络请求
import {getUesrAccount} from "./network/getdata/my";

export default {
  data() {
    return {
      listArray: [
        {title: '发现音乐', path: '/Home',},
        {title: '我的音乐', path: '/My',},
        {title: '朋友', path: '/discover',},
      ],
    }
  },
  methods: {
    userDet() {
      //请求用户头像
      getUesrAccount().then(res => {
        this.$store.state.userUrl = res.data.profile.avatarUrl
      }).catch(err => console.log(err))
    },
    errorTreat() {
      return true
    }
  },
  components: {vueAudio, Login, Loading, SideNav, FooterBar, MainTabBar,ToTop,Backtop},
  created() {
    if (this.$cookies.get("token")) {
      console.log('已经登陆');
      this.$store.state.isLogin = true
      this.userDet()
    } else {
      console.log('未登录');
    }
  }
}

</script>

<style lang="scss">
@import "assets/css/base.css";
#app {
  padding-top: 60px;
  width:100%;
  height:100%;
}
.side{
  position: fixed;
  z-index: 18;
  top: 750px;
  right:80px;
}
</style>
