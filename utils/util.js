
let env_dev = true

let cookie = ''

let url = "https://真实地址:80/medicare/func"
if (env_dev)
  url = "http://211.87.225.210:80/medicare/func"





export function request(cmd, form, func) {


  if (cookie === '') {
    //未登录。先进行一次登陆 如果未绑定 跳转去绑定页面。如果已绑定 获得
    login(() => {
      request(cmd, form, func)
    })
  } else {

    let reqObj = new Object
    let app = getApp()
    reqObj.url = url + cmd;
    reqObj.method = 'post'
    reqObj.data = form
    reqObj.header = {
      'cookie': cookie
    }

    reqObj.success = res => {
      //如果有cookie刷新 则替换cookie
      if (res.header['Set-Cookie'])
        cookie = res.header['Set-Cookie']


      if (res.data.status === -1) {
        //要求重新登录
        cookie = ''
        request(cmd, form, func)
      }
      if (res.data.status === 1) {
        console.log(res.data.data)
        //请求成功
        func(res.data.data)
      }
    }
    reqObj.fail = function (res) {
      wx.showToast({
        title: '登录失败，请下拉刷新界面尝试',
        icon: 'none'
      })
    }
    wx.request(reqObj)
  }
}


function login(func) {
  const loginRequest = new Object()

  loginRequest.url = url + "/wechat/miniLogin"
  loginRequest.method = 'post'
  loginRequest.data = new Object()
  loginRequest.success = loginResult => {
  
    let resData = loginResult.data

    cookie = loginResult.header['Set-Cookie']
    if (resData.status === 1) {
      func()
    }
    if (resData.status === -2) {
      wx.navigateTo({
        url: 'sign',
      })
    }




  }
  loginRequest.fail = loginFail => {
    wx.showToast({
      title: '登录失败，请下拉刷新界面尝试',
      icon: 'none'
    })
  }

  wx.login({
    success: res => {

      loginRequest.data.code = res.code
      wx.request(loginRequest)
    },
    fail: error => {
      console.log(error)
    }
  })

}
