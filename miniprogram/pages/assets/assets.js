// miniprogram/pages/assets/assets.js
const app = getApp();
const format = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryMonth: format.tsFormatTime(new Date(), 'Y-M'),
    report: []
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
    this.loadData();
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

  bindDateChange: function (e) {
    this.setData({
      queryMonth: e.detail.value
    })
    this.loadData();
  },

  loadData:function(){
    var endpoint = app.globalData.service + '/assets/' + this.data.queryMonth;
    wx.cloud.callFunction({
      name: 'http',
      data: {
        endpoint: endpoint,
        method: 'GET'
      },
      complete: res => {
        //console.log('callFunction test result: ', res)
        this.setData({
          report: res.result
        })
      }
    })
  }
})