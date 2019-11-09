const app = getApp();
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    timetitle: [

    ],

  },
  activityinfo: function (e) {
 
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../meeting/meetinginfo?id=' + id,
    })

  },

  onLoad: function(options) {
    let that = this;
    util.request("/wechat/getTimeTable", {}, function(res) {

      that.setData({
        timetitle: res.data
      })

    })

    let now = util.getFormatDate(new Date());
  
    this.setData({
      now: now
    })
    util.request("/wechat/getApplyTable", {
      date: now
    }, function (res) {
      that.setData({
        timetable: res.data
      })



    })



  },


  onShow: function() {
   

  },
  bindDateChange: function(e) {
    let that = this;
    console.log(e);
    let now = e.detail.value;
  
    util.request("/wechat/getApplyTable", {
      date: now
    }, function(res) {
      that.setData({
        timetable: res.data,
        now: now
      })



    })

  }


})