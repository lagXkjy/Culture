// Cultrue/Team/Team.js

var common=require('../../common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl:common.config.url,
    bgimg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    list:[
      {
        Name:"周闻道",
        RoleName:"总编",
        jieshao:"在场主义的创始人和代表作家",
        HeadUrl:"../../images/zongbinaa_03.jpg",
        hidden: false,
        url:'../Authorinintroduction/Authorinintroduction'
      }
    ],
    types:[
      {
        ID:3,
        RoleName:'编校',
        BackImg:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        ID: 4,
        RoleName: '朗诵',
        BackImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      }, {
        ID: 5,
        RoleName: '制作',
        BackImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      }, {
        ID: 6,
        RoleName: '阅评组',
        BackImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      }, {
        ID: 7,
        RoleName: '特约评论组',
        BackImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      }
    ]
  },
  //点击查看团队人员
  toShowUser:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../Readaloud/Readaloud?id=' + e.currentTarget.dataset.id,
    })
  },
  // 跳转
  GouTo:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../Authorinintroduction/Authorinintroduction?id='+id,
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this
      wx.request({
        url: common.config.aboutTeam,
        method:'post',
        data:{},
        success:function(res){
            console.log(res)
            console.log(res.data)
            that.setData({
              types:res.data.rule,
              list:res.data.edition
            })
        },
        fail:function(e){
            
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