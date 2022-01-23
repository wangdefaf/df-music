<template>
  <div id="header">
    <collapse v-model="activeName" accordion>
      <collapse-item id="collapse" :name="item1.index" v-for="(item1,index1,key1) in playlistTitle" :key="key1" @click.native="cutoverClick(index1)">
        <div id="title" slot="title">
          {{item1.title}}
        </div>
        <div id="collapseItems">
          <div id="collapseItem" v-for="(item,index,key) in item1.data"
               :title="item.name"
               :key="key"
               @click="itemClick(index1,index)"
               :class="{active:itemIndex===index}">
            <div class="imgBox"><img :src="item.coverImgUrl+'?param=80y80'" alt=""></div>
            <div class="text"><p>{{item.name}}</p></div>
          </div>
        </div>
      </collapse-item>
    </collapse>
  </div>
</template>

<script>
import { Collapse,CollapseItem } from 'element-ui';
export default {
  name: "Mainheader",
  data() {
    return {
      itemIndex: 0,
      index: 0,
      activeName: '1'
    }
  },
  components: {
    Collapse,
    CollapseItem
  },
  methods: {
    itemClick(index1,index) {
      this.itemIndex = index
      this.$emit('itemClick',index1,index)
    },
    cutoverClick(index) {
      if (this.index !== index) {
        this.index = index
        this.$emit('Cutover',index)}
    }
  },
  props: {
    playlistTitle: {
      type: Array
    }
  }
}
</script>

<style scoped lang="scss">
#header {
  width: 100%;
  height: 100%;
  >div {
    border: none;
  }
    #collapse {
      padding: 5px 10px;
      width: 284px;
      #collapseItems {
        height: 900px;
        overflow: scroll;
        #collapseItem{
          display: flex;
          height: 80px;
          list-style: none;
          border-right: 1px #ccc solid;
        }
        #collapseItem:hover {
          background: #f5f5f5;
        }
      }
      #title {
        font-size: 20px;
        font-weight: bolder;
      }
      .active {
        background: #eaeaea!important;
      }
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
        padding-left: 10px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        p:nth-child(1) {
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          color: #333333;
          margin: 15px 0 5px;
        }
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
</style>