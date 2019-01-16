var host = "hjwx.1-zhao.com"
var config = {
  //下面的地址配合云端 Server 工作
  host,
  // 图片路径
  url: `http://wxadmin.1-zhao.com`,
  MYimg:`https://${host}`,
  GetOrSetOpenid: `https://${host}/cultures/WeixinGet/GetSaveOpenId`,
  //首页
  indexAll: `https://${host}/cultures/Home/SampleReels`,
  //朗诵详情
  readDetail: `https://${host}/cultures/Home/SampleDetail`,
  //点赞
  givealike: `https://${host}/cultures/ThisSelf/Like`,
  //收藏
  collect: `https://${host}/cultures/Collection/Collect`,
  //作品浏览
  workthrough: `https://${host}/cultures/Home/lookArticle`,
  //首页轮播图
  Roastingchart: `https://${host}/cultures/Home/BannerList`,
  //朗诵评论提交接口
  Readreviews: `https://${host}/cultures/Home/SendCom`,
  // 争鸣首页
  contendthehomepage: `https://${host}/cultures/Contend/ContendList`,
  //争鸣详情
  contenddetails: `https://${host}/cultures/Contend/ContendDetail`,
  //发帖
  Posting: `https://${host}/cultures/Contend/sendContend`,
  //图片上传接口
  UpLoadPhoto: `https://${host}/cultures/Contend/UpLoadPhoto`,
  //争鸣浏览
  ZhenMingLiu: `https://${host}/cultures/Contend/LookContend`,
  // 活动
  activity: `https://${host}/cultures/Activity/ActivityList`,
  // 活动详情
  activityDetail: `https://${host}/cultures/Activity/ActivityDetail`,
  //收藏列表
  collectList: `https://${host}/cultures/Collection/CollectionList`,
  //删除收藏
  RemovecollectList: `https://${host}/cultures/Collection/DelCollect`,
  //争鸣评论提交
  contenddetailsUp: `https://${host}/cultures/Contend/sendComent`,
  // 加载评论
  JiaZaiPingLun: `https://${host}/cultures/contend/List2`,
  // 朗诵轮播图
  LiangSong: `https://${host}/cultures/Home/BannerList `,

  // 
  //在场规则
  rule: `https://${host}/cultures/ThisSelf/Rule`,
  //在场规则详情
  RuleDetail: `https://${host}/cultures/ThisSelf/RuleDetail`,
  //RuleDetail获取用户可提现金额
  getUseMoney: `https://${host}/cultures/ThisSelf/getMyUsemoney`,
  //用户申请提现
  askForChat: `https://${host}/cultures/ThisSelf/askForChat`,
  //获取收益记录
  GetTixinList: `https://${host}/cultures/ThisSelf/GetList`,
  //在场队员
  TeamUser: `https://${host}/cultures/ThisSelf/TeamUser`,
  //获取banner
  banner: `https://${host}/cultures/Home/BannerList`,

  //在场团队
  aboutTeam: `https://${host}/cultures/ThisSelf/aboutTeam`,
  //在场队员简介
  getteamUser: `https://${host}/cultures/ThisSelf/getteamUser`,
  // 支付接口
  PayMoney: `https://${host}/cultures/PayContend/pay`,
};

function loading(data, msg) {
  wx.showToast({
    title: msg,
    icon: "loading",
    duration: data
  })
}

function DoSuccess(data, msg) {
  wx.showToast({
    title: data,
    icon: "success",
    duration: msg
  })
}

function modalTap(data) {
  wx.showModal({
    title: "提示信息",
    content: data,
    showCancel: false,
    confirmText: "确定"
  })
}
function setStorage(key, data) {
  wx.setStorage({
    key: key,
    data: data
  })
}
function getStorage(key, cb) {
  wx.getStorage({
    key: key,
    success: function (res) {
      typeof cb == "function" && cb(res)
    }
  })
}
function setStorageSync(key, data) {
  wx.setStorageSync(key, data)
}
function IsOpenId() {
  var userid = wx.getStorageSync("userid");
  var openid = wx.getStorageSync("openid");
  if (userid == "" || userid == null || openid == "" || openid == null) {
    GetOpenId();
  }
}


function GetOpenId() {
  wx.login({
    success: function (res) {
      console.log(res)
      if (res.code) {
        //获取code
        wx.setStorageSync('Code', res.code);
        var userid = wx.getStorageSync('userid');
        if (userid == null || userid == "") {
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              var s = JSON.parse(res.rawData);
              var nickName = s.nickName;//昵称
              var avatarUrl = s.avatarUrl;//头像
              var gender = s.gender
              wx.setStorageSync("nickName", s.nickName);//昵称
              wx.setStorageSync("avatarUrl", s.avatarUrl);//头像

              wx.request({
                url: config.GetOrSetOpenid,
                data: {
                  UserCode: wx.getStorageSync('Code'),
                  NickName: nickName,
                  headImgurl: avatarUrl,
                  Gender: gender
                },
                header: {
                  'content-type': 'application/json'
                },
                method: 'post',
                success: function (res) {
                  console.log(res)
                  if (res.data.result) {
                    wx.setStorageSync('userid', res.data.ReUser);//userid
                    wx.setStorageSync("openid", res.data.openid);//openid
                   
                  }
                }
              })
            }
          })
        } else {
          console.log('！' + res.errMsg)
        }
      }
    },
    fail: function (res) { //用户无授权时
      that.setData({
        getUserInfoFail: true
      })
    }
  });
}
function uploadimg(data) {
  var that = this,
    i = data.i ? data.i : 0,
    success = data.success ? data.success : 0,
    fail = data.fail ? data.fail : 0;
  wx.uploadFile({
    url: data.url,
    filePath: data.path[i],
    name: 'fileData',
    formData: null,
    success: (resp) => {
      success++;
      console.log(resp)
      console.log(i);
      //这里可能有BUG，失败也会执行这里
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
}

function timeStamp2String(time) {
  var data = time;
  var datetime = new Date(parseInt(data.replace("/Date(", "").replace(")/", ""), 10));
  var year = datetime.getFullYear();
  var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
  var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
  var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
  var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
  var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
  return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}

function Getnameandhead() {
  wx.login({
    success: function (res) {
      if (res.code) {
        wx.getUserInfo({
          success: function (res) {
            var s = JSON.parse(res.rawData);
            wx.setStorageSync("nickName", s.nickName);//昵称
            wx.setStorageSync("avatarUrl", s.avatarUrl);//头像
          }
        })
      }
    }
  });
}
module.exports.config = config
exports.setStorage = setStorage
exports.getStorage = getStorage
exports.setStorageSync = setStorageSync
exports.loading = loading
exports.DoSuccess = DoSuccess
exports.modalTap = modalTap
exports.IsOpenId = IsOpenId
exports.GetOpenId = GetOpenId
exports.uploadimg = uploadimg
exports.timeStamp2String = timeStamp2String