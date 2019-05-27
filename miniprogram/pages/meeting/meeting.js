// miniprogram/pages/meeting/meeting.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryParam: {
      condition: {
        type: ['partake']
      },
      pageNum: 1,
      pageSize: 10
    },
    meetingstatus: [{ value: '', text: '全部' },{ value: 'PLAN', text: '未开始' }, { value: 'MEETING', text: '进行中' }, { value: 'END', text: '已结束' }, { value: 'CANCELLED', text: '已取消' }],
    statusIndex:0,
    meetingkinds: [{ value: '', text: '全部' },{ value: 'APPROVAL', text: '立项会议' }, { value: 'DIRECTORS', text: '三重一大会议' }],
    kindIndex:0,
    pageInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMeeting();
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

  bindStatusChange: function (e) {
    this.setData({
      statusIndex: e.detail.value,
      'queryParam.condition.status': this.data.meetingstatus[parseInt(e.detail.value)].value 
    });
    this.loadMeeting();
  },

  bindKindChange: function (e) {
    this.setData({
      kindIndex: e.detail.value,
      'queryParam.condition.kind': this.data.meetingkinds[parseInt(e.detail.value)].value
    });
    this.loadMeeting();
  },

  loadMeeting: function () {
    console.log(this.data.queryParam);
    var endpoint = app.globalData.service + '/meeting/query';
    wx.cloud.callFunction({
      name: 'http',
      data: {
        endpoint: endpoint,
        method: 'POST',
        body: JSON.stringify(this.data.queryParam)
      },
      complete: res => {
        console.log('callFunction test result: ', res)
        this.setData({
          pageInfo: res.result
        })
      }
    })
  }
})