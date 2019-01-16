// Cultrue/Mycollection/Mycollection.js
var common=require("../../common.js")
var page=1;
var ids=[];
var uid = wx.getStorageSync("userid")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    JiaShow: false,
    All: false,
    ZanWu:false,
    url:common.config.url,
  list:[
    
  ]
  },
  Speacl:function(e){
    var idx = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../ReadDetail/ReadDetail?ID=' + idx,
    })
  },
  select:function(e){
    var idx = e.currentTarget.dataset.index;
    var list = this.data.list;
    var show = list[idx].show;
    list[idx].show = !show;
      this.setData({
        list:list
      })
  console.log(list)
      this.allSum()
  },
  // 汇总
  allSum:function(){
    var sum=0;
    ids=[];
    var list =this.data.list;
    for(var i=0;i<list.length;i++){
      if(list[i].show){
        sum++
        ids.push(list[i].ID)
        console.log(ids)
      }
    }
    this.setData({
      sum: sum
    })
  },
  // 删除
  Remove:function(){
    var that=this
    if(this.data.sum==0){
      common.DoSuccess("暂无选择",1000)
    }else{
      wx.showModal({
        title: '提示',
        content: '确认删除此项？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.removeCollect(ids)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  // 删除收藏接口
  removeCollect: function (ids){
    console.log(uid)
    var that=this
    wx.request({
      url: common.config.RemovecollectList,
      method:"post",
      data:{
        UserId: wx.getStorageSync("userid"),
        ids:ids
      },
      success:function(res){
        console.log(res)

        if(res.data.Code){
          common.DoSuccess(res.data.msg,1000)
          that.Content(page)
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    
  },
// 数据渲染
  Content: function (page){
    var that=this
    that.setData({
      JiaShow:true,
      ZanWu: false,
    })
  wx.request({
    url: common.config.collectList,
    data:{
      page:page,
      userid: wx.getStorageSync("userid"),
    },
    success:function(res){
      console.log(res)
      var LIST=res.data;
      if(res.data!=""){
        for(var j=0;j<LIST.length;j++){
          LIST[j].index=j;
          LIST[j].show = false
        }
        that.setData({
          list: LIST,
          JiaShow: false,
          ZanWu:false,
          All: false,
        })
      } else if (LIST == ""){
        if(page==1){
          console.log("暂无数据")
          that.setData({
            list: LIST,
            JiaShow: false,
            All: false,
            ZanWu:true,
          })
        }
      } else if (LIST.length<page*10){
        console.log("没有跟多了")
        that.setData({
          JiaShow: false,
          All: true,
          ZanWu:false,
        })
      }
      console.log(LIST)
      that.allSum()
    },
    complete:function(){
      that.setData({
        JiaShow: false,
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
    page=1
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