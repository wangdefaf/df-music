<template>
  <div class="main-nav-bar">
    <header>
     <nav-bar-pro :navabar-title="NavBarArray" class="navbar" @itemClick="itemClick"></nav-bar-pro>
    </header>
      <ul>
        <li v-for="(item,index,key) in toplists[Index]"
            :key="key"
            @click="toplistClick(item,index)"
            :class="{active:itemIndex===index}">
          <div class="imgBox">
            <img :src="item.coverImgUrl+'?param=60y60'" alt="">
          </div>
          <div class="text">
            <p>{{item.name}}</p>
            <p>{{item.updateFrequency}}</p>
          </div>
        </li>
      </ul>
  </div>

</template>

<script>
import NavBarPro from "../../../components/content/nav-bar/NavBarPro";
export default {
  name: "MainNavBar",
  data() {
    return {
      Index: 0,
      itemIndex: 0,
      itemValue: [],
      NavBarArray: [{title: '官方榜',}, {title: '特色榜',},],
    }
  },
  props: {
    toplists: {
      type: Array
    }
  },
  methods: {
    // 头部导航点击事件
    itemClick(index) {
      this.Index = index
      this.itemIndex = 0
      //console.log(index);
      this.$emit('itemClick',index)
    },
    //
    toplistClick(value,index) {
      this.itemValue = value
      this.itemIndex = index
      //console.log(value);
      this.$emit('toplistId',value)
    }
  },
  components: {NavBarPro}

}
</script>

<style scoped lang="scss">
.main-nav-bar {
  padding: 0;
  width: 264px;
  box-shadow: -10px -10px 80px #eee;
  header {
    width: 100%;
    padding-bottom: 10px
  }
  ul {
    border-top: 1px solid #999;
    padding-top: 10px;
    li:hover {
      background: #f5f5f5;
    }
    .active {
      background: #eaeaea!important;
    }
    li {
      padding: 0 20px;
      width: 264px;
      height: 80px;
      list-style: none;
      display: flex;
      .imgBox {
        flex: 3;
        img {
          margin-top: 10px;
          width: 60px;
          height: 60px;
          vertical-align: middle;
        }
      }
      .text {
        flex: 7;
        font-size: 14px;
        padding-left: 20px;
        p:nth-child(1) {
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          color: #333333;
          margin: 15px 0 5px;
        }
        p:nth-child(2) {
          color: #999999;
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>