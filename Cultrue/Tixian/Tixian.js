// pages/Tixian/Tixian.js


var common=require('../../common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CanUse:0.00,
    OutMoney:0
  },
  // 金额判断
  formSubmit: function (e) {
    var that=this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if (e.detail.value.mony < 10 ){
      wx.showToast({
        title: "不能少于10",
        icon: "success",
        duration: 500
      })
    }else{
      if (that.data.CanUse >= e.detail.value.mony){
        wx.request({
          url: common.config.askForChat,
          data: { userId: wx.getStorageSync("userid"), total_fee: e.detail.value.mony, market: e.detail.value.beizhu },
          method: 'post',
          success: function (res) {
            console.log(res)
            wx.showModal({
              title: '提现申请',
              content: '您的提现申请已提交，请耐心等待',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
          }, fail: function (ex) {
            console.log(ex)
            console.log('出错了 了  ')
          }
        })
      }else{
        wx.showModal({
          title: '提现申请',
          content: '您的可提现余额已不足，为：' + that.data.CanUse,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      }
      
    }
  },
  // 输入时触发
  changemoney:function(e){
    var num=e.detail.value;
    console.log(num)
    var that=this
    console.log(!/^[1-9]\d*$/.test(num))
    if (!/^[1-9]\d*$/.test(num)){
      that.setData({
        OutMoney: 0
      })
    }else{
      that.setData({
        OutMoney: num
      })
    }
   
  },
  // 去收入详情页面
  ShouRu:function(){
    wx.navigateTo({
      url: '../shouru/shouru',
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
    var that=this
    wx.request({
      url: common.config.getUseMoney,
      data: { userId: wx.getStorageSync("userid")},
      method:'post',
      success:function(res){
          console.log(res.data)
          that.setData({
            CanUse:res.data.sum
          })
      },fail:function(e){
        console.log(e);
        console.log('报错了 啦啦啦啦啦啦');

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