const app = getApp();
const util = require('../../utils/util.js')
Page({

  data: {

  },
  activityinfo: function (e) {
    console.log(e)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../meeting/meetinginfo?id=' + id,
    })

  },

  bindDateChange: function(e) {
    let that = this;
    console.log(e);
    let now = e.detail.value;
    this.setData({
      now: now
    })
    util.request("/wechat/getMyMeeting", {
      date: now,
    }, function(res) {
      if (res.status == 1) {
        that.setData({
          meetinglist: res.data
        })
      }
    })
  },
  deleteapply:function(e){

    let id = e.currentTarget.dataset.id;
    console.log(id)
    util.request("/wechat/deleteapply", {
      id: id,
    }, function (res) {
      if(res.status==1){
        wx.showModal({
          title: '提示',
          content: '取消成功',
          showCancel:false,
          success:function(){
              wx.navigateBack({
                delta:1
              })
          }
        })
      }
      else{
        wx.showToast({
          title: '取消失败,请重试',
          icon:"none"
        })
      }

    })

  },

  onLoad: function(options) {
    let that = this;
    let now = util.getFormatDate(new Date());
    this.setData({
      cnow: now,
      now:now
    })

    util.request("/wechat/getMyMeeting", {
      date: now,
    }, function(res) {
      console.log(res)
      if (res.status == 1) {
        that.setData({
          meetinglist: res.data
        })
      }
    })

  }

})