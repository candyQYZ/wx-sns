<template>
  <div class="pageTopicDetail">
        <a v-if="fromapp" href="https://a.app.qq.com/o/simple.jsp?pkgname=com.flowerplus.store" class="mainButton tc" style="position:fixed;top:0;z-index:120;width: 100%;">打开FlowerPlus花加app，加入花友社区</a>
        <a v-if="fromWx" href="/sns_wx/index" class="mainButton tc" style="position:fixed;top:0;z-index:120;width: 100%;">点此查看更多精华帖子</a>
        <div class="topPanel bgWhite"  :class="{marTop: fromWx}">
            <div class="banner"><img :src="topicInfo.topic_top_pic"> </div>
            <div class="pad16 descrip">
                <div class="title f16 borderBottom">{{topicInfo.topic_content}}</div>
                <div class="attention flex mainColor2">
                    <div class="">
                        <span id="totalPost">{{topicInfo.count}}</span>个帖子，已有<span id="totalFocus">{{topicInfo.focus}}</span>人关注
                    </div>
                    <div id="attentionBtn" class="tc f12 rlt" :class="{checked: topicInfo.is_focus}" @click="addFocus"><span class="addIcon inline" :class="{hide: topicInfo.is_focus}"></span><span class="txt">{{topicInfo.is_focus ? '已' :''}}关注</span></div>
                </div>
            </div>
        </div>
        <div class="pad16 f16 newTitle">最新</div>
        <div class="newTopicCont">
          <PushList :fromPage="fromPage"></PushList>
        </div>
        <router-link :to="{path:'posting',query:{id: topicInfo.id}}"><div class="postingIconC"></div></router-link>
  </div>
</template>

<script>
import PushList from "@/components/PushList"
export default {
  data () {
    return {
      fromapp: false,
      fromWx: false,
      fromPage: 1,
      topicInfo: {
        id: '46',
        editor_id: '123',
        topic_top_pic: 'https://osstest.flowerplus.cn/sns_image/20171129/15119347058040.jpg',
        topic_content: 'sssss',
        count: '23',
        focus: '12',
        is_focus: true,
      }
    }
  },
  components: {
    PushList,
  },
  methods: {
    addFocus () {
      if(this.$store.state.isLoading) return;
      this.$store.commit('setIsLoading',true);
      $axios.post('https://t.flowerplus.cn/sns_wx/addFocus',{
        topic_id: this.topicInfo.id,
        f_cid : this.topicInfo.editor_id,
      }).then((data) => {
        if(this.topicInfo.is_focus){
          this.topicInfo.focus --
        }else{
          this.topicInfo.focus ++
        }
        this.topicInfo.is_focus = !this.topicInfo.is_focus;
        this.$store.commit('setIsLoading',false)
      }).catch(() => {
        this.$store.commit('setIsLoading',false)
        this.$store.commit('showAlertTip','操作失败！')
      })
    }
  }
}
</script>

<style lang="scss">
.marTop{
  margin-top:2rem;
}
.topPanel .banner{
    max-height: 8rem;
    overflow: hidden;
}
.descrip .title{
    line-height: 1.4rem;
    padding: 0.8rem 0;
}
.attention{
    padding: 0.5rem 0;
    align-items: center;
}
.newTitle{
    line-height: 2.2rem;
    background: #f5f5f5;
}
.postingIconC{
    position: fixed;
    width: 2.8rem;
    height: 2.8rem;
    bottom: 2rem;
    right: 0.9rem;
    background: url('~@/images/photo.png') no-repeat center #FC6B80;
    background-size: 1.5rem 1.2rem;
    box-shadow: 0 0 5px rgba(252,107,128,0.6);
    border-radius: 100%;
}

</style>
