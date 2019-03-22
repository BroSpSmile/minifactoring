// miniprogram/pages/audit/audit.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    service: app.globalData.service,
    queryParam: {
      condition: {},
      pageNum: 1,
      pageSize: 10
    },
    pageInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadAudits()
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

  loadAudits: function () {
    wx.cloud.callFunction({
      name: 'http',
      data: {
        endpoint: this.data.service + '/audits/query',
        method: 'POST',
        body: JSON.stringify(this.data.queryParam)
      },
      complete: res => {
        console.log(res);
        this.setData({
          pageInfo: res.result
        })
      }
    })
  },

  showDetail: function (e) {
    console.log(e);
    wx.navigateTo({
      url: "../audit/audit?id=" + e.currentTarget.dataset.id
    })
  }
})