// pages/meeting/tdapply.js
const app = getApp();
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showtpart: true,
    showtimeline: false



  },

  


  closetimeline: function() {
    this.setData({
      showtimeline: false
    })
  },
  noup: function() {

  },
  bindnode: function(e) {
   
    let id = e.currentTarget.dataset.id
    let orderlist = this.data.orderlist;

    if (id < 3) {
      for (let i = 3; i < 6; i++)
        orderlist[i].s = false;
    }
    else {
      for (let i = 0; i < 3; i++)
        orderlist[i].s = false;
    }

  
    orderlist[id].s = !orderlist[id].s;




    if (orderlist[0].s && orderlist[2].s)
      orderlist[1].s=true;
    if (orderlist[3].s && orderlist[5].s)
      orderlist[4].s = true;

    let stimestr="";
    for(let i=0;i<6;i++){
      if(orderlist[i].s){
        stimestr += this.data.timelist[i].s + this.data.timelist[i].e
      }
    }
    if (stimestr.length>=10)
    stimestr = stimestr.substring(0, 5) + "~" + stimestr.substring(stimestr.length - 5, stimestr.length)
    else{
      stimestr="";
    }


    this.setData({
      orderlist: orderlist,
      stimestr: stimestr
    })


  },
  submitall: function() {
    let data = new Object();
    data.date = this.data.now;
    data.roomIdlist = new Array();
    for (var i in this.data.roomlist) {
      if (this.data.roomlist[i].select)
        data.roomIdlist[data.roomIdlist.length] = this.data.roomlist[i].roomId;
    }
    data.topic = this.data.topic;
    data.oname = this.data.oname;
    data.brief = this.data.brief;
    data.order = this.data.stimestr;
  
    if (!(data.order && data.oname && data.topic)){
      wx.showToast({
        title: '请完成申请表',
        icon:"none"
      })
    }
    else{
      util.request('/wechat/AddApply', data, function (res) {
        if(res.status==1){
          wx.showModal({
            title: '提示',
            content: '申请成功',
            success:function(){
              wx.navigateBack({
                delta: 1
              })
            },
            showCancel:false
            
          })
        
        }


      })
    }


   


  },
  input_topic: function(e) {


    this.setData({
      topic: e.detail.value
    })

  },

  input_oname: function(e) {
    this.setData({
      oname: e.detail.value
    })
  },

  input_brief: function(e) {
    this.setData({
      brief: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let datestr = util.getFormatDate(new Date())
    let durdate = new Date();
    durdate.setDate(new Date().getDate() + 7);
    let durdatestr = util.getFormatDate(durdate)
    this.setData({
      curdate: datestr,
      durdate: durdatestr,
      now: datestr

    })
    let that = this;
    util.request("/wechat/getTimeTable", {}, function(res) {
      that.setData({
        timelist: res.data
      })
    })

    this.getRoomSatus(datestr)

  },

  getRoomSatus: function(date) {
    var that = this;
    util.request("/wechat/getRoomStatus", {
      date: date
    }, function(res) {
      if (res.status != 1) {
        util.showModal("提示", "获得列表失败");
        return;
      }
      that.setData({
        roomlist: res.data
      })

    })
  },


  bindDateChange: function(e) {
    let date = e.detail.value;
    this.setData({
      now: date
    })
    this.getRoomSatus(date)
  },
  selectroom: function(e) {

    let roomId = e.currentTarget.dataset.id

    let roomlist = this.data.roomlist;
    for (let index in roomlist) {
      if (roomlist[index].roomId == roomId)
        roomlist[index].select = true;
      else {
        roomlist[index].select = false;
      }
    }
    this.setData({
      roomlist: roomlist
    })

  },
  bt_submit_node: function() {

  },



  beginupview: function() {
    let that = this;


    let roomnameliststr = "";
    let roomlist = this.data.roomlist;
    for (let index in roomlist) {
      if (roomlist[index].select) {
        roomnameliststr += "  " + roomlist[index].roomname
        that.setData({
          timeorder: that.data.roomlist[index].order
        })
      }
    }

    if (roomnameliststr == "") {
      util.showModal("提示", "您未选择任何会议室")
      return;
    }
    let orderlist = new Array();
    for (let i = 0; i < 6; i++) {
      orderlist[i] = new Object;
      orderlist[i].s=false;
    }
    this.setData({
      orderlist: orderlist,
      showtpart: false,
      roomnameliststr: roomnameliststr,

    })



  },
  alsub: function() {
    wx.showToast({
      title: '该时段已被占用',
      icon: 'none'
    })
  },
  opentimeline: function() {
    this.setData({
      showtimeline: true
    })

  },
  bindreselect: function() {
    this.setData({
      showtpart: true,
      snodetext: "",
      stimestr:""

    })

  }



})