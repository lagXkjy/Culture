// Cultrue/activity/activity.js
var common=require("../../common.js");
var unti=require("../../utils/util.js")
var LIST=[];
var page=1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    JiaShow: false,
    All: false,
    ZanWu: false,
    url: common.config.url,
  list:[
   
  ]
  },
  GoTo:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../Eventdetails/Eventdetails?id='+id,
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
  //渲染数据
  Content: function (page){
    var that=this
    wx.request({
      url: common.config.activity,
      data:{
        page:page,
      },
      success:function(res){
        // console.log(res)
        // var list=res.data
        // if(res.data!=""){
        //   for (let i = 0; i < list.length; i++) {
        //     list[i].ActiveDate = unti.ACtime(list[i].ActiveDate)
        //     LIST.push(list[i])
        //   }
        //   that.setData({
        //     list: LIST
        //   })
        // } else if (res.data==0){
        //   if(page==1){
        //     console.log("暂无数据")
        //   }else{
        //     console.log("没有更多了")
        //   }
        // }
        console.log(res.data)
        var list = res.data
        if (list != "") {
          for (let i = 0; i < list.length; i++) {
            list[i].ActiveDate = unti.ACtime(list[i].ActiveDate)
            LIST.push(list[i])
          }
          that.setData({
            list: LIST,
            All: false,
            ZanWu: false,
          })
        } else if (list == "") {
          if (page == 1) {
            console.log("暂无数据")
            that.setData({
              All: false,
              ZanWu: true,
            })
          } else {
            console.log("没有更多了")
            that.setData({
              All: true,
              ZanWu: false,
            })
          }
        }
        console.log(LIST)
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    page=1
    LIST=[];
    this.Content(page)
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
    this.Content(page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})