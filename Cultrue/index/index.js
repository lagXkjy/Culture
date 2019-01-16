//获取应用实例

var app = getApp();
var userCode = '';
Page({
  data: {
    bggo: "../../images/gong_my_03.png",
    bgimg: "https://wx9s.1-zhao.com/Images/bg-ce_02.jpg",
    arry: [
      {
        img: "../../images/shu_03.png",
        title: "关于在场",
        img2: "../../images/left-to_03.png",
        index: 0,
        url: "../Aboutpresent/Aboutpresent",
        display: false
      },
      {
        img: "../../images/wujiaox_03.png",
        title: "在场团队",
        img2: "../../images/left-to_03.png",
        index: 1,
        url: "../Team/Team",
        display: false
      },
      {
        img: "../../images/didian_11.png",
        title: "在场规则",
        img2: "../../images/left-to_03.png",
        index: 2,
        url: "../rule/rule",
        display: false
      },
      {
        img: "../../images/guanliren_14.png",
        title: "我的钱包",
        img2: "../../images/left-to_03.png",
        url: "../Tixian/Tixian",
        index: 3,
        display: false
      },
    ]
  },
  lianjie:function(e){
    var idx = e.currentTarget.dataset.index;
    var url = this.data.arry[idx].url
    console.log(idx)
    wx.navigateTo({
      url: url,
    })
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
