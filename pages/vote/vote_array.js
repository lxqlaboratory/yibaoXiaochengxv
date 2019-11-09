const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {


  },
  bind_item: function(e) {
    let index = e.currentTarget.dataset.id;
    let status = e.currentTarget.dataset.status;
    let list = this.data.list;
    list[index].status = status;
    list[index].show = true;
    this.setData({
      list: list
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id;
    let that = this;
    util.request("/vote/getVoteById", {
      id: id
    }, function(res) {
      let list =res.data.content
      for (let i in list) {
        list[i].des = list[i].des.replace(/；/ig, '\n')
      }
     
      that.setData({
        info: res.data,
        list: list
      })
    })
  },
  bind_submit() {
    let id = this.data.info.id;
    let list = this.data.list;
    let result = new Array();
    for (let i in list) {
      if (list[i].status == undefined) {
        wx.showModal({
          title: '提示',
          content: '请完成表决后提交',
          showCancel: false
        })
        return;
      }
      result[i] = new Object();
      result[i].index = Number(list[i].index);
      result[i].status = Number(list[i].status);
    }
    util.request("/vote/letvote", {
      id: id,
      result: result
    }, function(res) {
      if (res.status == 1) {
        wx.showModal({
          title: '提示',
          content: '提交成功',
          showCancel: false,
          success: function(res) {
            wx.navigateBack({
              delta: 1
            })
          }

        })
      }

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})