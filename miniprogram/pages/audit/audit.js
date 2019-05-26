// miniprogram/pages/audit/audit.js
const app = getApp();
const { $Message } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    service: app.globalData.service,
    audit:{},
    visible1:false,
    visible2: false,
    spinShow:true,
    index: 0,
    rejectflows:[],
    showFlows:false,
    record: {
      remark:''
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.queryDetail(id)
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

  queryDetail:function(id){
    this.setData({
      spinShow: true
    });
    wx.cloud.callFunction({
      name: 'http',
      data: {
        endpoint: this.data.service + '/audit/'+id,
        method: 'GET',
        body: JSON.stringify(this.data.queryParam)
      },
      complete: res => {
        console.log(res);
        var rejectflows = [];
        var audit = res.result.data;
        for (var i = 0; i < audit.flows.length;i++){
          if (audit.flows[i].step < audit.step){
            rejectflows.push(audit.flows[i]);
          }
        }
        this.setData({
          audit: audit,
          spinShow:false,
          rejectflows: rejectflows
        })
      }
    })
  },

  //审核通过
  pass:function(){
    this.handleClose1();
    this.setData({
      'record.audit':this.data.audit,
      spinShow: true
    });
    wx.cloud.callFunction({
      name: 'http',
      data: {
        endpoint: this.data.service + '/audit',
        method: 'POST',
        body: JSON.stringify(this.data.record)
      },
      complete: res => {
        this.setData({
          spinShow: false
        })
        if(res.result.success){
          $Message({
            content: '审核成功',
            type: 'success'
          });
          this.queryDetail(this.data.audit.id);
        }else{
          $Message({
            content: res.result.message,
            type: 'error'
          });
        }
        
      }
    })
  },

  //审核拒绝
  reject: function () {
    this.handleClose2();
    this.setData({
      'record.audit': this.data.audit,
      spinShow: true
    });
    wx.cloud.callFunction({
      name: 'http',
      data: {
        endpoint: this.data.service + '/audit',
        method: 'PUT',
        body: JSON.stringify(this.data.record)
      },
      complete: res => {
        this.setData({
          spinShow: false
        })
        if (res.result.success) {
          $Message({
            content: '审核成功',
            type: 'success'
          });
          this.queryDetail(this.result.audit.id);
        } else {
          $Message({
            content: res.data.message,
            type: 'error'
          });
        }
        
      }
    })
  },

  showAttach:function(e){
    const item = e.currentTarget.dataset.item;
    wx.cloud.callFunction({
      name: 'downloadFile',
      data: {
        endpoint: this.data.service + '/file?fileId='+item.itemValue,
        method: 'GET',
        body: JSON.stringify(this.data.record),
        filePath: item.itemName
      },
      complete: res => {
        console.log(res);
      }
    })
  },
  
  handleOpen1() {
    this.setData({
      visible1: true,
      'record.remark':'审核通过'
    });
  },

  handleClose1() {
    this.setData({
      visible1: false,
      spinShow: false,
      'record.remark': ''
    });
  },

  handleOpen2() {
    this.setData({
      visible2: true
    });
  },

  handleClose2() {
    this.setData({
      visible2: false,
      'record.remark': ''
    });
  },

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      'audit.step': e.detail.value
    });
  },

  openFlows:function(){
    this.setData({
      showFlows: !this.data.showFlows
    })
  }
})