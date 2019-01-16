// Cultrue/Authorinintroduction/Authorinintroduction.js

var common=require('../../common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:common.config.url,
    imgUrls: [
    ],
    da:{
      Name:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

   
    console.log(options)
    wx.request({
      url: common.config.getteamUser,
      method: 'post',
      data: { id: options.id },
      success: function (res) {
        console.log(res)
        that.setData({
          da: res.data,
          imgUrls: JSON.parse(res.data.HeadUrl)
        })
      },
      fail: function (e) {
        console.log(e)
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