// Cultrue/SchoolsContend/SchoolsContend.js
var common=require("../../common.js")
var LIST=[];
var page = 1;
var uid = wx.getStorageSync("userid")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: common.config.MYimg,
    Allcontent:true,
    JiaShow:false,
  },
  GoToFaTie:function(){
    wx.navigateTo({
      url: '../post/post',
    })
  },
  GoTo:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../CommentDetail/CommentDetail?id='+id,
    })
  },
  // 数据渲染
  Content: function (page){
    var that=this
    that.setData({
      JiaShow: true,
    })
    wx.request({
      url: common.config.contendthehomepage,
      method:"get",
      data:{
          page:page,
          pagesize:10,
      },
      success:function(res){
        console.log(res.data)
        var list = res.data.data
        for (var i = 0; i <list.length;i++){
          console.log(list[i].contend.Imgs)
          list[i].contend.Imgs = list[i].contend.Imgs.split(",")
          LIST.push(list[i])
        }
        if (res.data.data.length>0){
          that.setData({
            list: LIST,
            Allcontent: true,
            JiaShow: false
          })
        }
        if (res.data.data.length ==0&&page!=1){
          console.log("没有跟多了")
          that.setData({
            Allcontent: false,
            JiaShow: false
          })
        }
        if (res.data.data.length == 0 && page == 1) {
          console.log("暂时还无人发帖")
        }
      },
      fail:function(){},
      complete:function(){
        that.setData({
          JiaShow: false,
        })
      }
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
    var that=this
    that.setData({
      JiaShow: true
    })
    page++
    this.Content(page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})