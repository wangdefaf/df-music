<template>
  <div id="audio" :class="{active:isShow}">
    <div class="smillIcon" @click="smillIconClick">
      <up v-if="isShow" class="icon" theme="two-tone" size="40" :fill="['#666' ,'#ffffff']" strokeLinejoin="bevel"/>
      <down v-else class="icon" theme="two-tone" size="40" :fill="['#666' ,'#ffffff']" strokeLinejoin="bevel"/>
    </div>
    <div class="article">
      <audio id="player"
             ref="audio"
             :src="$store.state.songId[$store.state.index] | getUrl"
             autoplay>
      </audio>
      <div class="icon">
        <go-start theme="two-tone" size="47" :fill="['#333' ,'#ffffff']" @click.native="startClick"/>
        <pause-one @click="pauseClick" v-if="!isPlay" theme="two-tone" size="47" :fill="['#333' ,'#ffffff']"/>
        <play @click="playClick" v-else theme="two-tone" size="47" :fill="['#333' ,'#ffffff']"/>
        <go-end theme="two-tone" size="47" :fill="['#333' ,'#ffffff']" @click.native="endClick"/>
      </div>
      <div class="info">
        <router-link
            :to="{name:'song',params :{id:$store.state.songId[$store.state.index]}}"
            tag="div"
            class="pic">
          <img :src="songPicUrl+'?param=78y78'" alt="">
        </router-link>
        <div class="text">
          <p>
            <span>
              {{ songName }}
            </span>
            <span>
              {{ songSing }}
            </span>
          </p>
          <slider class="slider-x" v-model="schedule" @change="changeCurrentTime(schedule)" :show-tooltip="false"/>
          <div class="timer">
            <span class="left">{{ currentlyPlay }}</span>
            <span class="right">{{endPlay}}</span>
          </div>
        </div>
      </div>
      <div class="volume">
        <div class="icon">
          <volume-mute @click.native="muteClick" v-if="volume === 0" theme="two-tone" size="30" :fill="['#333' ,'#ffffff']"/>
          <volume-notice @click.native="noticeClick" v-else-if="volume >= 50" theme="two-tone" size="30" :fill="['#333' ,'#ffffff']"/>
          <volume-small @click.native="smallClick" v-else-if="volume < 50" theme="two-tone" size="30" :fill="['#333' ,'#ffffff']"/>
        </div>
        <slider
            class="slider"
            v-model="volume"
            @input="changeVolume"
        >
        </slider>
      </div>
      <div>

      </div>
    </div>
  </div>
</template>

<script>
import {Slider} from 'element-ui'
import {Play,PauseOne,GoEnd,GoStart,VolumeNotice,VolumeSmall,VolumeMute,Up,Down} from '@icon-park/vue'
import {getSongDet} from '@/network/getdata/song'
export default {
  name: "vueAudio",
  data() {
    return {
      isShow: true,
      songId:[],
      index: 0,
      songPicUrl: null,
      songName: null,
      songSing: null,
      isPlay: false,
      volume: 50,
      snapVolume: 0,//设置临时音量
      schedule:0,
      currentlyPlay: '00:00',
      endPlay: null,

    }
  },
  components: {
    Play,
    PauseOne,
    GoEnd,
    GoStart,
    Slider,
    VolumeNotice,
    VolumeSmall,
    VolumeMute,
    Up,
    Down
  },
  filters: {
    getUrl(id) {
      return 'https://music.163.com/song/media/outer/url?id='+id+'.mp3'
    }
  },
  methods: {
    smillIconClick() {
      this.isShow = !this.isShow
    },
    //调整音量
      changeVolume() {
        this.$refs.audio.volume =  this.volume/100
      },
      muteClick() {
        this.volume = this.snapVolume
      },
      noticeClick() {
        this.snapVolume = this.volume
        this.volume = 0
      },
      smallClick() {
        this.snapVolume = this.volume
        this.volume = 0
      },
    //播放暂停
    playClick() {
      this.$refs.audio.play()
    },
    pauseClick() {
      this.$refs.audio.pause()
    },
    //拖动进度条
    changeCurrentTime(index) {
        if (index == 0) {
          this.$refs.audio.load()
        }
      this.$refs.audio.currentTime = parseInt(index / 100 * this.$refs.audio.duration)
    },
    // 上一首
    startClick() {
      let state = this.$store.state
      if (state.index === 0)  {
        alert('这是第一首')
      } else state.index--
    },
    // 下一首
    endClick() {
      let state = this.$store.state
      if (state.index+1 == state.songId.length)  {
        alert('这是最后一首')
      } else state.index++
    },
    realFormatSecond(dom) {
      let timeDisplay;
      //用秒数来显示当前播放进度
      timeDisplay = Math.floor(dom);//获取实时时间
      //处理时间
      //分钟
      let minute = timeDisplay / 60;
      let minutes = parseInt(minute);
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      //秒
      let second = timeDisplay % 60;
      let seconds = Math.round(second);
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds
    },
     //网络请求
    getSong() {
      let state = this.$store.state
      getSongDet(state.songId[state.index]).then(res => {
          if (res.data) {
            let data = res.data.songs[0]
            this.songName = data.name
            this.songPicUrl = data.al.picUrl
            this.songSing = data.ar[0].name
          }
      })
    }
  },
  watch: {
    //监听ID改变响应URL改变
    '$store.state.songId'() {
      this.isShow = false
      this.getSong()
      //   console.log(this.$store.state.lrc);
    },
    '$store.state.index'() {
      this.getSong()
    }
  },
  mounted() {
    //回调歌词样式位置
    let p = this.$refs.audio
    let _this = this;
    let state = _this.$store.state
    // if ()
    p.addEventListener('play', function () {//播放开始执行的函数
      _this.isPlay = false
    });
    p.addEventListener('pause', function () {//播放开始执行的函数
      _this.isPlay = true
    });
    p.addEventListener("timeupdate",function() {
      //返回播放地方
      if(Math.floor(this.currentTime) && state.songId[state.index] == _this.$route.params.id && state.lrc[0]){
        let g = Math.floor(this.currentTime);
        console.log(g);
        if (state.lrc[0][g]) state.time = g
      } else state.time = -1

      //移动进度条
      _this.schedule = parseInt(p.currentTime / p.duration * 100)
      //当前播放秒数
      _this.currentlyPlay = _this.realFormatSecond(p.currentTime)
      //总秒数
      _this.endPlay = _this.realFormatSecond(p.duration)
    });
  },
  created() {
    this.getSong()
  }
}
</script>

<style scoped lang="scss">
.active {
  bottom: -70px!important;
}
#audio {
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: 100%;
  height: 70px;
  color: #333333;
  border-top: 1px solid #999;
  background-color: #ffffff;
  transition: all 0.3s;
  .smillIcon {
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 10px 10px 0 0;
    background-color: #ffe443;
    position: absolute;
    top: -40px;
    right: 0;
    .icon {
      margin-right: 3px;
    }
    span {
      margin-right: 5px;
    }
  }
  .article {
    display: flex;
    width: 1400px;
    margin: 0 auto;
    #player {
      width: 100%;
      background-color: #ffe443;
    }
    .icon {
      flex: 1.5;
      height: 100%;
      line-height: 75px;
      span {
        margin: 0 5px;
      }
      span:nth-child(1) {
        margin-left: 30px;
      }
    }
    .info {
      flex: 5;
      display: flex;
      cursor: pointer;
      .pic img {
        position: relative;
        top: 3px;
        width: 64px;
        height: 64px;
      }
      .text {
        padding-top: 3px;
        padding-left: 20px;
        p {
          margin-bottom: 5px;
        }
        .timer {
          margin-bottom: 5px;
          .left {
            float: left;
          }
          .right {
            float: right;
          }
          span {
            font-size: 17px;
          }
          span:hover{
            text-decoration: underline;
          }
        }
        .slider-x {
          width: 800px;
        }
      }
    }
    .volume {
      flex: 2;
      display: flex;
      .icon {
        flex: 3;
      }
      .slider {
        flex: 9;
        padding-top: 33px;
      }
    }
  }
}
.cur-lyric{
  color: #ffe443;
}
::v-deep .el-slider__bar{
  color: #ffe443;
  background: #ffe443;
}
::v-deep .el-slider__button{
  border: 2px solid #ffe443;
}
::v-deep .el-slider__runway{
  margin: 5px 0;
}
</style>