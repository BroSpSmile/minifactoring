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
    
  },

  nav:function(event){
    wx.navigateTo({
      url: "../" + event.currentTarget.dataset.menu + "/"+event.currentTarget.dataset.menu
    })
  }
  

})
