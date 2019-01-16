// Cultrue/demo/demo.js
var WxParse = require('../../wxParse/wxParse.js');

Page({
  
  onLoad: function () {
    var article = '<p>萨<span style="text-decoration:underline;"><em><strong>达啊啊啊啊啊啊</strong></em></span>啊啊啊啊啊<img width="530" height="340" src="http://api.map.baidu.com/staticimage?center=116.404,39.915&zoom=10&width=530&height=340&markers=116.404,39.915"/></p>';
    /**
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */
    var that = this;
    WxParse.wxParse('article', 'html', article, that, 5);
  },
})
