const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  toVote(e) {
    let id = e.currentTarget.dataset.id;
    let type = e.currentTarget.dataset.type;
    switch (type) {
      case 'list':
        wx.navigateTo({
          url: 'vote_list?id=' + id
        })
        break;
      case "single":
        wx.navigateTo({
          url: 'vote_single?id=' + id
        })

        break;
      case "array":
        wx.navigateTo({
          url: "vote_array?id=" + id
        })
        break;

    }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


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
    util.request("/vote/getGroupVote", {
      id: 1
    }, (res) => {
      if (res.status == 1) {
        this.setData({
          votegroup: res.data
        })
      }

    })
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