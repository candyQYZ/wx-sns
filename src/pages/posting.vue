<template>
  <div class="pagePost">
    <div>{{test}}</div>
    <div class="inputArea">
        <textarea id="publish_cont" placeholder="在此输入内容" v-model="publishTxt"></textarea>
    </div>
    <div class="uploadImgBox clearfix">
      <div v-for="(item,index) in chooseImgList" :key="index" class="imgBlock uploadImgItem fl rlt">
          <div class="imgWrap">
              <img :src="item">
          </div>
          <div class="icon closeBtn abs" @click="removePicture(index)"></div>
      </div>
      <div id="chooseImgBtn" @click="choosePictute" class="imgBlock fl"><img src="https://t.flowerplus.cn/Static/sns_wx/images/pic_addbtn.png"></div>
    </div>
    <div class="submit">
      <div id="publishBtn" @click="submit" class="mainButton">发布</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      publishTxt: '',
      chooseImgList: [],
      pushImgList: [],
      isShowTips: false,
      alertText: '',
      test: '',
    }
  },
  methods: {
    choosePictute () {
      if(this.chooseImgList.length >= 9){
        this.$store.commit('showAlertTip','最多只能选择9张图片哦') 
        return;
      }
      wx.chooseImage({
        count: 9 - this.chooseImgList.length,
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
          this.test = res;
          this.chooseImgList = this.chooseImgList.concat(res.localIds); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        },
        fail: () =>{
          this.$store.commit('showAlertTip','微信接口失效') 
        }
      });
    },
    removePicture (index) {
      this.chooseImgList.splice(index,1);
    },
    submit () {
      if(this.$store.state.isLoding) return;
      if(this.chooseImgList.length == 0 || this.publishTxt == ''){
        this.$store.commit('showAlertTip','请上传图片和文字') ;
        return;
      }
      this.$store.commit('setIsLoading',true)
      const param = {
          content : this.publishTxt,
          upload_image :  this.pushImgList,
          topic_id :'',
      }
      wx.ready(function(){
        let num = 0;
        uploadImg(0); 
        function uploadImg(i){
            wx.uploadImage({
                localId: localIds[i], // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 0,// 默认为1，显示进度提示
                success: (res) => {
                    this.pushImgList.push(res.serverId); // 返回图片的服务器端ID
                    num ++;
                    if(num < localIds.length){
                        uploadImg(num);
                    }else{
                        $axios.post('http://t.flowerplus.cn/sns_wx/addPost', param)
                        .then((data) => {
                            this.$router.push({ path: 'index' })
                        }).catch(() => {
                            this.$store.commit('setIsLoading',false)
                            this.$store.commit('showAlertTip','服务繁忙')
                            console.log(22)
                        })
                    }
                },
                fail:function(){
                    FP.loading().hide();
                    isLoading = false;
                    FP.showError("网络不佳，稍后再试。");
                }
            });
        }
      })
    }
  }
}
</script>

<style lang="scss">
  body{background: #fff;}
  textarea{width:100%;height:100%;}
  .inputArea{padding:0.8rem;height:11.25rem;}
  .uploadImgBox{padding: 0.45rem;border-bottom:solid 0.05rem #e5e5e5;}
  .imgBlock{width:3.6rem;height:3.6rem;border-radius: 0.2rem ;margin:0.375rem;border: solid 0.03rem #e9e9e9;}
  .imgWrap{width:100%;height:100%;overflow: hidden;}
  .imgWrap img{height:100%;}
  .submit{padding:2.4rem 0.8rem;}
  .closeBtn{width:0.8rem;height:0.8rem;background-position: -13.2rem 0;right:-0.4rem;top:-0.4rem;}
  #chooseImgBtn img{display: block;width: 2.3rem;margin: 0.85rem auto;}
</style>
