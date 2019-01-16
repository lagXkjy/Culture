// Cultrue/Readaloud/Readaloud.js
var common=require('../../common.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
      url:common.config.url
  },
  // 链接
  LianJie:function(e){
    var idx = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../Authorinintroduction/Authorinintroduction?id=' + idx,
    })
  },
  changeTitle:function(str){
    wx.setNavigationBarTitle({
      title: str,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    console.log(options)
    var typeid = options.id
    var that = this
    if(typeid==3){
      that.changeTitle('编校');
    }
    if (typeid == 4) {
      that.changeTitle('朗诵');
    }
    if (typeid == 5) {
      that.changeTitle('评阅组');
    }
    if (typeid == 6) {
      that.changeTitle('制作');
    }
    if (typeid == 7) {
      that.changeTitle('特约评论组');
    }
    if (typeid == 8) {
      that.changeTitle('宣传组');
    }
    wx.request({
      url: common.config.TeamUser,
      method: 'post',
      data: { role: typeid },
      success: function (res) {
        console.log(res.data)
        that.setData({
          list:res.data
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
  onShow: function (options) {
   
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