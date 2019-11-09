const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id;
 
    util.request("/vote/getVoteById", {
      id: id
    }, (res) => {

      if (res.data.result!=undefined)
          this.setData({
            ty:JSON.parse(res.data.result).status
          })
      this.setData({
        vote:res.data
   
      })

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

  bind_sub: function(e) {
    let ty = e.currentTarget.dataset.ty;
    let id = this.data.vote.id;

    this.setData({
      ty: ty
    })

    util.request("/vote/letvote", {
        id: id,
        result: {
          index: 1,
          status: Number(ty)
        }
      },
      function(res) {
          if(res.status==1){
            wx.showModal({
              title: '提示',
              content: '提交成功',
              showCancel:false,
              success:function(){
                wx.navigateBack({
                  delta: 1
                })
              }
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