//news.js
//获取应用实例
const util = require('../../utils/util.js')
Page({
  data: {
    colorlist:{
      xg:"orangeRed",
      py:"LightSeaGreen",
      xw:"BlueViolet"
    },
    list: [{
        'type': 'xg',
        name: '学工通知',
        color: 'orangeRed'
      },
      {
        'type': 'py',
        name: '培养通知',
        color: "LightSeaGreen"
      },
      {
        'type': 'xw',
        name: '学位通知',
        color: "BlueViolet"
      },

    ]
  },
  onLoad: function() {
    this.getNewsList('xg');
  },
  changeNewsList:function(e){
    let type=e.currentTarget.dataset.type
    this.getNewsList(type)
  },

  onShow: function() {

  },
  
  //获取新闻列表
  getNewsList: function(type) {
    var _this = this;
    util.request(
      "/news/newsList", {
        type: type
      },
      function(res) {
        _this.setData({
          newslist: res.data,
          type:type
        })
      
      }
    )
  }

});