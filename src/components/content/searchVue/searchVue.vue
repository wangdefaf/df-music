<template>
    <div class="search">
      <input v-model="keywords"
             id="input"
             @focus="focusTrue"
             @blur="blurFalse"
             @input="valueChange"
             autocomplete="off"
             type="search"
             placeholder="搜索音乐/MV/歌单/歌手"
             maxlength="128">
      <search class="Icon" theme="two-tone" size="20" :fill="['#333' ,'#ffffff']"/>

      <div class="dropDown" v-if="ishotShow">
        <div v-if="isCutover" @mousedown="focusMouse" class="listHot">
          <span>热搜榜</span>
          <div class="item" @click="itemClick(item)" v-for="(item,index,key) in goodsHot" :key="key">
            <div class="ranking" :class="{hot:index<=2}">
              {{ index+1 }}
            </div>
            <div class="info">
              <div>
                <span>{{ item.searchWord }}</span>
                <img :class="{icon5:item.iconType==5}" v-if="item.iconUrl" :src="item.iconUrl" alt="">
                <span>{{ item.score }}</span><br>
              </div>
              <span>{{ item.content }}</span>
            </div>
          </div>
        </div>
        <div v-else class="suggest" >
          <span>搜" {{keywords}} "的相关结果</span>
          <div v-if="item.data" v-for="(item,index) in searchSoon">
            <h6>
              <music-list v-if="item.type=='songList'" theme="outline" size="22" :fill="['#333' ,'#ffffff']" strokeLinejoin="bevel"/>
              <user v-if="item.type=='singer'" theme="outline" size="22" fill="#333" strokeLinejoin="bevel"/>
              <music-one v-if="item.type=='song'" theme="two-tone" size="22" :fill="['#333' ,'#ffffff']" strokeLinejoin="bevel"/>
              {{ item.title }}
            </h6>
            <ul class="lists">
              <li v-for="(item1,index) in item.data">
                <play class="play" @click.native="playSong(item1.id)" v-if="item.type=='song'" theme="outline" size="22" :fill="['#ffe443' ,'#ffffff']" strokeLinejoin="bevel"/>
                <router-link tag="span" :to="{name:item.type,params:{id:item1.id}}">
                  <span>{{item1.name}}</span>
                  <span v-for="(item2,index) in item1.artists"> — &nbsp;&nbsp;&nbsp;&nbsp;{{item2.name}}</span>
                </router-link>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {Search,User,MusicOne,MusicList,Play} from "@icon-park/vue"
import {getSearchHot,getSearchSug} from "@/network/getdata/search"
export default {
  name: "searchVue",
  data() {
    return {
      keywords: '',
      ishotShow: false,
      isCutover: true,
      isTrue: true,
      goodsHot: [],
      searchSoon: [
        {
          title: '歌曲',
          type: 'song',
          value: 'songs',
          data: []
        },
        {
          title: '歌手',
          type: 'singer',
          value: 'artists',
          data: []
        },
        {
          title: '歌单',
          type: 'songList',
          value: 'playlists',
          data: []
        }
      ],
    }
  },
  components: {
    Search,
    User,
    MusicOne,
    MusicList,
    Play
  },
  mounted() {

  },
  methods: {
    playSong(id) {
      this.$store.commit('playClick',id)
    },
    itemClick(item) {
      this.keywords = item.searchWord
      this.valueChange()
    },
    focusMouse(event) {
      event.preventDefault()
    },
    valueChange() {
      if (this.keywords.length) {
        this.getFun()
        this.isCutover = false
      } else this.isCutover = true
    },
    focusTrue() {
      this.ishotShow = true
      //  console.log('获取焦点')
    },
    blurFalse() {
      setTimeout(() => {
        this.ishotShow = false
      },200)
      // console.log('失去焦点');
    },
    getFun() {
      getSearchSug(this.keywords).then(res => {
        let data = res.data.result
        for (let item of this.searchSoon) item.data = data[item.value]
      })
    }
  },
  created() {
    getSearchHot().then(res => {
      this.goodsHot = res.data.data
    })
  }
}
</script>

<style scoped lang="scss">
input::-webkit-search-cancel-button {
  display: none;
}
$tab-height :60px;
  .search {
    display: flex;
    position: relative;
    margin-top: ($tab-height - 34px)/2;
    height: 34px;
    line-height: 34px;
    padding-left: 20px;
    border-radius: 15px;
    background: #f5f5f5;
    input {
      flex: 16;
      background: #f5f5f5;
      font-size: 15px;
      border: 0;
      outline:none
    }
    .dropDown {
      position: absolute;
      top: 34px;
      right:-100px;
      box-shadow: 0 6px 8px #d2d2d2;
      color: #333;
      >div {
        width: 450px;
        padding: 10px;
        transition: all 0.3s;
        background-color: #fff;
        overflow: scroll;
        box-sizing: border-box;

      }
      .suggest {
        padding: 0 0;
        >span {
          display: inline-block;
          margin: 10px 0 10px 10px;
        }
        h6 {
          height: 40px;
          margin-bottom: 0;
          padding-left: 15px;
          background-color: #ececec;
          line-height: 40px;
          font-size: 16px;
        }
        .lists {
          margin: 0;
          li {
            list-style: none;
            cursor: pointer;
            padding: 0 10px 0 30px;
            .play {
              margin-right: 10px;
            }
          }
          li:hover {
            background-color: #ececec;
          }
        }
      }
      .listHot {
        height: 515px;
        >span {
          margin-left: 10px;
        }
        >div {
          display: flex;
          cursor: pointer;
          list-style: none;
          .ranking {
            flex: 1;
            font-size: 20px;
            text-align: center;
            line-height:58px;
          }
          .info {
            flex: 7.5;
            box-sizing: border-box;
            padding-left: 10px;
            font-size: 14px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            div {
              width: 361px;
            }
            div:nth-child(1) {
              height:24px;
              span:nth-child(1) {
                color: #555;
                margin-right: 5px;
                font-weight: bold;
              }
              img {
                width:30px;
                margin: 0 10px;
                height: auto;
              }
              .icon5 {
                width: 15px;
                height: 15px;
              }
              span:nth-child(2) {
                color: #9c9c9c;
                margin-left: 5px;
              }
            }
          }
          .hot {
            color: red;
          }
        }
      }
    }

    .Icon {
      flex: 2;
      cursor: pointer;
      margin:-2px 5px;
      color: #a1a1a1;
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
  background: rgba(135, 135, 135, 0.5);
}

</style>