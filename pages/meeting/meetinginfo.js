// pages/meeting/meetinginfo.js
const app = getApp();
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_overscreen: false,


  },

  /**
   * 生命周期函数--监听页面加载
   */
  signup: function() {
    wx.navigateTo({
      url: 'signup?t=0',
    })
  },
  changesign:function(){
    wx.navigateTo({
      url: 'signup?t=1',
    })
  },

  onShow: function () {
    var that = this;
    wx.getSetting({
      success: sett => {
        if (sett.authSetting['scope.userInfo']) {
          // 已授权
          wx.showLoading({
            title: '登录中'
          })
          wx.login({
            success: function (lres) {
              wx.getUserInfo({
                withCredentials: true,
                success: res => {
                  that.login(res, lres);
                }
              })
            },
            fail: function (lres) {

            }
          })
        } else {
          //未授权，要求用户授权
          wx.navigateTo({
            url: '/pages/index/authorize',
          })
        }
      }
    })
  },
  login: function (res, lres) {
    let that = this;

    let url = "";
    if (app.DEV)
      url = app.dUrl;
    else
      url = app.pUrl;

    wx.request({
      url: url + "/login",
      method: 'POST',
      data: {
        code: lres.code,
        iv: res.iv,
        encryptedData: res.encryptedData
      },
      success: function (res) {
        console.log(res)
        if(res.data.status==1){
          app.cookie = res.header["Set-Cookie"]
            wx.hideLoading();
          that.getmeeting();
        }
        else{
          wx.showModal({
            title: '提示',
            content: '网络错误，请重试',
            showCancel:false,
            success:function(){
              that.login(res, lres)
            }
          })
        }
    
      }
    })
   
  },
  getmeeting:function(){
    let that=this;
    util.request("/getmeetinginfo",{id:1},function(res){
        if(res.status==1){
          res.data.descri = res.data.descri.replace(/\\n/g,'\n')
       
          that.setData({
              meeting:res.data
          })
        }

      })
  },

  onLoad: function(options) {



   

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
    return {
      title: this.data.meeting.name,
      path: '/pages/meeting/meetinginfo',
      imageUrl: "/image/icon/sdu.png",
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }

  }
})