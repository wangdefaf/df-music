<template>
<div id="singerList">
  <nav-bar-pro  :navabar-title="NavBarArray" @itemClick="itemClick">
    <h2 slot="title">
      歌手推荐
    </h2>
  </nav-bar-pro>
  <ul class="counter">
    <router-link tag="li" :to="{name:'singer',params:{id:item.id}}" v-for="(item,index,key) in singerList[index]" :key="key" :title="item.name">
      <img v-lazy="item.picUrl+'?param=182y148'" alt="" :key="item.picId">
      <p>{{ item.name }}</p>
      <span>{{ item.musicSize }}首歌曲</span>
    </router-link>
  </ul>
</div>
</template>

<script>
import NavBarPro from "@/components/content/nav-bar/NavBarPro";
export default {
name: "MainsingerList",
  data() {
    return {
      index: 0,
      NavBarArray: [{title: '华语',}, {title: '欧美',}, {title: '韩国',}, {title: '日本',}, {title: '更多>', path: '/Home/songlist',}],
    }
  },
  mounted() {
    // console.log(this.singerList);
  },
  methods: {
    itemClick(index) {
      // if ()
      this.index = index
      this.$emit('itemClick',index)
    }
  },
  props: {
    singerList: {
      type: Array,
    }
  },
  components: {NavBarPro}
}
</script>

<style scoped lang="scss">
  .counter {
    display: flex;
    margin-top: 20px;
    li {
      flex: 1;
      cursor: pointer;
      list-style: none;
      text-align: center;
      img {
        width: 182px;
        height: auto;
        border-radius: 5px;
      }
      p {
        font-size: 16px;
        margin: 0;
      }
      span {
        font-size: 14px;
        color: #787878;
      }
    }
  }
  .navbar {
    padding: 0;
  }
</style>