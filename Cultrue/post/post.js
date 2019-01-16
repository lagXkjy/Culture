var app = getApp()
var list = []
var CommodityId
var OrderID;
var LIST = []
var common=require("../../common.js");
var uid = wx.getStorageSync("userid");
var istrue=false

Page({
  data: {
    list: [],
    ISSPEC: false,
    hidden:true,
  },
  onLoad: function (options) {
  },
//发帖
  Posting: function (title, Content){
    var that=this
    that.setData({
      hidden:false
    })
    if (title.length<4 || Content==""){
      common.modalTap("请填写正确")
      that.setData({
        hidden: true
      })
    }else{
      console.log(LIST)
      var newL=[]
      for (var i = 0; i < LIST.length;i++){
        if (i<3){
          newL.push(LIST[i])
        }
      }
      wx.request({
        url: common.config.Posting,
        method:"post",
        data: {
          userId: uid,
          title: title,
          content: Content,
          Imgs: newL.join(",")
        },
        success: function (res) {
          console.log(res)
          if(res.data.Code){
            common.DoSuccess(res.data.msg,1000)
            setTimeout(function(){
              wx.navigateBack({
                delta: 1
              })
            },1000)
          }
        },
        fail: function (res) {
          console.log(res)
        },
        complete(){
          that.setData({
            hidden: true
          })
        }
      })
    }
},
onUnload:function(){
  list = [],
  LIST=[]
  console.log(555)
},
  formSubmit:function(e){
    console.log(e.detail.value)
    this.Posting(e.detail.value.title,e.detail.value.content)
  },
  uploadimg: function (data) {
    var that = this,
      i = data.i ? data.i : 0,
      success = data.success ? data.success : 0,
      fail = data.fail ? data.fail : 0;
    wx.uploadFile({
      url: data.url,
      method:"post",
      filePath: data.path[i],
      name: 'fileData',
      formData: null,
      success: (resp) => {
        success++;
        console.log(resp)
        console.log(i);
        LIST.push(JSON.parse(resp.data).imgs)
        //这里可能有BUG，失败也会执行这里
        console.log(LIST)
      },
      fail: (res) => {
        fail++;
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        console.log(i);
        i++;
        if (i == data.path.length) {  //当图片传完时，停止调用     
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }

      }
    });
  },
  

  Upimg: function () {//这里触发图片上传的方法
    var that = this
    var pics = this.data.pics;
    console.log(pics)
    that.uploadimg({
      url: common.config.UpLoadPhoto,//这里是你图片上传的接口
      path: pics//这里是选取的图片的地址数组
    });
  },

  chooseimg: function () {
    var that = this
    wx.chooseImage({
      count: 3, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          if(list.length<=2){
            list.push(res.tempFilePaths[i])
          }
          that.ISCang(list)
        }
        console.log(list)
        var tempFilePaths = res.tempFilePaths
        that.setData({
          pics: tempFilePaths
        });
        that.Upimg()
        that.setData({
          list: list
        })
      }
    })
    
  },
  //开始
  touchStart:function(e){
    istrue=true
  },
  // 长安
  longTap:function(e){
    var that=this
    var idx = e.currentTarget.dataset.id;
    if(istrue){
      console.log(123)
     wx.showModal({
  title: '提示',
  content: '删除此照片？',
  success: function(res) {
    if (res.confirm) {
      console.log('用户点击确定')
      console.log(idx)
      LIST.splice(idx,1)
      list.splice(idx, 1)
      var NewL=that.data.list
      NewL.splice(idx, 1)
      console.log(list)
      console.log(LIST)
      that.ISCang(NewL)
      that.setData({
        list: NewL
      })
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
})
    }
  },
  // 结束
  touchEnd:function(){
    istrue = false
    console.log(12)
  },
  // 判断影藏不
  ISCang:function(list){
    var that=this
    var lang = list.length
    console.log(lang)
    if (lang>=3){
      that.setData({
        ISSPEC:true
      })
    }else{
      that.setData({
        ISSPEC: false
      })
    }
  },
})