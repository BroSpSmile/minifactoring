//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    service: app.globalData.service,
    userInfo: {},
    user:{},
    logged: false,
    takeSession: false,
    requestResult: '',
    factoringTotal: {
      total: 0,
      investment: 0.0,
      profit: 0.0
    },
    fundTotal: {
      total: 0,
      investment: 0.0
    },
    factorings: [],
    funds:[]
  },

  onLoad: function() {
    this.getUser();
    this.getFactorings();
    this.getFunds();
  },

  getUser:function(){
    wx.cloud.callFunction({
      name: 'http',
      data: {
        endpoint: this.data.service + '/login/user/wx',
        method: 'GET'
      },
      complete: res => {
        var data = res.result;
        if(!data){
          wx.redirectTo({
            url: '../login/index'
          })
        }
      }
    })
  },

  getFactorings:function(){
    wx.cloud.callFunction({
      name: 'http',
      data: {
        endpoint: this.data.service + '/factoring/infos',
        method: 'GET'
      },
      complete: res => {
        var data = res.result;
        var factoringTotal = {
          total: 0,
          investment: 0.0,
          profit: 0.0
        };
        for(var i=0;i<data.length;i++){
          factoringTotal.total += data[i].total;
          factoringTotal.investment += data[i].investment;
          factoringTotal.profit += data[i].profit;
        }
        this.setData({
          factorings: res.result,
          factoringTotal: factoringTotal
        })
      }
    })
  },

  getFunds: function () {
    wx.cloud.callFunction({
      name: 'http',
      data: {
        endpoint: this.data.service + '/fund/infos',
        method: 'GET'
      },
      complete: res => {
        var data = res.result;
        console.log(data);
        var fundTotal = {
          total: 0,
          investment: 0.0
        };
        for (var i = 0; i < data.length; i++) {
          fundTotal.total += data[i].total;
          fundTotal.investment += data[i].investment;
        }
        this.setData({
          factorings: res.result,
          fundTotal: fundTotal
        })
      }
    })
  },

  nav:function(event){
    wx.navigateTo({
      url: "../" + event.currentTarget.dataset.menu + "/"+event.currentTarget.dataset.menu
    })
  }
})
