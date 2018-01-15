<template>
  <section v-load-more="getList">
    <div id="topicLictCont">
        <div v-for="(item,index) in topicList" :key="index">
            <router-link :to="{path:'topicdetail',query: {id: item.id, title:'#'+item.topic_name+'#'}}">
                <div class="topicList1 pad16">
                    <div class="topItem flex">
                        <div class="leftImg"><img :src="item.topic_top_pic"></div>
                        <div class="rightCont">
                            <div class="flag f16">#{{item.topic_name}}#</div>
                            <p class="detail f12 nowrap2">{{item.topic_content}}</p>
                            <div class="post f12 color_9b"><span class="num">{{item.count_post}}</span>个帖子</div>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
        <p v-show="topicList.length == 0">暂无内容</p>
    </div>
  </section>
</template>

<script>
import {loadMore} from "@/js/directives"
import qs from 'qs';
export default {
  data () {
    return {
        isLoadEnd: false,
        pageNo: 1,
        topicList: []
    }
  },
  mixins: [loadMore],
  created () {
      this.getList();
  },
  methods: {
      getList () {
          if(this.$store.state.isLoading || this.isLoadEnd) return;
          this.$store.commit('setIsLoading',true);
          console.log(this.$store.state.isLoading);
          $axios.post('/sns_wx/getMoreTopicList',qs.stringify({'next' : this.pageNo}))
          .then((arg) => {
              let data = arg.data;
              this.$store.commit('setIsLoading',false)
              if(data.msg == 'success'){
                if( this.pageNo >= data.result.all_page){
                    this.isLoadEnd = true;
                }
                this.pageNo ++;
                this.topicList = this.topicList.concat(data.result.list);
              }else{
                  this.$store.commit('showAlertTip',data.msg);
              }
          }).catch((res) => {
              console.log(res);
              this.$store.commit('setIsLoading',false)
              this.$store.commit('showAlertTip','服务繁忙')
          })
      }
  }
}
</script>

<style lang="scss">
.topItem{
    padding: 0.8rem 0;
    justify-content: flex-start;
    border-bottom: solid 0.05rem #e5e5e5;
}
.topItem .leftImg{
    width:4rem;
    height:4rem;
    border-radius: 0.1rem ; 
    margin-right: 0.75rem;
}
.topItem .rightCont{
    width: 12.35rem;
}
.rightCont .detail{
    margin: 0.3rem 0 0.4rem;
    min-height: 1.5rem;
    color: #343434;
}
</style>
