<template>
  <div class="pageMyinfo">
    <div class="topTabMenu bgWhite flex">
            <div class="menu tc rlt" :class="{'current': pageIndex == 1}" @click="changeMwnu(1)">我的圈子</div>
            <div class="menu tc rlt" :class="{'current': pageIndex == 2}" @click="changeMwnu(2)">我的收藏</div>
        </div>
        <div v-show="myCircleList.length > 0 || myCollectList.length > 0" class="topicList bgWhite pad16" style="min-height:auto">
          <div id="myCircle">
            <div v-for="(item,index) in myCircleList" :key="index" class="topicItem borderBottom rlt">
              <div class="publishTime color_9b f12">{{item.time}}</div>
              <div class="rlt scrollBoxWrap">
                <div v-for="(item2,index2) in item.data" :key="index2" class="scrollBox scrollBox_del bgWhite rlt">
                  <div class="pubCont flex">
                      <div class="picture">
                          <img :src="item2.imgUrl">
                      </div>
                      <div class="info">
                          <p class="descrip nowrap2 f12">{{item2.content}}</p>
                      </div>
                  </div>
                  <div class="corp_buttom">
                      <div class="item support inline f12 color_9b"><span class="icon icon_support"></span><span class="inline num">{{item2.parise}}</span></div>
                      <div class="item collect inline f12 color_9b"><span class="icon icon_collect"></span><span class="inline num">{{item2.collect}}</span></div>
                      <div class="item commet inline f12 color_9b"><span class="icon icon_commet"></span><span class="inline num">{{item2.reply_count}}</span></div>
                  </div>
                </div>
                <div class="mainButton deleteBtn abs">删除</div>
              </div>
            </div>
          </div>
          <div id="myCollect">
          </div>
        </div>
        <div v-show="pageIndex == 1 && myCircleList.length == 0" class="noTips mytopic tc">
            <img src="http://t.flowerplus.cn/Static/sns_wx/images/my_noTopoc.png">
            <p>太糟糕了，您居然没有分享过任何生活！</p>
            <router-link :to="{path: 'posting'}">晒个图，和花友一起生活</router-link>
        </div>
        <div v-show="pageIndex == 2 && myCollectList.length == 0" class="noTips myfocus tc">
            <img src="http://t.flowerplus.cn/Static/sns_wx/images/my_noFocus.png">
            <p>你没有任何收藏，有没有感觉到一丝丝空虚？</p>
        </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageIndex: 1,
      myCircleList: [],
      myCollectList: [],
    }
  },
  methods: {
    changeMwnu (index){
      this.pageIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
body{
    background: #f5f5f5;
}
.topicItem{
    width: 17.15rem;
}
.topicItem .publishTime{
    padding: 0.85rem 0 0.8rem;
}
.pubCont{
    justify-content: flex-start;
}
.pubCont .info{
    width: 12.35rem;
}
.pubCont .picture{
    width:4rem;
    height:4rem;
    border-radius: 0.1rem ; 
    margin-right: 0.75rem;
    overflow: hidden;
    background: #e5e5e5;
}
.topicList{
    min-height: 100%;
    position: absolute;
    top: 0;
    margin-top: 2rem;
    width: 17.15rem;
    overflow: hidden;
    z-index: 1;
}
.pubCont .title{
    color:rgba(11,11,11,1);
    line-height:1.1rem;
}
.pubCont .descrip{
    color:rgba(52,52,52,1);
    line-height:1.2rem;
}
.corp_buttom{
    padding: 0.8rem 0;
}
.corp_buttom .item{
    padding-right: 0.8rem;
}
.corp_buttom .item .icon{
    margin-right: 0.2rem;
    width: 1rem;
    height: 0.95rem;
}
.icon_commet {
    background-position: -5.9rem 0;
}
.icon_support {
    background-position: -8.73rem 0;
}
.icon_collect {
    width: 1rem;
    height: 1rem;
    background: url('~@/images/collect_1.png') no-repeat center;
    background-size: 0.95rem 0.95rem;
}
.collect.checked .icon_collect{
    background: url('~@/images/collect_2.png') no-repeat center;
    background-size: 0.95rem 0.95rem;
}
.deleteBtn {
    width: 3.2rem;
    bottom: 0;
    right: -0.8rem;
    height: 6.5rem;
    line-height: 6.5rem;
}
.scrollBox{
    transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
    width: 18rem;
    z-index: 10;
}
.noTips{
    position: absolute;
    padding-top: 50%;
    background: #f5f5f5;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /*transform: translateY(-50%);
    -webkit-transform: translateY(-50%);*/
}
.noTips img{
    display: block;
    margin: 0 auto;
    width: 3.8rem;
}
.noTips p{
    font-size: 0.6rem;
    color: #838383;
    padding: 1rem 0 1.8rem;
}
.myfocus img{
    width: 5.1rem;
    margin-bottom: 0.3rem;
}   
.mytopic a{
    display: block;
    width:9.6rem;
    line-height:2rem;
    height:2rem;
    background:rgba(255,255,255,1);
    border-radius: 0.1rem ; 
    margin: 0 auto;
    text-align: center;
}
</style>
