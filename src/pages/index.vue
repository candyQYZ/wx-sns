
<template>
    <div class="pageIndex">
        <div class="topFixed">
            <div class="topSearch">
                <router-link :to="{path:'posting'}"><div class="postingIcon icon"></div></router-link>
                <div class="serachInputBox boxsizing rlt inline"><input type="text" class="serachInput" v-model="keywords" placeholder="输入搜索内容"></div>
                <router-link :to="{path:'myinfo'}"><div class="messageIcon icon"></div></router-link>
            </div>
            <div class="topTabMenu1 bgWhite tc flex borderBottom">
                <div id="menu_news" class="menu rlt" :class="{'checked': type==1}" @click="changeMenu(1)">
                    <div class="title">最新</div>
                    <p class="f10 color_9b">New</p>
                </div>
                <div id="menu_focus" class="menu rlt" :class="{'checked': type==2}" @click="changeMenu(2)">
                    <div class="title">关注</div>
                    <p class="f10 color_9b">Following</p>
                </div>
            </div>
        </div>
        <div class="container">
          <div v-show="type==1" class="topicBlock bgf5 pad16">
            <div class="topic_titleROw flex">
                <div class="">话题</div>
                <div><router-link :to="{path:'topiclist'}"  class="color_9b">查看更多</router-link></div>
            </div>
            <div style="height: 5.9rem; overflow: hidden;">
              <div class="scrollWrapBox">
                  <div class="scrollContent">
                    <div v-for="item in topicList" :key="item.id" class="inline">
                      <router-link  :to="{path:'topicdetail', query: { id: item.id,title: item.name }}">
                        <div class="newTopic boxsizing">
                            <div class="likeList nowrap">
                              <div v-for="(item2,index) in item.focus_user" :key="index"  class="headImg inline"><img :src="item2.avatar"></div>
                            </div>
                            <div class="attentionRow mainColor"><span class="attentionNum">{{item.count_focus}}</span>人关注</div>
                            <div class="topicName">{{item.name}}</div>
                        </div>
                      </router-link>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <PushList :type="type" :keywords="keywords" :fromPage="fromPage"></PushList>
        </div>
    </div>
</template>

<script>
import PushList from "@/components/PushList.vue";
export default {
    data () {
      return {
        type: 1,
        keywords: '',
        fromPage: 0,
        topicList: [
          {
          id: 11,
          name: '寻找少女粉',
          count_focus: 21,
          focus_user: [{
            avatar: 'https://wx.qlogo.cn/mmopen/WncGPzFso3ffGrcicLPldibeQT7bvyTUNLbU6PdH5DkW88JWzPcdt1EMBvNYLmBHDsuOJSctYTtiaV8eJMfYDqN3aQpp7M4GUNh/96'
          },{
            avatar: 'https://wx.qlogo.cn/mmopen/WncGPzFso3ffGrcicLPldibeQT7bvyTUNLbU6PdH5DkW88JWzPcdt1EMBvNYLmBHDsuOJSctYTtiaV8eJMfYDqN3aQpp7M4GUNh/96'
          },{
            avatar: 'https://wx.qlogo.cn/mmopen/WncGPzFso3ffGrcicLPldibeQT7bvyTUNLbU6PdH5DkW88JWzPcdt1EMBvNYLmBHDsuOJSctYTtiaV8eJMfYDqN3aQpp7M4GUNh/96'
          },{
            avatar: 'https://wx.qlogo.cn/mmopen/WncGPzFso3ffGrcicLPldibeQT7bvyTUNLbU6PdH5DkW88JWzPcdt1EMBvNYLmBHDsuOJSctYTtiaV8eJMfYDqN3aQpp7M4GUNh/96'
          }]
        },{
          id: 12,
          name: '寻找少女粉',
          count_focus: 21,
          focus_user: [{
            avatar: 'https://wx.qlogo.cn/mmopen/WncGPzFso3ffGrcicLPldibeQT7bvyTUNLbU6PdH5DkW88JWzPcdt1EMBvNYLmBHDsuOJSctYTtiaV8eJMfYDqN3aQpp7M4GUNh/96'
          },{
            avatar: 'https://wx.qlogo.cn/mmopen/WncGPzFso3ffGrcicLPldibeQT7bvyTUNLbU6PdH5DkW88JWzPcdt1EMBvNYLmBHDsuOJSctYTtiaV8eJMfYDqN3aQpp7M4GUNh/96'
          },{
            avatar: 'https://wx.qlogo.cn/mmopen/WncGPzFso3ffGrcicLPldibeQT7bvyTUNLbU6PdH5DkW88JWzPcdt1EMBvNYLmBHDsuOJSctYTtiaV8eJMfYDqN3aQpp7M4GUNh/96'
          },{
            avatar: 'https://wx.qlogo.cn/mmopen/WncGPzFso3ffGrcicLPldibeQT7bvyTUNLbU6PdH5DkW88JWzPcdt1EMBvNYLmBHDsuOJSctYTtiaV8eJMfYDqN3aQpp7M4GUNh/96'
          }]
        },{
          id: 5,
          name: '寻找少女粉',
          count_focus: 21,
          focus_user: [{
            avatar: 'https://wx.qlogo.cn/mmopen/WncGPzFso3ffGrcicLPldibeQT7bvyTUNLbU6PdH5DkW88JWzPcdt1EMBvNYLmBHDsuOJSctYTtiaV8eJMfYDqN3aQpp7M4GUNh/96'
          },{
            avatar: 'https://wx.qlogo.cn/mmopen/WncGPzFso3ffGrcicLPldibeQT7bvyTUNLbU6PdH5DkW88JWzPcdt1EMBvNYLmBHDsuOJSctYTtiaV8eJMfYDqN3aQpp7M4GUNh/96'
          },{
            avatar: 'https://wx.qlogo.cn/mmopen/WncGPzFso3ffGrcicLPldibeQT7bvyTUNLbU6PdH5DkW88JWzPcdt1EMBvNYLmBHDsuOJSctYTtiaV8eJMfYDqN3aQpp7M4GUNh/96'
          },{
            avatar: 'https://wx.qlogo.cn/mmopen/WncGPzFso3ffGrcicLPldibeQT7bvyTUNLbU6PdH5DkW88JWzPcdt1EMBvNYLmBHDsuOJSctYTtiaV8eJMfYDqN3aQpp7M4GUNh/96'
          }]
        }
        ]
      }
    },
    components: {
      PushList
    },
    methods: {
      changeMenu (index){
        this.type = index;
      }
    }
}
</script>

<style lang="scss">
.topSearch{
  padding: 0.6rem 0.5rem 0.6rem 1rem;
  background: #fff;
}
.postingIcon{
  width: 1.52rem;
  height: 1.3rem;
  background-position: -3.08rem 0;
  margin-right: 0.9rem;
}
.serachInputBox{
  width: 11.25rem;
  height: 1.4rem;
  line-height: 1.4rem;
  background-color: #F0F0F0;
  border-radius: 2.9rem;
  padding: 0 0.25rem 0 2.1rem;
  margin-right: 0.9rem;
  &:after{
    content: '';
    position: absolute;
    width: 0.75rem;
    height: 0.75rem;
    background: url('~@/images/icon.png') -12.8rem 0 no-repeat;
    background-size: 13.55rem 1.35rem;
    left: 1.1rem;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .serachInput{
    width: 90%;
  }
}
.messageIcon{
  width: 1.5rem;
  height: 1.45rem;
  background: url('~@/images/my.png') center no-repeat;
  background-size: 1.5rem 1.45rem;
  padding: 0.3rem;
}
.topTabMenu1{
  justify-content: center;
  .menu{
    width: 4.5rem;
    padding-bottom: 0.5rem;
    p{
      line-height: 0.6rem;
    }
  }
  .menu.checked .title{
    font-weight: 600;
  }
  .menu.checked:after{
    content: '';
    position: absolute;
    bottom: 0;
    height: 0.15rem;
    background: #1a1a1a;
    width: 3rem;
    left: 0;
    right: 0;
    margin: auto;
  }
} 
.container{
  background: #f5f5f5;
  padding-top: 0.5rem;
}
.scrollWrapBox{
    height: 6.2rem;
    -webkit-overflow-scrolling: touch;
    overflow-y: hidden;
    overflow-x: auto;
}
.scrollContent{
    height:8rem;
    white-space: nowrap;
    width:auto;
}
</style>
