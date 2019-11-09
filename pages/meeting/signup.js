const app = getApp();
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    range: ['硕士研究生', '博士研究生', '研究生教育管理工作人员', '研究生导师']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let t = options.t;

    if (t == 1) {
      this.setData({
        change: true
      })
      //change

      util.request("/getsigninfo", {}, function(res) {
        for (let i = 0; i < that.data.range.length; i++) {
          if (that.data.range[i] == res.data.type)
            that.setData({
              index: i
            })
        }

        that.setData({
          num: res.data.num,
          name: res.data.name,
          phonenum: res.data.phonenum,
          college: res.data.college
        })
      })
    }


  },
  isonsubmit: false,
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  submitall: function(e) {

    let that = this;
    if (this.isonsubmit)
      return;
    var form = e.detail.value;
    console.log(form)
    if (!form.name || !form.num ) {
      wx.showToast({
        icon: "none",
        title: "请填写完整再提交"
      })
      return;
    }
    form.type = this.data.range[form.type];
    this.isonsubmit = true;
    util.request("/sign", form, function(res) {
      that.isonsubmit = false;
      if (res.status == 1) {
        if (that.data.change) {
          wx.showModal({
            title: '提示',
            content: '修改成功',
            showCancel: false,
            success: function() {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else
          wx.showModal({
            title: '提示',
            content: '报名成功',
            showCancel: false,
            success: function() {
              wx.navigateBack({
                delta: 1
              })
            }
          })
      }
    
    })
  }
})