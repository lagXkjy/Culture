// Cultrue/CommentDetail/CommentDetail.js
var common=require("../../common.js")
var utils = require("../../utils/util.js")
var all;
var uid = wx.getStorageSync("userid");
var NickName="";
var Headurl = "";
var mainId = "";
var contendId = "";0
var page=1;
var LIST=[]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: common.config.MYimg,
    JiaShow: false,
    kong1:'',
    All: false,
    HuiFu:true,
    ISLun:true,
    kong:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    all = options
    this.content()
  },
//加载数据
content:function(){
  var that=this
  that.setData({
    JiaShow: true,
  })
  wx.request({
    url: common.config.contenddetails,
    data:{
      contendId: all.id
    },
    success:function(res){
     var list=res.data
     if (res.data.conment.length==0){
       that.setData({
         ISLun: false,
       })
     }else{
     }
      list.data.Imgs = list.data.Imgs .split(",")
      list.data.CreateTime = utils.Altime(list.data.CreateTime)
      that.setData({
        list: list,

      })
      console.log(list)
    },
    fail:function(){},
    complete:function(){
      that.setData({
        JiaShow: false,
      })
    }
  })
},
//浏览次数
LiuLan:function(){
  wx.request({
    url: common.config.ZhenMingLiu,
    data:{
      userId:uid,
      contendId:all.id
    },
    success:function(res){
      console.log(res)
    }
  })
},
// 评论内容
inputValue: function (e) {
  this.setData({
    inputValue: e.detail.value
  })
},
areaValue:function(e){
  this.setData({
    areaValue: e.detail.value
  })
},
// 确认提交
  TiJiao:function(){
    var that = this
    if (that.data.areaValue == undefined) {
      common.DoSuccess("说点啥吧", 1000)
    }else{
      
      var data = {
        userId: uid,
        Massage: that.data.areaValue,
        NickName: wx.getStorageSync('nickName'),
        Headurl: wx.getStorageSync('avatarUrl'), 
        mainId: that.data.id,
        contendId: all.id
      }
      that.PingLun(data)
    }
  },
// 评论提交
submit: function () {
  var that = this
  console.log()
  if (that.data.inputValue == undefined || that.data.inputValue == "") {
    common.DoSuccess("说点啥吧", 1000)
  } else {
    console.log(that.data.inputValue)
    var data = {
      userId: uid,
      Massage: that.data.inputValue,
      NickName: wx.getStorageSync('nickName'),
      Headurl: wx.getStorageSync('avatarUrl'), 
      mainId: mainId ,
      contendId: all.id 
    }
    console.log(data)
    that.PingLun(data)
  }
},
// 关闭模态框
  ClanMode:function(){
    this.setData({
      HuiFu: true,
    })
  },
// 回复评论
  HuiFuPinLun:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id
    this.setData({
      HuiFu:false,
      id:id
    })
  },
// 评论
PingLun:function(data){
  var that=this
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: common.config.contenddetailsUp,
    method: "post",
    data: data,
    success: function (res) {
      console.log(res)
      if (res.data.Code) {
        common.DoSuccess(res.data.msg, 1000)
        setTimeout(function(){
          that.setData({
            HuiFu: true,
            ISLun: true,
            kong: '',
            kong1:'',
          })
          that.JiaZaiPingLun()
        },1000)
      }
    },
    complete:function(){
      wx.hideLoading()
    },
  })
},

// 加载评论
  JiaZaiPingLun:function(page){
    var that=this
    that.setData({
      JiaShow:true,
    })
    wx.request({
      url: common.config.JiaZaiPingLun,
      method:"post",
      data:{
        page:page,
        contendId: all.id,
        pagesize:10
      },
      success:function(res){
        console.log(res)
        if(res.data.data.length!=0){
          var list = res.data.data
          for (var i = 0; i < list.length;i++){
            list[i].SendTime = utils.ACtime(list[i].SendTime)
          }
          that.setData({
            JiaShow: false,
            LIST: list,
            All:false
          })
        } 
         if ((res.data.data.length)<(page-1)*10){
          console.log("没有跟多")
          that.setData({
            JiaShow: false,
            All: true
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    page=1
    this.JiaZaiPingLun(page)
    this.LiuLan();
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
    page++
    this.JiaZaiPingLun(page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})