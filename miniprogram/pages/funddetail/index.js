// miniprogram/pages/funddetail/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    service: app.globalData.service,
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.querDetail(id)
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

  querDetail: function (id) {
    wx.cloud.callFunction({
      name: 'http',
      data: {
        endpoint: this.data.service + '/fund/' + id,
        method: 'GET'
      },
      complete: res => {
        let data = res.result;
        data.memberBStr = "";
        for (let index in data.memberBs){
          data.memberBStr += ","+data.memberBs[index].username;
        }
        data.memberBStr = data.memberBStr.replace(/^(\s|,)+|(\s|,)+$/g, '');
        this.setData({
          detail: data
        })
      }
    })
  }
})