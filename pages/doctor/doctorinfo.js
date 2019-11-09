const util = require('../../utils/util.js')
Page({

  data: {
    base_s:true,
    binds:{
      baseform:true
     
    }
  },

  onLoad: function (options) {
    this.id=options.id;
    

  },

 
  onReady: function () {

  },
  bind_part(e){
 
    let id = e.currentTarget.dataset.id;
    let binds = this.data.binds;
    binds[id] = !binds[id]
    this.setData({
      binds: binds
    })

    

  },

  
  onShow: function () {
    util.request("/doctor/getdoctorproclaim",{id:this.id},(res)=>{
      if(res.status==1){
        this.setData({
          baseform: res.data.doctorAnswerProclaimForm,
          dbwy: res.data.plist1,
          course: res.data.plist3,
          lwpy: res.data.plist4,
          lw:res.data.plist5
        })
      }
    })

  },

  onShareAppMessage: function () {

  }
})