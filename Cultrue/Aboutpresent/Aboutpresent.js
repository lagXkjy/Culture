// Cultrue/Aboutpresent/Aboutpresent.js
var common=require('../../common.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
     
    ],
    url:common.config.url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
      var that=this

      wx.request({
        url: common.config.banner,
        method:'post',
        data: { desAdd:'关于在场'},
        success:function(res){
          console.log(JSON.parse(res.data.Code))
          var dt = JSON.parse(res.data.Code)
          if (dt.length>0){
            that.setData({
              imgUrls: dt
            })
          }
        },
        fail:function(e){
          console.log(e)
        }
      })
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