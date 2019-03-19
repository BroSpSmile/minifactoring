//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onLoad: function() {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'login',
      // 传给云函数的参数
      data: {
        a: 1,
        b: 2,
      },
      success(res) {
        console.log(res.result) // 3
      },
      fail: console.error
    })
  },

  

})
