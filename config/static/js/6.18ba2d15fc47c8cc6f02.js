webpackJsonp([6],{"8Z8/":function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var o={data:function(){return{publishTxt:"",chooseImgList:[],pushImgList:[],isShowTips:!1,alertText:"",test:""}},methods:{choosePictute:function(){var t=this;this.chooseImgList.length>=9?this.$store.commit("showAlertTip","最多只能选择9张图片哦"):wx.chooseImage({count:9-this.chooseImgList.length,sizeType:["compressed"],sourceType:["album","camera"],success:function(s){t.test=s,t.chooseImgList=t.chooseImgList.concat(s.localIds)},fail:function(){t.$store.commit("showAlertTip","微信接口失效")}})},removePicture:function(t){this.chooseImgList.splice(t,1)},submit:function(){if(!this.$store.state.isLoding)if(0!=this.chooseImgList.length&&""!=this.publishTxt){this.$store.commit("setIsLoading",!0);var t={content:this.publishTxt,upload_image:this.pushImgList,topic_id:""};wx.ready(function(){var s=0;!function i(o){var e=this;wx.uploadImage({localId:localIds[o],isShowProgressTips:0,success:function(o){e.pushImgList.push(o.serverId),++s<localIds.length?i(s):$axios.post("http://t.flowerplus.cn/sns_wx/addPost",t).then(function(t){e.$router.push({path:"index"})}).catch(function(){e.$store.commit("setIsLoading",!1),e.$store.commit("showAlertTip","服务繁忙"),console.log(22)})},fail:function(){FP.loading().hide(),isLoading=!1,FP.showError("网络不佳，稍后再试。")}})}(0)})}else this.$store.commit("showAlertTip","请上传图片和文字")}}},e={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"pagePost"},[i("div",[t._v(t._s(t.test))]),t._v(" "),i("div",{staticClass:"inputArea"},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.publishTxt,expression:"publishTxt"}],attrs:{id:"publish_cont",placeholder:"在此输入内容"},domProps:{value:t.publishTxt},on:{input:function(s){s.target.composing||(t.publishTxt=s.target.value)}}})]),t._v(" "),i("div",{staticClass:"uploadImgBox clearfix"},[t._l(t.chooseImgList,function(s,o){return i("div",{key:o,staticClass:"imgBlock uploadImgItem fl rlt"},[i("div",{staticClass:"imgWrap"},[i("img",{attrs:{src:s}})]),t._v(" "),i("div",{staticClass:"icon closeBtn abs",on:{click:function(s){t.removePicture(o)}}})])}),t._v(" "),i("div",{staticClass:"imgBlock fl",attrs:{id:"chooseImgBtn"},on:{click:t.choosePictute}},[i("img",{attrs:{src:"https://t.flowerplus.cn/Static/sns_wx/images/pic_addbtn.png"}})])],2),t._v(" "),i("div",{staticClass:"submit"},[i("div",{staticClass:"mainButton",attrs:{id:"publishBtn"},on:{click:t.submit}},[t._v("发布")])])])},staticRenderFns:[]};var c=i("VU/8")(o,e,!1,function(t){i("DzM9")},null,null);s.default=c.exports},DzM9:function(t,s){}});
//# sourceMappingURL=6.18ba2d15fc47c8cc6f02.js.map