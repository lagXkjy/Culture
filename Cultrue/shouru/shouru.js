// pages/shouru/shouru.js

var common=require('../../common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        title:"来自Happy的打赏红包",
        time:"2017-08-08 12:23：54",
        money:"15.00",
        ISadd:true,
      },
      {
        title: "提现",
        time: "2017-08-08 12:23：54",
        money: "15.00",
        ISadd: false,
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that=this
  wx.request({
    url: common.config.GetTixinList,
    method:'post',
    data: { userId: wx.getStorageSync("userid")},
    success:function(res){
      console.log(JSON.parse(res.data.data))
      that.setData({
        list: JSON.parse(res.data.data)
      })
    },
    fail:function(e){
        console.log(e)
        console.log('出错了  .....')
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