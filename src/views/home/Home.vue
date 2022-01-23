<template>
<div id="home">
  <nav-bar :navabar-title="NavBarArray" class="navbar"/>
  <keep-alive>
    <router-view class="view"/>
  </keep-alive>
</div>
</template>

<script>
//网络请求相关
import NavBar from "@/components/content/nav-bar/NavBar";
//组件相关
export default {
  name: "Home",
  data() {
    return {
      NavBarArray: [
        {
          title: '推荐',
          path: '/Home/discover',
        },
        {
          title: '排行榜',
          path: '/Home/rankList',
        },
        {
          title: '歌手',
          path: '/Home/songlist',
        },
        {
          title: '歌单',
          path: '/Home/artist',
        },
        {
          title: 'MV',
          path: '/Home/mv',
        },
      ],
    }
  },
  components: {NavBar},
}
</script>

<style scoped lang="scss">
#home {
  width: 100%;
  height: 100%;
  .navbar {
    margin-bottom: 20px;
  }
  .view {
    margin: 20px auto;
    width: 1400px;
  }
}
</style>