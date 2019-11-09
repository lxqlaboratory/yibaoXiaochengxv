//login.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

const perIdCard='370111196404242037'
const perNum='200799013517'

Page({
  data: {
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
  
    angle: 0
  },
  
  onReady: function () {
    var _this = this;
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },
  onPullDownRefresh:function(){


   
  },
  onLoad: function (){

  },
  bind: function () {
   
    var _this = this;
    if (!_this.data.loginname) {
      wx.showModal({
        title: '提醒',
        content: '账号不能为空',
        showCancel: false
       
      })
  
      return false;
    }
    util.request('/wechat/preSign', {
      input: _this.data.loginname
    }, function (res) {
       
       console.log(res)
      if (res.code == 0) {
        wx.showModal({
          title: '绑定失败',
          content: res.mess,
          showCancel:false
        })
     
      }
      else{
        let content='学院：'+res.college+'\r\n姓名：'+res.name
        wx.showModal({
          title: '确认身份信息',
          content: content,
          success:e=>{
            if (e.confirm){
              //执行绑定
              util.request("/wechat/Sign", { input: _this.data.loginname},res=>{
                wx.navigateBack({
                  delta:1
                })
              })

            }
          }
          
        })
        
      }


    })
  },
  useridInput: function (e) {
    this.setData({
      loginname: e.detail.value
    });
    if (e.detail.value.length >= 20) {
      wx.hideKeyboard();
    }
  },
  passwdInput: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  inputFocus: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    }
  },
  inputBlur: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      });
    }
  },
  tapHelp: function (e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },
  showHelp: function (e) {
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function (e) {
    this.setData({
      'help_status': false
    });
  }
});