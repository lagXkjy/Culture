// Cultrue/ReadDetail/ReadDetail.js
var WxParse = require('../../wxParse/wxParse.js');
var utils=require("../../utils/util.js")
var common=require("../../common.js")
var key=false;
var all;
var width;
var uid;
const innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ISWork:true,
    ISLun:true,
    hidden:true,
    XianShi:true,
    work:true,
    value:'',
    push:true,
    sunall:"",
    showmodel:true,
    moey:[
      { yuan: 1 },
      { yuan:2 },
      { yuan: 5 },
      { yuan: 20 },
      { yuan: 100 },
    ],
    
    ctrl: "音乐控制区域",
    cpTime: '00:00',
    duration: '00:00',
    lrcList: [],
    imgUrls:[],
    url:common.config.url
  },
  ISWork:function(){
    var ISWork = this.data.ISWork
    if (this.data.Leng >= 1) {
      var ISWork = this.data.ISWork
      this.setData({
        ISWork: !ISWork
      })
    }
  },
  ISLun: function () {
    if (this.data.sunall>=1){
      var ISLun = this.data.ISLun
      this.setData({
        ISLun: !ISLun
      })
    }
  },
  playSong: function () {
    var that=this
    wx.playBackgroundAudio({
      dataUrl: that.data.url+ that.data.LIST.Article.VoiceFile,
    })
  },

// 朗诵轮播图
LUNBo:function(){
  var that = this
  wx.request({
    url: common.config.Roastingchart,
    data: {
      desAdd: "朗诵"
    },
    success: function (res) {
      console.log(JSON.parse(res.data.Code))
      that.setData({
        imgUrls: JSON.parse(res.data.Code)
      })
    },
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  // 支付
QUKanJiang: function (e) {
  var idx = e.currentTarget.dataset.id;
  wx.navigateTo({
    url: '../ReadDetail/ReadDetail?ID=' + idx,
  })
},
  ZhiFu:function(e){
    var id = e.currentTarget.dataset.id;
    var price = this.data.moey[id].yuan
    var that=this
    that.setData({
      hidden:false
    })
    console.log(wx.getStorageSync("Code"))
    console.log(that.data.LIST.Author.UserId)
    var data = {
      code: wx.getStorageSync("openid"),
      price: price,
      AuthorId: that.data.LIST.Author.UserId,
      userId: wx.getStorageSync("userid")
    }
    console.log(data)
   wx.request({
     url: common.config.PayMoney,
     method:"post",
     data:data,
     success:function(res){
       console.log(res)
       wx.requestPayment({
         timeStamp: res.data.timeStamp,
         nonceStr: res.data.nonceStr,
         package: res.data.package,
         signType: 'MD5',
         paySign: res.data.paySign,
         'success': function (res) {
           common.DoSuccess('打赏成功',1000)
         },
         'fail': function (res) {
         }
       })
     },
     fail:function(res){},
     complete:function(){
       that.setData({
         hidden: true
       })
     }
   })
  },
  // 
  onLoad: function (options) {
    uid= wx.getStorageSync("userid");
    var that = this;
    this.Content(options.ID,uid)
    all = options
    console.log(all.ID)
    that.LUNBo()
  },
  onReady: function () {
    // 页面渲染完成
  },
  // 跳转小程序

  newGong:function(){
    wx.navigateToMiniProgram({
      appId: 'wxfb7c3418c1416543',
      path: 'pages/Newindex/index',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'develop',
      success(res) {
        // 打开成功
        console.log('成功')
      },
      fail(res){},
    })
  },
getSongStatus: function () {
    let that = this
    setInterval(() => {
      wx.getBackgroundAudioPlayerState({
        success: (res) => {
          let status = res.status
          let currentPosition = res.currentPosition
          let duration = res.duration

          if (status === 1) {
            that.setData({
             
              duration: this.formatTime(duration),
              durationA: duration,
            })
            if(!key){
              that.setData({
                musicPg: ((currentPosition / duration) * 100),
                 cpTime: this.formatTime(currentPosition),
              })
            }
          } else if (status === 2){
            wx.stopBackgroundAudio()
            that.setData({
              cpTime: this.formatTime(0),
              musicPg: 0,
              status:"play"
            })
          }
        }
      })
    }, 1000);
  },
  // 开始
drawStart: function (e) {
  console.log(e)
  console.log("drawStart");
  let startX = e.changedTouches[0].clientX-19;
  this.AllFunction(startX);
  key=true;
},
// 移动
drawMove:function(e){
  if (key){
    let startX = e.changedTouches[0].clientX - 19;
    this.AllFunction(startX);
  }
},
// 结束
drawEnd:function(e){
  let startX = e.changedTouches[0].clientX - 19;
  key = false
  this.AllFunction(startX);
},


// 播放移动函数
 AllFunction: function (Left){
  let now = this.data.durationA;
  let pre = Left / (width - 38)
  let time = Math.round(pre * now)
  console.log(pre + '.' + time)
  if(!key){
    wx.seekBackgroundAudio({
      position: time
    })
  }
  this.setData({
    musicPg: Math.round(pre*100),
    cpTime: this.formatTime(time),
  })
},
  // 选择进度条
// ChoosePro:function(e){
//   console.log(e)
//   let Left=e.detail.x-19;
//   console.log(Left)
  
// },

playMusic:function(option){
    wx.seekBackgroundAudio({
      position: 0
    })
},
  clickPlay: function () {
    let that = this
    var play = that.data.status === 'pause' ? 'play' : 'pause'
    that.setData({
      status: play,
      push:false
    })
    wx.getBackgroundAudioPlayerState({
      complete: (e) => {
        console.log(e)
        let s = e.status
        switch (s) {
          case 0:
            this.playSong()
            break;
          case 1:
            wx.pauseBackgroundAudio()
            break;
          default:
            this.playSong()
            this.getSongStatus()
            break;
        }
      }
    })
  },
  formatTime: (time) => {
    time = Math.floor(time);
    var m = Math.floor(time / 60).toString();
    m = m.length < 2 ? '0' + m : m;
    var s = (time - parseInt(m) * 60).toString();
    s = s.length < 2 ? '0' + s : s;
    return m + ':' + s;
  },
  // 加载数据
  Content:function(id,uid){
    var that=this
    wx.request({
      url: common.config.readDetail,
      data:{
        titleId:id,
        userid:uid
      },
      success:function(res){
        console.log(res)
        var list = res.data
        list.Article.publishTime = utils.Time(list.Article.publishTime)
        console.log(list)
        for (var i = 0; i < list.UserComment.length;i++){
          list.UserComment[i].CreateTime = common.timeStamp2String(list.UserComment[i].CreateTime)
        }
        if (list.UserComment.length<=2){
          that.setData({
            ISLun:false,
          })
        }
        if (list.works.length <= 2) {
          that.setData({
            ISWork: false,
          })
        }
        if (list.UserComment.length == 0) {
          that.setData({
            XianShi: false,
          })
        }else{
          that.setData({
            XianShi: true,
          })
        }
        if (list.works.length == 0) {
          console.log(123)
          that.setData({
            Work: false,
          })
        }
        that.setData({
          LIST: list,
          sunall: list.UserComment.length-2,
          Leng: list.works.length - 2,
        })
        var article = that.data.LIST.Article.Content;
        /**
        * WxParse.wxParse(bindName , type, data, target,imagePadding)
        * 1.bindName绑定的数据名(必填)
        * 2.type可以为html或者md(必填)
        * 3.data为传入的具体数据(必填)
        * 4.target为Page对象,一般为this(必填)
        * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
        */
        console.log(article)
        WxParse.wxParse('article', 'html', article, that, 5);
       // 页面初始化 options为页面跳转所带来的参数
      },
      fail:function(res){
        console.log(res)
      }
    })
  },
  // 收藏
  ShouCang:function(){
    console.log(wx.getStorageSync("userid"))
    var that = this
    var sum = that.data.LIST.CollectNum
    wx.request({
      url: common.config.collect,
      method: "post",
      data: {
        ArticalId: all.ID,
        userId: wx.getStorageSync("userid")
      },
      success: function (res) {
        console.log(res)
        if (res.data.Code) {
          if (res.data.msg == "收藏成功") {
            common.DoSuccess("收藏成功", 500)
            sum++
            that.setData({
              "LIST.IsMyCollect": 1,
              "LIST.CollectNum": sum
            })
          } else if (res.data.msg == "取消收藏成功") {
            common.DoSuccess("取消收藏成功", 500)
            sum--
            that.setData({
              "LIST.IsMyCollect": 0,
              "LIST.CollectNum": sum
            })
          }
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  // 点赞
  DianZan:function(){
    var that=this
    var sum = that.data.LIST.LikeNum
    wx.request({
      url: common.config.givealike,
      method:"post",
      data:{
        ArticalId:all.ID,
        userId:uid
      },
      success:function(res){
        console.log(res)
        if (res.data.Code){
          if (res.data.msg == "点赞成功"){
            common.DoSuccess("点赞成功",500)
            sum++
            that.setData({
              "LIST.IsMyLike": 1,
              "LIST.LikeNum":sum
            })
          } else if (res.data.msg == "取消点赞成功"){
            common.DoSuccess("取消点赞成功", 500)
            sum--
            that.setData({
              "LIST.IsMyLike": 0,
              "LIST.LikeNum": sum
            })
          }
        }
      },
      fail:function(res){
        console.log(res)
      }
    })
  },
  // 评论内容输入
  inputValue:function(e){
    this.setData({
      inputValue: e.detail.value
    })
  },
  // 评论内容提交
  submit:function(){
    var that = this
    if (that.data.inputValue ==undefined){
      common.DoSuccess("说点啥吧", 1000)
    }else{
      wx.showLoading({
        title: '加载中',
      })
      console.log(that.data.inputValue)
      var data = {
        userId: uid,
        comment: that.data.inputValue,
        ArticalId: all.ID
      }
      console.log(data)
      wx.request({
        url: common.config.Readreviews,
        method: "post",
        data: data,
        success: function (res) {
          console.log(res)
          if (res.data.Code) {
            common.DoSuccess(res.data.msg, 1000)
            that.setData({
              value:""
            })
            that.Content(all.ID,uid)
          }
        },
        complete:function(){
          wx.hideLoading()
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        width = res.screenWidth
      }
    })
    this.workthrough()
  },
// 作品浏览次数
  workthrough:function(){
    wx.request({
      url: common.config.workthrough,
      data:{
        ArticleId: all.ID,
        userId:uid
      },
      success:function(res){
        console.log(res)
        console.log(all.ID)
      },
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
 
    console.log(123)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.stopBackgroundAudio()
    console.log(123)
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
  
  },
  //模态框开
  showModel: function () {
    this.setData({
      showmodel: false
    })
  },
  //模态框关闭
  closeModel: function () {
    this.setData({
      showmodel: true
    })
  },
})