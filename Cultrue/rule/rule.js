// Cultrue/rule/rule.js
var common = require('../../common.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Img: '../../../images/left-to_03.png',
    arry: [
      {
        ID: 1,
        title: "如何成为在场作者？",
        url: "../Aboutpresent/Aboutpresent",
      }
    ]
  },
  GpoTp: function (e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../ProseVol/ProseVol?id=' + e.currentTarget.dataset.id,
    })
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
    var that = this;
    that.ShowData();
  },
  ShowData: function () {
    var that = this;
    wx.request({
      url: common.config.rule,
      data: {},
      method: 'get',
      success: function (res) {
        console.log(res.data);
        that.setData({
          arry: res.data
        })
      }, fail: function (e) {
        console.log("报错了");
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