const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  onLoad: function(options) {
    util.request("/doctor/getdoctorlist", {}, (res) => {
      if (res.status == 1) {
        this.setData({
          collegeList: res.data.collegeList
        })

      }

    })
  },

  bind_search(e) {
    console.log(e)
    let that = this;
    let type = e.currentTarget.dataset.type;
    let value = e.detail.value
    let collegelist = this.data.collegeList;


    if (type == "stu") {
      that.search_s = value;
      //学生检索
    } else {
      that.search_c = value;
    }



    for (let i in collegelist) {
      if (that.search_c && collegelist[i].collegeName.search(that.search_c) == -1) {
        for (let j in collegelist[i].stuCheckList) {
          let item = collegelist[i].stuCheckList[j];
          item.ishide = true
        }
      } else {
        console.log("ttt")
        for (let j in collegelist[i].stuCheckList) {
          let item = collegelist[i].stuCheckList[j];
          item.ishide = false
        }
      }
    }


    for (let i in collegelist)
      for (let j in collegelist[i].stuCheckList) {
        let item = collegelist[i].stuCheckList[j];
        if (that.search_s && item.perName.search(that.search_s) == -1 && item.perNum.search(that.search_s) == -1)
          item.ishide = true;

      }


    for (let i in collegelist) {
      collegelist[i].ishide = false;
      for (let j in collegelist[i].stuCheckList) {
        collegelist[i].ishide |= collegelist[i].stuCheckList[j].ishide
      }
    }
    this.setData({
      collegeList: collegelist
    })


  },
  onShow: function() {



  },
  doctorinfo: function(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'doctorinfo?id=' + id,
    })

  }


})