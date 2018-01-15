<template>
    <section v-load-more="getList">
        <div class="newTopicCont">
            <div v-for="item in publishList" :key="item.id" class="bgWhite topicList">
                <div class="authorRow clearfix">
                    <div class="headImg fl"><img :src="item.avatar"></div>
                    <div class="authorInfo">
                        <div class="author">{{item.nick ? item.nick : '匿名用户'}}<span class="level">{{item.level ? 'Lv.' + item.level.substring(2) : ''}}</span></div>
                        <div class="publishTime f10 color_9b">{{item.created_at}}</div>
                    </div>
                </div>
                <router-link :to="{path:'detail', query: { id: item.id}}">
                    <div class="toppicCont">
                        <span v-if="item.topic_name" class="classify mainColor" topic-id="'+item.topic_id+'">#{{item.topic_name}}# </span>{{item.content}}
                    </div>
                </router-link>
                <div class="toppicPic flex">
                    <div v-for="(item2,index) in item.thumb" :key="index" @click="previewImg(item.img,item.img[index])" class="inline imgList" :class="item | getImgClass"><img :src="item2"></div>
                </div>
                <div class="corp_row flex">
                    <div class="btn commitBtn">
                        <span class="icon icon_commit"></span>
                        <span class="num inline">评论</span>
                    </div>
                    <div class="btn supportBtn">
                        <span class="icon icon_support"></span>
                        <span class="num inline">10</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {loadMore} from "@/js/directives"
import qs from 'qs';
export default {
  data () {
    return {
        page: {
            pageNo: 1,
            type: 1,
            isLoading : false,
            isLoadEnd : false,
        },
        publishList: []
    }
  },
  created () {
      this.getList();
  },
  props: ['type','keywords','fromPage'],
  mixins: [loadMore],
  filters: {
      getImgClass (item){
          return item.img ? ((item.img.length > 2 && item.img.length != 4) ? 'three' : item.img.length > 1 ? 'two' : 'one') : '';
      }
  },
  methods: {
      getList () {
          if(this.$store.state.isLoading || this.page.isLoadEnd) return;
          console.log(2222);
          this.$store.commit('setIsLoading',true);
          let url = this.fromPage == '1' ? '/sns_wx/getTopicPostList' : '/sns_wx/snsIndex';
          let queryIndex = {
            'type' : this.type,
            'next' : this.page.pageNo,
            'keywords': this.keywords
          };
          let queryDetail = {'topic_id' : this.$route.query.id, 'next' : this.page.pageNo};
          let data = this.fromPage == '1' ? queryDetail : queryIndex;
          $axios.post(url,qs.stringify(data)).then((arg) => {
              let data = arg.data;
              this.$store.commit('setIsLoading',false)
              if(data.msg == 'success'){
                if( this.page.pageNo >= data.result.all_page){
                    this.page.isLoadEnd = true;
                }
                this.page.pageNo ++;
                if(!data.result) return;
                this.publishList = this.publishList.concat(data.result.list);
              }else{
                  this.$store.commit('showAlertTip',data.msg);
              }
          }).catch(() => {
              this.$store.commit('setIsLoading',false)
              this.$store.commit('showAlertTip','服务繁忙')
          })
      },
      replaceHttps (list){
          return list.filter(function (item) {
            return item ? item.replace('https','http') : '';
        })
      },
      previewImg (imgList,src) {
        let url = src ? src.replace('https','http') : '';
        imgList = this.replaceHttps(imgList);
        wx.previewImage({
            current: url, // 当前显示图片的http链接
            urls: imgList // 需要预览的图片http链接列表
        });
      }
  }
}
</script>

<style lang="scss">
.authorRow .headImg{
    width: 1.7rem;
    height: 1.7rem;
}
.authorInfo{
    padding-left: 2.1rem;
}
.toppicCont{
    line-height: 1.1rem;
    margin: 0.8rem 0;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; 
    -webkit-box-orient: vertical; 
    -webkit-line-clamp: 2; 
    max-height: 2.2rem;
    overflow: hidden;
}
.supportBtn{
    right: 1rem;
    top: 2rem;
}
.corp_row{
    justify-content: flex-end;
}
.corp_row .btn{
    padding: 0.45rem 1rem 0;
    color:#b2b2b2;
}
.corp_row .btn .icon{
    width: 0.95rem;
    height: 0.95rem;
    margin-right: 0.15rem;
}
.icon_transmit{
    background-position: -10.7rem 0;
}
.icon_commit{
    background-position: -5.9rem 0;
}
.icon_support{
    background-position: -8.73rem 0;
}
.supportBtn.checked{
    color: #F5A623;
}
.supportBtn.checked .icon_support{
    background-position: -9.7rem 0;
}
.noTips{
    padding-top: 1.5rem;
}
.noTips img{
    display: block;
    width: 3.5rem;
    height: 3.5rem;
    margin: 35% auto 0.8rem;
}
.right_flag{
    height: 1.05rem;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
}
.essence{
    background: url('~@/images/essence.png') center no-repeat;
    background-size: cover;
    width: 2.3rem;
    height: 1.05rem;
}
.topper{
    background: url('~@/images/recomm.png') center no-repeat;
    background-size: cover;
    width: 2.3rem;
    height: 1.05rem;
    margin-left: 0.2rem;
}
.newTopic{
    display: inline-block;
    vertical-align: top;
    width: 7.6rem;
    height: 5.2rem;
    border-radius: 0.3rem;
    margin-right: 0.3rem;
    background: #fff;
    padding: 0.8rem 0.6rem 0.5rem;
}
.headImg{
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 100%;
    background: #e8e8e8;
    overflow: hidden;
}
.likeList .ellipse{
    height: 1.2rem;
    color:#1A1A1A;
}
.attentionRow{
    font-size: 0.6rem;
    padding: 0.2rem 0 0.5rem;
}
.topicName{
    color: #4a4a4a;
}
.topicList{
    padding: 1rem 0.8rem 0.6rem;
    margin-bottom: 0.5rem;
}
.toppicPic{
    flex-wrap: wrap;
    justify-content: flex-start;
}
.topic_titleROw{
    padding: 0.6rem 0 0.92rem;
}
</style>
