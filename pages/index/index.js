//index.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js')
Page({
  data: {
  essu:[],

    core: [
      {
        id: 'jh',
        name: '医保报名',
        disabled: false,
        navi: '/pages/yibao/index'
      },
      {
        id: 'tj',
        name: '体检报告',
        disabled: false,
        navi: '/pages/tijian/index'
      }
      // },{
      //   id:"zy",
      //   name:"博士登记表",
      //   disabled: false,
      //   navi: "/pages/doctor/doctorlist"
      // }
      // },
      // {
      //   id: 'xt',
      //   name: '会议室安排',
      //   disabled: false,
      //   navi: '/pages/meeting/meetingtable'
      // },
      // {
      //   id: 'qd',
      //   name: '会议组织',
      //   disabled: false,
      //   navi: '/pages/meeting/meetingtable'
      // }




    ],
  },
  activityinfo: function (e) {
    console.log(e)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../meeting/meetinginfo?id=' + id,
    })

  },


  disabled_item: function () {
    app.showErrorModal("该功能未开放", "提示")
  },

  onShow: function () {

    util.request('/wechat/initIndex',{},res=>{
 

      this.setData({
        essu:res.essu,
        phyStatus:res.phyStatus
      })

    })



  },
  onLoad: function () {


  },
  onPullDownRefresh() {

  },
  initIndex: function () {
    //初始化首页

  }


});