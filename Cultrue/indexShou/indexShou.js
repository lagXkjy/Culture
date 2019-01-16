// Cultrue/indexShou/indexShou.js
var common=require("../../common.js")
var LIST=[];
var page=1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    JiaShow:false,
    All:false,
    ZanWu: false,
    navbar: ['作品', '推荐', '朗诵', "争鸣", "在场酒吧"],
    currentTab: 0,
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    url: common.config.url
  },
  navbarTap: function (e) {
    page=1
    var that=this
    LIST = []
    that.setData({
        currentTab: e.currentTarget.dataset.idx,
         list: LIST 
    })
    var that = this
    console.log(123)
    if (this.data.currentTab == 1) {
     
      that.Content(1, 1)
    }
    if (this.data.currentTab == 2) {
     
      that.Content(2, 1)
    }
    if (this.data.currentTab == 0) {
    
      that.Content("", 1)
    }
    // if (e.currentTarget.dataset.idx == 1) {
    //   that.Content(1)
    // }
    // if (e.currentTarget.dataset.idx == 2) {
    //   that.Content(2)
    // }
    if (e.currentTarget.dataset.idx==3){
      wx.navigateTo({
        url: '../SchoolsContend/SchoolsContend?id=0',
      })
    }
    if (e.currentTarget.dataset.idx == 4) {
      wx.navigateTo({
        url: '../bar/bar?id=0',
      })
    }
  },
//  朗诵
  GoToNew:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../ReadDetail/ReadDetail?ID=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    that.Content("", 1)
    common.GetOpenId()
    that.Roastingchart()
  },
// 轮播图接口
  Roastingchart:function(){
    var that=this
    wx.request({
      url: common.config.Roastingchart,
      data:{
        desAdd:"首页"
      },
      success:function(res){
        console.log(JSON.parse(res.data.Code))
        that.setData({
          imgUrls: JSON.parse(res.data.Code)
        })
      },
    })
  },

  //数据接口
  Content: function (typeId, page){
    var that=this
    that.setData({
      JiaShow: true,
      All: false,
      ZanWu: false,
    })
    console.log(common.config)
    wx.request({
      url: common.config.indexAll,
      data:{
        typeId: typeId,
        page:page
      },
      method:"post",
      success:function(res){
        console.log(res.data)
        var list=res.data
        if (list!=""){
          for(let i=0;i<list.length;i++){
            LIST.push(list[i])
          }
          that.setData({
            list: LIST,
            All: false,
            ZanWu:false,
          })
        }else if(list==""){
          if(page==1){
            console.log("暂无数据")
            that.setData({
              All:false,
              ZanWu: true,
            })
          }else{
            console.log("没有更多了")
            that.setData({
              All: true,
              ZanWu: false,
            })
          }
        }
       console.log(LIST)
      },
      fail:function(res){
        console.log(res)
      },
      complete:function(){
        that.setData({
          JiaShow: false
        })
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
    var that=this
    console.log(1235)
    if (this.data.currentTab == 3) {
    that.setData({
      currentTab:0
    })
    that.Content("", 1)
    }
    if (this.data.currentTab == 4) {
      LIST=[]
      that.setData({
        currentTab: 0
      })
      that.Content("", 1)
    }

    if (this.data.currentTab == 2) {
      LIST = []
      that.Content(2, 1)
    }
    if (this.data.currentTab == 1) {
      LIST = []
      that.Content(1, 1)
    }
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
    var that = this
     
    if (this.data.currentTab == 1) {

      page++
      that.Content(1, page)
    }
    if (this.data.currentTab == 2) {

      page++
      that.Content(2, page)
    }
    if (this.data.currentTab == 0) {

      page++
      that.Content("", page)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})