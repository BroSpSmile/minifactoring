// miniprogram/pages/login/index.js
const app = getApp()
const { $Message } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    service: app.globalData.service,
    mobile:'',
    passwd:''
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bindMobileInput: function (e) {
    console.log(e);
    this.setData({
      mobile: e.detail.detail.value
    })
  },

  bindPwdInput: function (e) {
    console.log(e);
    console.log(this);
    this.setData({
      passwd: e.detail.detail.value
    })
  },

  login:function(){
   
    if (this.data.mobile==''){
      $Message({
        content: "用户名不能为空",
        type: 'error'
      });
      return false;
    }
    if (this.data.passwd == '') {
      $Message({
        content: "密码不能为空",
        type: 'error'
      });
      return false;
    }
    var form={
      mobile:this.data.mobile,
      passwd:this.data.passwd
    }
    wx.cloud.callFunction({
      name: 'http',
      data: {
        endpoint: this.data.service + '/login',
        method: 'POST',
        body: JSON.stringify(form)
      },
      complete: res => {
        console.log(res);
        var data = res.result;
        if (data.error==undefined) {
          if(data.success){
            wx.switchTab({
              url: '/pages/index/index'
            })
          }else{
            $Message({
              content: data.errorMessage,
              type: 'error'
            });
          }
          
        }else{
          $Message({
            content: data.message,
            type: 'error'
          });
        }
      }
    })
  }
})