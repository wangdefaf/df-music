<template>
  <header>
      <div @click="navClick" class="right" >
        <h2>精选歌单</h2>
        <span>
          <up theme="outline" size="30" fill="#999999" v-if="isReverse"/>
          <down theme="outline" size="30" fill="#999999" v-else/>
        </span>
      </div>
      <div class="tags" v-if="isReverse">
          <div>
            <div v-for="(item,index,key) in playListTag" class="tag" :key="key">
              <p>{{item.Cat1}}</p>
              <span
                  v-for="(item1,index1,key1) in item.cate_gorie"
                  @click="item1Click(index1,index,item.cate_gorie)"
                  :class="{Active:optionsIndex[index] === index1}"
                  :key1="key1"
              >
                {{item1.name}}
            </span>
            </div>
          </div>
        </div>
      <nav-bar-pro class="left" :navabar-title="NavBarArray" @itemClick="itemClick"/>
  </header>
</template>

<script>
import NavBarPro from "@/components/content/nav-bar/NavBarPro";
import {Down,Up} from "@icon-park/vue";
export default {
name: "Mainheade",
  data() {
    return{
      isShow: false,
      isReverse: false,
      optionsIndex: [0,-1,-1,-1,-1,-1],
      NavBarArray: [
        {
          title: '最热',
          data: 'hot'
        },
        {
          title: '最新',
          data: 'new'
        }
      ],
    }
  },
  methods: {
    item1Click(index1,index,item) {
      this.optionsIndex = [-1,-1,-1,-1,-1,-1]
      this.$set(this.optionsIndex,index,index1)
      this.$emit('tagFun',item[index1].name)
    },
    itemClick(index) {
      this.$emit('navClick',this.NavBarArray[index].data)
    },
    navClick() {
      this.isReverse = !this.isReverse
    }
  },
  mounted() {
    // document.getElementsByClassName("tag").getElementsByTagName("span").length
    console.log(this.playListTag);
  },
  props: {
    playListTag: {
      type: Array
    }
  },
  components: {
    NavBarPro,
    Up,
    Down
  }
}
</script>

<style scoped lang="scss">
  header {
    display: flex;
    position: relative;
  }
  .right {
    flex: 0.7;
    h2 {
      display: inline-block;
      line-height: 54px;
      margin-bottom: 0;
      margin-right: 10px;
      font-size: 22px;
      font-weight: bold;
    }
    >span {position: relative; top: -4px}
  }
  .left {
    flex: 6.3;
  }
  .tags {
    width: 917px;
    height: 616px;
    z-index: 10;
    position: absolute;
    top: 60px;
    box-sizing: border-box;
    padding: 30px 10px 0 36px;
    background: #fff;
    box-shadow: 0 4px 20px 0 rgb(65 67 70 / 8%);
    >div {
      padding-right: 36px;
      width: 100%;
      height: 100%;
      overflow: scroll;
      .tag {
        margin-bottom: 14px;
        .Active {
          background: #ffe443;
        }
        span {
          display: inline-block;
          font-size: 6px;
          padding: 6px 10px;
          margin-right: 10px;
          margin-bottom: 10px;
          border-radius: 25px;
          background: #F7F7F7;
        }
        span:hover {
          background: #ffe442;
        }
      }
    }

    ::-webkit-scrollbar {
      width:8px;
      height: 20px;
    }
    /* 滚动槽 */
    ::-webkit-scrollbar-track {
      border-radius:10px;
    }
    /* 滚动条滑块 */
    ::-webkit-scrollbar-thumb {
      border-radius:10px;
      background: rgba(0, 0, 0, 0.5);
    }
    }
</style>