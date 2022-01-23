<template>
<header id="header">
  <div class="top">
    <h2>{{TopListDetail.name}}</h2>
    <span>{{TopListDetail.updateFrequency}}</span>
  </div>
  <div class="bottom">
    <ul>
      <li @click="PlayAll">
        <play class="icon" theme="outline" size="25" fill="#b1b1b1"/>
        <span>播放全部</span>
      </li>
    </ul>
  </div>

</header>
</template>

<script>
import {Play,Add,Like} from '@icon-park/vue'
export default {
name: "Mainheader",
  methods: {
    PlayAll() {
      let ids = []
      for (let item of this.songlist) ids.push(item.id)
      this.$store.commit('playAll',ids)
      //console.log(this.$store.state.songId);
    }
  },
  components: {
    Play,
    Add,
    Like,
  },
  props: {
  TopListDetail: {
    type: Object
  },
  songlist : {
    type: Array
  }
}
}
</script>

<style scoped lang="scss">
#header {
  .top {
    display: flex;
    height: 48px;
    line-height: 68px;
    h2 {
      margin: 0;
      font-size:40px;
      font-weight: bolder;
    }
    span {
      margin-left: 20px;
      font-size: 14px;
      color: #999;
    }
  }
  .bottom {
    margin-top: 20px;
    ul {
      display: flex;
     li {
       height: 38px;
       line-height: 38px;
       border-radius: 20px;
       padding: 0 25px;
       margin-left: 20px;
       list-style: none;
       background: #d0d0d0;
       .icon {
         margin-right: 6px;
         position: relative;
         top: -2px;
       }
       span {
         color: #444444;
       }
     }
      li:nth-child(1) {
        margin: 0;
        background: #ffe443;
      }
    }
  }
}
</style>