// miniprogram/pages/project/project.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    service:app.globalData.service,
    array: [{ value: '', text: '全部' }],
    index: 0,
    queryParam: {
      condition: {},
      pageNum: 1,
      pageSize: 10
    },
    pageInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.cloud.callFunction({
      name: 'http',
      data:{
        endpoint: this.data.service +'/combo/indexsteps',
        method:'GET'
      },
      complete: res => {
        var kinds = this.data.array;
        for(var index in res.result){
          kinds.push(res.result[index]);
        }
        this.setData({
          array: kinds
        })
      }
    })

    this.loadProject();
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

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      'queryParam.condition.step': e.detail.value -1
    });
    this.loadProject();
  },

  loadProject:function(){
    var request = JSON.parse(JSON.stringify(this.data.queryParam));
    if (this.data.queryParam.condition.step == -1){
      request.condition = {};
    }
    wx.cloud.callFunction({
      name: 'http',
      data: {
        endpoint: this.data.service+'/project/query',
        method: 'POST',
        body: JSON.stringify(request)
      },
      complete: res => {
        this.setData({
          pageInfo: res.result
        })
      }
    })
  },

  showDetail:function(e){
    wx.navigateTo({
      url: "../detail/detail?id="+e.currentTarget.dataset.id
    })
  },

  showStep:function(e){
    wx.navigateTo({
      url: "../steps/index?id=" + e.currentTarget.dataset.id
    })
  }
})