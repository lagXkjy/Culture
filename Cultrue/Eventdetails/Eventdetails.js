// Cultrue/Eventdetails/Eventdetails.js
var WxParse = require('../../wxParse/wxParse.js');
var common=require("../../common.js");
var unti = require("../../utils/util.js")
var all;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:common.config.url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    all = options;
    var article1 = "<div>各位群友，各位在场同仁：<br/>&nbsp;&nbsp;&nbsp;&nbsp;大家晚上好!<br/>&nbsp;&nbsp;&nbsp;&nbsp;七月流火，火是燃烧的激情；七月回归，归是今宵的温馨。时光带走了思绪，留下了文字，我们共同耕耘的意义，在此刻求证。<br/>&nbsp;&nbsp;&nbsp;&nbsp;在场微散文2016年7月同题征文大赛《回归，回归》颁奖典礼现在开始。&nbsp;</div>"
    /**
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */
    var that = this;

    WxParse.wxParse('article1', 'html', article1, that, 5);
  },
 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  QUKanJiang:function(e){
    var idx = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../ReadDetail/ReadDetail?ID=' + idx,
    })
  },
// 渲染数据
Content:function(){
  var that=this
  wx.request({
    url: common.config.activityDetail,
    data:{
      ActivityId:all.id
    },
    success:function(res){
      console.log(res)
      var num1=0;
      var num2 = 0;
      var num3= 0;
      var num4 = 0;
      var list = res.data.detail
      var article = list.ActivityIntroduction;
      WxParse.wxParse('article', 'html', article, that, 5);
      var article1 = list.Address
      WxParse.wxParse('article1', 'html', article1, that, 5);
      list.ActiveDate = unti.ACtime(list.ActiveDate)
      var atty = res.data.works
      for(let j=0;j<atty.length;j++){
        if (atty[j].WinType==1001){
          num1++
        }
        if (atty[j].WinType == 1002) {
          num2++
        }
        if (atty[j].WinType == 1003) {
          num3++
        }
        if (atty[j].WinType == 1004) {
          num4++
        }
      }
      that.setData({
        list:list,
        arry: atty,
        num1: num1,
        num2: num2,
        num3: num3,
        num4: num4
      })
    },
  })
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.Content()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})