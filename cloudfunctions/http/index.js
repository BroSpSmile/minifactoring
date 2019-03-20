// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request')

cloud.init({
  traceUser: true
})

// 云函数入口函数
exports.main = async (event, context) => new Promise((resolve, reject) =>{
  const wxContext = cloud.getWXContext()
  const openId = wxContext.OPENID
  request({
    url: event.endpoint + '?openId=' + wxContext.OPENID,
    headers: {
      "content-type": "application/json"
    },
    body:event.body,
    method: event.method
  }, (error, response, body) => {
    if (error) {
      console.error(error);
      resolve(JSON.parse(error));
    } else {
      console.log('body:'+body);
      console.log('response:'+response);
      resolve(JSON.parse(body));
    }
  })
})